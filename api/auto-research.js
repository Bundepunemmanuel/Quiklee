/* /api/auto-research.js — Vercel serverless function
   Takes just a seed keyword, runs the full research pipeline automatically:

   Pass A — alphabet sweep (free Google suggest endpoint), same as before.
   Pass B — Gemini proposes plausible context/audience MODIFIERS (e.g. "for
     bartenders", "restaurant", "itemized"), each is checked against the SAME
     free Google suggest endpoint as an expanded seed. Only modifiers that
     return real suggestions survive — Gemini proposes where to look, it never
     gets to claim something is a real keyword on its own say-so.

   Then: app-intent tagging (fixed rubric, Gemini applies it) flags phrases
   like "app", "iphone", "free", "offline" as app-intent — kept visible, not
   deleted, but excluded from auto-select so Serper credits aren't spent on
   PAA for queries we can never realistically capture the click for.

   Required Vercel environment variables:
     ADMIN_KEY        — same password as the other dashboard endpoints
     SERPER_API_KEY   — needed for the PAA step
     GEMINI_API_KEY   — needed for Pass B modifier suggestions + app-intent tagging

   Request:  POST /api/auto-research   { "seed": "tip calculator", "maxPaaQueries": 6 }
   Response: {
     "log": [...],
     "longtailKeywords": [...],       // content-target only, app-intent excluded
     "appIntentKeywords": [...],      // flagged, shown separately
     "autoSelected": [...],
     "paaResults": [...],
     "creditsUsed": 6
   }
*/

const BRAND_DENYLIST = [
  "chase", "excel", "amazon", "google", "microsoft", "apple", "paypal",
  "venmo", "cashapp", "walmart", "target", "costco", "ebay", "netflix",
  "spotify", "youtube", "facebook", "instagram", "tiktok"
];
const LETTERS = ["a", "b", "c", "d", "f", "h", "i", "k", "l", "m", "n", "s", "t", "w", "y"];

function isJunk(phrase) {
  const words = phrase.trim().split(/\s+/);
  if (words.length < 4) return true;
  const lower = phrase.toLowerCase();
  return BRAND_DENYLIST.some((b) => lower.includes(b));
}

async function fetchSuggestions(query) {
  const url = "https://suggestqueries.google.com/complete/search?client=firefox&q=" + encodeURIComponent(query);
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
  } catch (e) {
    return [];
  }
}

async function fetchLongtailsAlphabet(seed) {
  const found = new Set();
  for (const letter of LETTERS) {
    const suggestions = await fetchSuggestions(`${seed} ${letter}`);
    suggestions.forEach((phrase) => { if (phrase && !isJunk(phrase)) found.add(phrase.trim()); });
  }
  return found;
}

/* Pass B: ask Gemini for plausible modifiers, verify each against real Google
   suggestions before trusting any of them. */
async function suggestModifiers(seed, geminiKey) {
  const prompt = `Suggest 10-12 plausible audience, context, or use-case modifiers for the search
topic "${seed}" — short phrases (1-3 words) that someone might append, like "for bartenders",
"restaurant", "itemized", "for kids". These are CANDIDATES to check against real search data,
not confirmed keywords — propose broadly, some will turn out to have no real search volume.

Output ONLY a JSON array of strings, no markdown fences, no commentary:
["modifier one", "modifier two", ...]`;

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!response.ok) return [];
    const data = await response.json();
    const text = data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text;
    if (!text) return [];
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

async function fetchLongtailsFromModifiers(seed, modifiers) {
  const found = new Set();
  const verifiedModifiers = [];
  for (const modifier of modifiers) {
    const query = `${seed} ${modifier}`;
    const suggestions = await fetchSuggestions(query);
    const real = suggestions.filter((phrase) => phrase && !isJunk(phrase));
    if (real.length > 0) {
      verifiedModifiers.push(modifier);
      real.forEach((phrase) => found.add(phrase.trim()));
    }
    // The modifier phrase itself is also worth keeping if it reads like a real query
    if (!isJunk(query)) found.add(query.trim());
  }
  return { found, verifiedModifiers };
}

/* Fixed rubric app-intent tagging — Gemini applies it, doesn't invent the categories. */
async function tagAppIntent(keywords, geminiKey) {
  if (keywords.length === 0) return { contentTarget: [], appIntent: [] };
  const prompt = `Sort these search phrases into exactly 2 categories, applying ONLY this rule:
Label "app-intent" ONLY if the phrase clearly implies wanting to install/download something, or
a mobile-app-specific feature (contains words like "app", "iphone", "android", "download",
"widget", "offline", "no ads", or similar). Do not label something app-intent just because it
contains "free" or "online" unless combined with clear install intent.
Everything else is "content-target".

Phrases:
${keywords.map((k) => `- "${k}"`).join("\n")}

Output ONLY valid JSON, no markdown fences, no commentary:
{ "contentTarget": ["..."], "appIntent": ["..."] }`;

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!response.ok) return { contentTarget: keywords, appIntent: [] };
    const data = await response.json();
    const text = data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text;
    if (!text) return { contentTarget: keywords, appIntent: [] };
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return { contentTarget: parsed.contentTarget || keywords, appIntent: parsed.appIntent || [] };
  } catch (e) {
    // If tagging fails for any reason, fail safe: treat everything as content-target
    // rather than silently dropping real keywords.
    return { contentTarget: keywords, appIntent: [] };
  }
}

function autoSelect(keywords, maxCount) {
  return keywords
    .slice()
    .sort((a, b) => b.split(" ").length - a.split(" ").length)
    .slice(0, maxCount);
}

async function fetchPaa(keyword, serperKey) {
  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": serperKey, "Content-Type": "application/json" },
    body: JSON.stringify({ q: keyword, num: 10 })
  });
  if (!response.ok) return { keyword, questions: [], error: `HTTP ${response.status}` };
  const data = await response.json();
  const paa = data.peopleAlsoAsk || [];
  return { keyword, questions: paa.map((item) => ({ question: item.question || "", answer: item.snippet || "", source: item.link || "" })) };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST" });
    return;
  }

  const adminKey = req.headers["x-admin-key"];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: "Invalid or missing password" });
    return;
  }

  const serperKey = process.env.SERPER_API_KEY;
  if (!serperKey) {
    res.status(500).json({ error: "SERPER_API_KEY not configured on the server" });
    return;
  }
  const geminiKey = process.env.GEMINI_API_KEY;

  const seed = (req.body && req.body.seed || "").trim();
  const maxPaaQueries = Math.min((req.body && req.body.maxPaaQueries) || 6, 10);
  if (!seed) {
    res.status(400).json({ error: "Missing 'seed'" });
    return;
  }

  const log = [];
  try {
    log.push(`Pass A: searching alphabet sweep for "${seed}"...`);
    const alphabetResults = await fetchLongtailsAlphabet(seed);
    log.push(`Pass A found ${alphabetResults.size} phrases (0 Serper credits — free endpoint).`);

    let modifierResults = new Set();
    if (geminiKey) {
      log.push("Pass B: asking Gemini for plausible context/audience modifiers...");
      const modifiers = await suggestModifiers(seed, geminiKey);
      log.push(`Gemini proposed ${modifiers.length} candidate modifiers — verifying each against real search data...`);
      const { found, verifiedModifiers } = await fetchLongtailsFromModifiers(seed, modifiers);
      modifierResults = found;
      log.push(`${verifiedModifiers.length}/${modifiers.length} modifiers confirmed real (${verifiedModifiers.join(", ") || "none"}), adding ${found.size} phrases.`);
    } else {
      log.push("Pass B skipped — GEMINI_API_KEY not configured.");
    }

    const combined = new Set([...alphabetResults, ...modifierResults]);
    log.push(`Combined total: ${combined.size} unique phrases.`);

    let longtailKeywords = Array.from(combined).sort();
    let appIntentKeywords = [];
    if (geminiKey) {
      log.push("Tagging app-intent phrases (kept visible, excluded from auto-select)...");
      const tagged = await tagAppIntent(longtailKeywords, geminiKey);
      longtailKeywords = tagged.contentTarget.sort();
      appIntentKeywords = tagged.appIntent.sort();
      log.push(`${appIntentKeywords.length} phrases flagged as app-intent, ${longtailKeywords.length} remain as content targets.`);
    }

    const autoSelected = autoSelect(longtailKeywords, maxPaaQueries);
    log.push(`Auto-selected ${autoSelected.length} strongest content-target phrases for PAA lookup.`);

    log.push("Running PAA on selected phrases...");
    const paaResults = [];
    let creditsUsed = 0;
    for (const kw of autoSelected) {
      const result = await fetchPaa(kw, serperKey);
      creditsUsed += 1;
      paaResults.push(result);
    }
    const totalQuestions = paaResults.reduce((sum, r) => sum + r.questions.length, 0);
    log.push(`Found ${totalQuestions} real questions across ${autoSelected.length} queries (${creditsUsed} Serper credits used).`);

    res.status(200).json({ log, longtailKeywords, appIntentKeywords, autoSelected, paaResults, creditsUsed });
  } catch (err) {
    log.push("Error: " + err.message);
    console.error(err);
    res.status(500).json({ error: "Auto-research pipeline failed", detail: String(err), log });
  }
};
