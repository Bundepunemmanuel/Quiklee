/* /api/generate.js — Vercel serverless function
   Takes up to 5 briefs (calculators or meanings), calls Gemini once per batch,
   runs guardrail checks on the response, and merges passing entries into the
   data file content you fetched via /api/fetch-data.js.

   Required Vercel environment variables:
     ADMIN_KEY        — same password as the other dashboard endpoints
     GEMINI_API_KEY   — your Gemini API key

   Request:  POST /api/generate
   {
     "section": "calculators" | "meanings",
     "currentFileContent": "<the raw file text from /api/fetch-data.js>",
     "briefs": [
       {
         "slug": "age-calculator",
         "title": "Age Calculator",
         "titleHook": "Exact Age, Down to the Day",
         "hook": "Someone born June 3, 1990 is 35 years, 3 months, X days old today.",
         "formula": "age-calculator",              // calculators only — must match a case in main.js
         "complexity": "standard",                  // "flagship" | "standard" | "lean"
         "requiredKeywords": ["how do I calculate my exact age"],
         "requiredQuestions": ["how do I calculate my age in years and days"],
         "depthPattern": "none",                    // one of the pattern names, or "none"
         "related": ["date-difference"]
       }
     ]
   }

   Response: { "updatedFileContent": "...", "accepted": [...slugs], "rejected": [{slug, reasons}] }
*/

// Phrases that read as generic AI filler — any hit rejects the entry
const BANNED_PHRASES = [
  "in today's fast-paced world", "in today's digital age", "unlock the power of",
  "look no further", "in this article, we will", "whether you are a", "dive into",
  "game changer", "in conclusion", "it is important to note that", "delve into",
  "navigating the world of", "when it comes to", "at the end of the day"
];

const DEPTH_PATTERNS = {
  "classification-table": "a classification/category table (h2 + table)",
  "risks-section": "a risks section (h2 + p + list of real risks)",
  "limitations-section": "a limitations section (h2 + p explaining what this doesn't account for)",
  "quick-reference-table": "a quick-reference lookup table (h2 + table of common values)",
  "comparison-table": "a comparison table showing how different inputs produce different real-world outcomes (h2 + p + table)",
  "formula-disagreement-table": "a table comparing multiple real formulas/methods and their different results (h2 + p + table)",
  "symmetry-proof-table": "a table proving a mathematical property with a worked example (h2 + p + table)",
  "category-by-decade-table": "a table showing how a value typically changes over time/age (h2 + p + table)",
  "none": null
};

function buildCalculatorPrompt(brief) {
  const depthInstruction = brief.depthPattern && brief.depthPattern !== "none"
    ? `Include ONE depthBlocks entry matching this pattern: ${DEPTH_PATTERNS[brief.depthPattern] || brief.depthPattern}.`
    : "Do NOT include a depthBlocks field — this calculator doesn't need one.";

  const lengthGuide = {
    flagship: "2-3 explainer paragraphs, 4-5 FAQ entries",
    standard: "1-2 explainer paragraphs, 3 FAQ entries",
    lean: "1 short explainer paragraph, 2 FAQ entries"
  }[brief.complexity || "standard"];

  return `You are writing content for a calculator website page. Do not write generic filler —
be specific, concrete, and factual. Never use these phrases or anything similar in tone:
${BANNED_PHRASES.map((p) => `"${p}"`).join(", ")}.

Calculator: "${brief.title}"
Formula (already built, describe how it works in plain language): ${brief.formula}
Depth level: ${brief.complexity || "standard"} — write ${lengthGuide}.

${depthInstruction}

These exact real search questions MUST each appear as one FAQ entry, answered in plain language:
${(brief.requiredQuestions || []).map((q) => `- "${q}"`).join("\n") || "(none specified)"}

Naturally work these exact phrases into explainer text (not forced, one clean sentence each):
${(brief.requiredKeywords || []).map((k) => `- "${k}"`).join("\n") || "(none specified)"}

Output ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "intro": "one sentence",
  "explainer": ["paragraph 1", "paragraph 2 if needed"],
  "caveat": "one sentence or null if there's no genuine limitation to flag",
  "depthBlocks": [{"type":"h2","text":"..."}, {"type":"p","text":"..."}, {"type":"table","headers":["..."],"rows":[["...","..."]]}] or omit entirely if depth level is lean and no pattern was requested,
  "faq": [{"q":"...","a":"..."}]
}`;
}

function buildMeaningPrompt(brief) {
  return `You are writing content for a "what does X mean" page. Do not write generic filler —
be specific and concrete, with real usage examples. Never use these phrases or anything similar:
${BANNED_PHRASES.map((p) => `"${p}"`).join(", ")}.

Term to explain: "${brief.title}"

These exact real search questions MUST each appear as one FAQ entry, answered in plain language:
${(brief.requiredQuestions || []).map((q) => `- "${q}"`).join("\n") || "(none specified)"}

Naturally work these exact phrases into the explanatory text:
${(brief.requiredKeywords || []).map((k) => `- "${k}"`).join("\n") || "(none specified)"}

Output ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "intro": "one sentence defining the term plainly",
  "content": [
    {"type":"p","text":"..."},
    {"type":"h2","text":"Example use"},
    {"type":"p","text":"a real, concrete usage example"}
  ],
  "caveat": null,
  "faq": [{"q":"...","a":"..."}]
}`;
}

function runGuardrails(brief, generated, existingFileContent) {
  const reasons = [];
  const fullTitle = brief.title + " | " + brief.titleHook;
  if (fullTitle.length > 60) reasons.push(`Title tag too long (${fullTitle.length}/60 chars)`);

  const allText = JSON.stringify(generated).toLowerCase();
  BANNED_PHRASES.forEach((phrase) => {
    if (allText.includes(phrase.toLowerCase())) reasons.push(`Contains banned filler phrase: "${phrase}"`);
  });

  (brief.requiredKeywords || []).forEach((kw) => {
    if (!allText.includes(kw.toLowerCase())) reasons.push(`Required keyword missing from output: "${kw}"`);
  });

  (brief.requiredQuestions || []).forEach((q) => {
    const faqQuestions = (generated.faq || []).map((f) => f.q.toLowerCase());
    const matched = faqQuestions.some((fq) => fq.includes(q.toLowerCase().slice(0, 15)));
    if (!matched) reasons.push(`Required question not found in FAQ: "${q}"`);
  });

  // Rough duplicate-content check: does any explainer/content paragraph closely match
  // something already in the file? (Simple substring check on the first ~60 chars of
  // each paragraph — not a rigorous similarity algorithm, but catches obvious copy-paste.)
  const paragraphs = (generated.explainer || (generated.content || []).map((c) => c.text) || []);
  paragraphs.forEach((p) => {
    if (p && p.length > 60 && existingFileContent.includes(p.slice(0, 60))) {
      reasons.push("Possible duplicate content — matches an existing paragraph in the file");
    }
  });

  return reasons;
}

async function callGemini(prompt, apiKey) {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  // NOTE: verify this model name and endpoint against Gemini's current API docs —
  // model names and versions change; this was accurate as of this build.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${detail}`);
  }
  const data = await response.json();
  const text = data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text;
  if (!text) throw new Error("Gemini returned no text content");
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

function insertEntriesIntoFile(content, newEntryObjects) {
  if (newEntryObjects.length === 0) return content;
  const closeIdx = content.lastIndexOf("];");
  if (closeIdx === -1) throw new Error("Could not find array closing '];' in file content — file structure may have changed");

  const before = content.slice(0, closeIdx);
  const after = content.slice(closeIdx);
  const isEmpty = before.trimEnd().endsWith("[");
  const serialized = newEntryObjects.map((e) => "  " + JSON.stringify(e, null, 2).replace(/\n/g, "\n  ")).join(",\n");

  return isEmpty
    ? before + serialized + "\n" + after
    : before + ",\n" + serialized + "\n" + after;
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

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY not configured on the server" });
    return;
  }

  const { section, currentFileContent, briefs } = req.body || {};
  if (!section || !currentFileContent || !Array.isArray(briefs) || briefs.length === 0) {
    res.status(400).json({ error: "Missing 'section', 'currentFileContent', or 'briefs'" });
    return;
  }
  if (briefs.length > 5) {
    res.status(400).json({ error: "Max 5 briefs per batch" });
    return;
  }

  const accepted = [];
  const rejected = [];

  try {
    for (const brief of briefs) {
      const prompt = section === "meanings" ? buildMeaningPrompt(brief) : buildCalculatorPrompt(brief);
      let generated;
      try {
        generated = await callGemini(prompt, geminiKey);
      } catch (err) {
        rejected.push({ slug: brief.slug, reasons: ["Gemini call failed: " + err.message] });
        continue;
      }

      const reasons = runGuardrails(brief, generated, currentFileContent);
      if (reasons.length > 0) {
        rejected.push({ slug: brief.slug, reasons, generatedContent: generated });
        continue;
      }

      // Merge the locked brief fields with Gemini's generated content into one entry
      const entry = Object.assign(
        { slug: brief.slug, title: brief.title, titleHook: brief.titleHook, hook: brief.hook },
        section === "meanings"
          ? { type: "info", h1: brief.title, metaDescription: generated.intro, intro: generated.intro, content: generated.content, caveat: generated.caveat, faq: generated.faq, related: brief.related || [] }
          : { type: "form", formula: brief.formula, h1: brief.title, metaDescription: generated.intro, intro: generated.intro, explainer: generated.explainer, caveat: generated.caveat, depthBlocks: generated.depthBlocks, faq: generated.faq, related: brief.related || [] }
      );
      accepted.push(entry);
    }

    const updatedFileContent = insertEntriesIntoFile(currentFileContent, accepted);
    res.status(200).json({
      updatedFileContent,
      accepted: accepted.map((e) => e.slug),
      rejected
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation pipeline failed", detail: String(err) });
  }
};
