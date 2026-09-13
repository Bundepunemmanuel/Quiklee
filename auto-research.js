/* /api/auto-research.js — Vercel serverless function
   Takes just a seed keyword, runs the full research pipeline automatically:
   long-tail discovery (free Google suggest endpoint) → auto-select the strongest
   results → PAA lookup on those (Serper, credits used) → returns everything plus
   a step-by-step log so the dashboard can show progress live, not just a spinner.

   Required Vercel environment variables:
     ADMIN_KEY        — same password as the other dashboard endpoints
     SERPER_API_KEY   — needed for the PAA step

   Request:  POST /api/auto-research   { "seed": "gpa calculator", "maxPaaQueries": 6 }
   Response: {
     "log": ["step 1 description", "step 2 description", ...],
     "longtailKeywords": [...],
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

async function fetchLongtails(seed) {
  const found = new Set();
  for (const letter of LETTERS) {
    const query = `${seed} ${letter}`;
    const url = "https://suggestqueries.google.com/complete/search?client=firefox&q=" + encodeURIComponent(query);
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      const suggestions = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
      suggestions.forEach((phrase) => { if (phrase && !isJunk(phrase)) found.add(phrase.trim()); });
    } catch (e) { /* skip this letter, keep going */ }
  }
  return Array.from(found).sort();
}

/* Picks the strongest N candidates for a PAA lookup — favors longer, more specific
   phrases (more words = more specific search intent) over short generic ones. */
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

  const seed = (req.body && req.body.seed || "").trim();
  const maxPaaQueries = Math.min((req.body && req.body.maxPaaQueries) || 6, 10);
  if (!seed) {
    res.status(400).json({ error: "Missing 'seed'" });
    return;
  }

  const log = [];
  try {
    log.push(`Searching long-tails for "${seed}"...`);
    const longtailKeywords = await fetchLongtails(seed);
    log.push(`Found ${longtailKeywords.length} phrases (0 Serper credits — free endpoint).`);

    const autoSelected = autoSelect(longtailKeywords, maxPaaQueries);
    log.push(`Auto-selected ${autoSelected.length} strongest phrases for PAA lookup.`);

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

    res.status(200).json({ log, longtailKeywords, autoSelected, paaResults, creditsUsed });
  } catch (err) {
    log.push("Error: " + err.message);
    console.error(err);
    res.status(500).json({ error: "Auto-research pipeline failed", detail: String(err), log });
  }
};
