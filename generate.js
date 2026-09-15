/* /api/generate.js — Vercel serverless function
   Two actions, chosen via req.body.action:

   1. action: "classify" — applies a FIXED rubric (defined below, not left to Gemini's own
      judgment) to sort a list of long-tail keywords into 3 buckets: whether each one implies
      a genuinely new calculation (flagged for human review, never auto-built), reuses an
      existing formula on a new page, or is just FAQ content for an existing page.

   2. action: "generate" (default) — takes up to 5 briefs, calls Gemini, runs guardrails,
      merges passing entries into the data file content, and can commit the result straight
      to the "Chunk" branch on GitHub if requested.

   Required Vercel environment variables:
     ADMIN_KEY        — same password as the other dashboard endpoints
     GEMINI_API_KEY    — your Gemini API key
     GITHUB_TOKEN      — needed only if commitToGitHub is true
     GITHUB_REPO       — needed only if commitToGitHub is true
*/

const { buildToolContentHTML, buildFaqSchema, buildToolSchema, buildHowToSchema } = require("../render-lib.js");

// Phrases that read as generic AI filler — any hit rejects the entry
/* Hand-written, verified against the exact v.xxx field names each main.js formula
   case actually reads. NEVER let Gemini generate this — a wrong field id means the
   calculator silently breaks (or crashes the whole build, as happened with the first
   real batch that shipped with no fields at all). Extend this map any time a new
   formula is added to CALC_FORMULAS/CONVERTER_FORMULAS in emmybund.html. */
const FIELD_DEFINITIONS = {
  "age-calculator": [
    { id: "birthYear", label: "Birth year", placeholder: "1990" },
    { id: "birthMonth", label: "Birth month", placeholder: "6" },
    { id: "birthDay", label: "Birth day", placeholder: "15" }
  ],
  "date-difference": [
    { id: "year1", label: "First date — year", placeholder: "2020" },
    { id: "month1", label: "First date — month", placeholder: "1" },
    { id: "day1", label: "First date — day", placeholder: "1" },
    { id: "year2", label: "Second date — year", placeholder: "2026" },
    { id: "month2", label: "Second date — month", placeholder: "9" },
    { id: "day2", label: "Second date — day", placeholder: "15" }
  ],
  "day-of-week": [
    { id: "year", label: "Year", placeholder: "2026" },
    { id: "month", label: "Month", placeholder: "9" },
    { id: "day", label: "Day", placeholder: "15" }
  ],
  "simple-interest": [
    { id: "principal", label: "Principal", placeholder: "5000" },
    { id: "rate", label: "Annual rate (%)", placeholder: "5" },
    { id: "years", label: "Years", placeholder: "3" }
  ],
  "compound-interest": [
    { id: "principal", label: "Principal", placeholder: "5000" },
    { id: "rate", label: "Annual rate (%)", placeholder: "5" },
    { id: "years", label: "Years", placeholder: "3" },
    { id: "compoundsPerYear", label: "Compounds per year", placeholder: "12" }
  ],
  "loan-payment": [
    { id: "principal", label: "Loan amount", placeholder: "20000" },
    { id: "rate", label: "Annual interest rate (%)", placeholder: "6" },
    { id: "years", label: "Loan term (years)", placeholder: "5" }
  ],
  "savings-goal": [
    { id: "goal", label: "Savings goal", placeholder: "10000" },
    { id: "current", label: "Current savings", placeholder: "2000" },
    { id: "monthlyContribution", label: "Monthly contribution", placeholder: "300" }
  ],
  "average": [
    { id: "numbers", label: "Numbers (comma-separated)", type: "text", placeholder: "12, 18, 25, 9" }
  ],
  "ratio-simplify": [
    { id: "a", label: "First number", placeholder: "8" },
    { id: "b", label: "Second number", placeholder: "12" }
  ],
  "square-root": [
    { id: "number", label: "Number", placeholder: "144" }
  ],
  "gpa-calculator": [
    { id: "grades", label: "Grade points (comma-separated)", type: "text", placeholder: "4.0, 3.7, 3.3, 4.0" }
  ],
  "gpa-blended-current": [
    { id: "currentGpa", label: "Current GPA", placeholder: "3.2" },
    { id: "currentCredits", label: "Current credit hours", placeholder: "60" },
    { id: "newGrades", label: "New semester grades (comma-separated)", type: "text", placeholder: "4.0, 3.7, 3.3" },
    { id: "newCredits", label: "New semester credit hours (comma-separated)", type: "text", placeholder: "3, 4, 3" }
  ],
  "gpa-percentage-conversion": [
    { id: "percentages", label: "Percentage grades (comma-separated)", type: "text", placeholder: "88, 92, 79" }
  ],
  "gpa-multi-college": [
    { id: "collegeGpas", label: "GPA per college (comma-separated)", type: "text", placeholder: "3.5, 3.0" },
    { id: "collegeCredits", label: "Credit hours per college (comma-separated)", type: "text", placeholder: "30, 45" }
  ],
  "gpa-no-aplus-scale": [
    { id: "letterGrades", label: "Letter grades (comma-separated)", type: "text", placeholder: "A+, A-, B+, A" }
  ],
  "length-generic": [
    { id: "value", label: "Value", placeholder: "10" },
    { id: "fromUnit", label: "From", type: "select", options: [
      { value: "mm", label: "Millimetres (mm)" }, { value: "cm", label: "Centimetres (cm)" },
      { value: "m", label: "Metres (m)" }, { value: "km", label: "Kilometres (km)" },
      { value: "in", label: "Inches (in)" }, { value: "ft", label: "Feet (ft)" },
      { value: "yd", label: "Yards (yd)" }, { value: "mi", label: "Miles (mi)" }
    ]},
    { id: "toUnit", label: "To", type: "select", options: [
      { value: "mm", label: "Millimetres (mm)" }, { value: "cm", label: "Centimetres (cm)" },
      { value: "m", label: "Metres (m)" }, { value: "km", label: "Kilometres (km)" },
      { value: "in", label: "Inches (in)" }, { value: "ft", label: "Feet (ft)" },
      { value: "yd", label: "Yards (yd)" }, { value: "mi", label: "Miles (mi)" }
    ]}
  ],
  "height-cm-feet": [
    { id: "cm", label: "Height (cm)", placeholder: "175" }
  ],
  "pace-km-mile": [
    { id: "direction", label: "Convert", type: "select", options: [
      { value: "km-to-mi", label: "Per km → per mile" }, { value: "mi-to-km", label: "Per mile → per km" }
    ]},
    { id: "minutes", label: "Minutes", placeholder: "5" },
    { id: "seconds", label: "Seconds", placeholder: "30" }
  ],
  "weight-kg-lbs": [
    { id: "kg", label: "Kilograms", placeholder: "70" },
    { id: "lbs", label: "Pounds", placeholder: "" }
  ],
  "time-min-hours": [
    { id: "minutes", label: "Minutes", placeholder: "150" }
  ]
};

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

/* ---------------- Discovery classification (fixed rubric, Gemini only applies it) ---------------- */

function buildClassifyPrompt(seedTopic, existingFormulas, keywords) {
  return `You are sorting search keywords for a calculator website into exactly 4 categories.
Apply ONLY the rules below — do not use your own judgment about what "deserves" a new page.

Topic: "${seedTopic}"
Existing formulas already built for this topic: ${existingFormulas.join(", ") || "(none yet)"}

RULES (apply in this order):
1. Label "new-formula-needed" ONLY if the keyword implies a DIFFERENT calculation method,
   different required inputs, or a different output than every existing formula listed above.
   Example: if the existing formula is a flat average, a keyword implying a WEIGHTED average
   with different input fields counts as new-formula-needed.
2. Label "existing-formula-new-page" if the keyword uses one of the existing formulas above
   but targets a different audience/context worth its own page (e.g. "for college" vs "for
   high school" using the same math). Include which exact formula name it reuses.
3. Label "topic-gap-existing-page" if the keyword doesn't need new math or a new page, but
   points to a real sub-concept that a genuinely comprehensive page on this topic SHOULD
   mention in its explainer/content — something a thorough page would cover as part of fully
   addressing the topic, not just answer as an isolated FAQ. Think: "does the existing page's
   prose actually explain this concept anywhere, even briefly?" If no, and it's a real concept
   (not just a phrasing variant), it belongs here.
4. Label "fold-into-faq" for everything else — a real, narrow question best answered as a
   standalone FAQ entry, not something the main explainer prose needs to cover.

Keywords to classify:
${keywords.map((k) => `- "${k}"`).join("\n")}

Output ONLY valid JSON, no markdown fences, no commentary:
{
  "new-formula-needed": [{"keyword":"...","reason":"one sentence explaining what's different"}],
  "existing-formula-new-page": [{"keyword":"...","suggestedPage":"short page name","matchedFormula":"exact formula name from the list above"}],
  "topic-gap-existing-page": [{"keyword":"...","suggestedPage":"which existing page should mention this","concept":"one sentence describing the sub-concept to add"}],
  "fold-into-faq": [{"keyword":"...","suggestedPage":"which existing page this FAQ belongs on"}]
}`;
}

/* ---------------- Content generation prompts ---------------- */

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

${!brief.titleHook ? `Also draft "titleHook": a short (under 30 characters), non-generic click-motivator for the
<title> tag — avoid generic verbs like "Instantly Calculate X". Lead with a concrete outcome or
real differentiator instead (e.g. "See Where You Stand", "The Exact Formula, Verified").` : ""}
${!brief.hook ? `Also draft "hook": one bold sentence with a REALISTIC worked example using specific numbers,
shown directly under the H1 (e.g. "A 175cm, 70kg adult has a BMI of 22.9").` : ""}

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
  "faq": [{"q":"...","a":"..."}]${!brief.titleHook ? ',\n  "titleHook": "..."' : ""}${!brief.hook ? ',\n  "hook": "..."' : ""}
}`;
}

function buildMeaningPrompt(brief) {
  return `You are writing content for a "what does X mean" page. Do not write generic filler —
be specific and concrete, with real usage examples. Never use these phrases or anything similar:
${BANNED_PHRASES.map((p) => `"${p}"`).join(", ")}.

Term to explain: "${brief.title}"

${!brief.titleHook ? `Also draft "titleHook": a short (under 30 characters), non-generic click-motivator for the
<title> tag — avoid generic phrasing, lead with what makes this term's meaning specifically
interesting or commonly misunderstood.` : ""}
${!brief.hook ? `Also draft "hook": one bold sentence capturing the real, specific meaning — not a dictionary
definition, something with actual insight (e.g. "IYKYK means the sender isn't going to explain
the joke — that's the whole point").` : ""}

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
  "faq": [{"q":"...","a":"..."}]${!brief.titleHook ? ',\n  "titleHook": "..."' : ""}${!brief.hook ? ',\n  "hook": "..."' : ""}
}`;
}

function runGuardrails(brief, generated, existingFileContent) {
  const reasons = [];
  const warnings = [];
  const effectiveTitleHook = brief.titleHook || generated.titleHook || "";
  const effectiveHook = brief.hook || generated.hook || "";

  if (!effectiveTitleHook) reasons.push("No titleHook — neither provided nor drafted by Gemini");
  if (!effectiveHook) reasons.push("No hook — neither provided nor drafted by Gemini");

  const fullTitle = brief.title + " | " + effectiveTitleHook;
  if (fullTitle.length > 60) reasons.push(`Title tag too long (${fullTitle.length}/60 chars): "${fullTitle}"`);

  const allText = JSON.stringify(generated).toLowerCase();
  BANNED_PHRASES.forEach((phrase) => {
    if (allText.includes(phrase.toLowerCase())) reasons.push(`Contains banned filler phrase: "${phrase}"`);
  });

  // Softened check: an exact-phrase miss is only a hard rejection if the underlying
  // CONCEPT also seems absent (no significant word overlap at all). If most of the
  // words are present just not as the literal string, that's the topical-authority
  // case — the concept is covered in different phrasing — so it's a warning, not a
  // rejection. A concept with zero word overlap is still treated as truly missing.
  (brief.requiredKeywords || []).forEach((kw) => {
    if (allText.includes(kw.toLowerCase())) return; // exact match, no issue at all
    const words = kw.toLowerCase().split(/\s+/).filter((w) => w.length > 3); // skip short filler words
    const overlapCount = words.filter((w) => allText.includes(w)).length;
    const overlapRatio = words.length > 0 ? overlapCount / words.length : 0;
    if (overlapRatio >= 0.5) {
      warnings.push(`Concept likely covered but exact phrase missing: "${kw}" (${overlapCount}/${words.length} key words present)`);
    } else {
      reasons.push(`Required keyword missing from output, concept not found either: "${kw}"`);
    }
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

  return { reasons, warnings };
}

async function callGemini(prompt, apiKey) {
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
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

function buildFaqAdditionPrompt(targetTitle, targetIntro, items) {
  return `You are writing FAQ additions for an EXISTING page — do not rewrite the page, only draft
new question/answer pairs to append to it. Do not write generic filler. Never use these phrases:
${BANNED_PHRASES.map((p) => `"${p}"`).join(", ")}.

Existing page: "${targetTitle}"
Existing page's intro: "${targetIntro || "(none)"}"

For each real search phrase below, write ONE natural FAQ question (phrased the way a person
would actually ask it, not necessarily the exact search phrase) and a plain-language answer
consistent with the existing page's content:
${items.map((it) => `- "${it.keyword}"${it.concept ? ` (concept: ${it.concept})` : ""}`).join("\n")}

Output ONLY valid JSON, no markdown fences, no commentary:
{ "faq": [{"q":"...","a":"..."}] }`;
}

/* Parses a *-data.js file's array into a real in-memory JS array, so both new
   entries and edits to existing entries can be handled uniformly, then
   re-serialized back to file text. Safe here since this is always YOUR OWN
   repo file, fetched fresh from GitHub — not arbitrary third-party input. */
function parseDataArray(content) {
  const fnSource = `var module = { exports: {} };\n${content}\nreturn module.exports;`;
  const fn = new Function(fnSource);
  return fn();
}

function serializeDataArray(content, array) {
  const declMatch = content.match(/const \w+ = \[/);
  if (!declMatch) throw new Error("Could not find array declaration in file content — file structure may have changed");
  const startIdx = declMatch.index + declMatch[0].length - 1; // position of "["
  const closeIdx = content.lastIndexOf("];");
  if (closeIdx === -1) throw new Error("Could not find array closing '];'");

  const before = content.slice(0, startIdx);
  const after = content.slice(closeIdx + 1); // everything from ";" onward
  return before + JSON.stringify(array, null, 2) + after;
}

/* Commits the updated file content to the "Chunk" branch via GitHub's API.
   Requires the file's current SHA on that branch (fetched fresh here, not reused
   from an earlier /api/fetch-data.js call, in case the branch moved in between). */
async function commitToGitHub(section, updatedContent) {
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  if (!githubToken || !githubRepo) throw new Error("GITHUB_TOKEN or GITHUB_REPO not configured on the server");

  const FILE_MAP = { calculators: "calculators-data.js", converters: "converters-data.js", meanings: "meanings-data.js", alternatives: "alternatives-data.js" };
  const filename = FILE_MAP[section];
  if (!filename) throw new Error("Invalid section for commit: " + section);

  const getResp = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${filename}?ref=Chunk`, {
    headers: { "Authorization": `Bearer ${githubToken}`, "Accept": "application/vnd.github+json" }
  });
  if (!getResp.ok) throw new Error(`Could not fetch current SHA on Chunk: ${getResp.status}`);
  const currentFile = await getResp.json();

  const putResp = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${filename}`, {
    method: "PUT",
    headers: { "Authorization": `Bearer ${githubToken}`, "Accept": "application/vnd.github+json", "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Add generated ${section} content via dashboard`,
      content: Buffer.from(updatedContent, "utf8").toString("base64"),
      sha: currentFile.sha,
      branch: "Chunk"
    })
  });
  if (!putResp.ok) {
    const detail = await putResp.text();
    throw new Error(`GitHub commit failed: ${putResp.status} — ${detail}`);
  }
  return await putResp.json();
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

  const action = (req.body && req.body.action) || "generate";

  /* ---------------- Classification action ---------------- */
  if (action === "classify") {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) { res.status(500).json({ error: "GEMINI_API_KEY not configured on the server" }); return; }

    const { seedTopic, existingFormulas, keywords } = req.body || {};
    if (!seedTopic || !Array.isArray(keywords) || keywords.length === 0) {
      res.status(400).json({ error: "Missing 'seedTopic' or 'keywords'" });
      return;
    }

    try {
      const prompt = buildClassifyPrompt(seedTopic, existingFormulas || [], keywords);
      const result = await callGemini(prompt, geminiKey);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Classification failed", detail: String(err) });
    }
    return;
  }

  /* ---------------- Commit-only action (push already-reviewed content) ---------------- */
  if (action === "commit") {
    const { section, updatedFileContent } = req.body || {};
    if (!section || !updatedFileContent) {
      res.status(400).json({ error: "Missing 'section' or 'updatedFileContent'" });
      return;
    }
    try {
      const commitResult = await commitToGitHub(section, updatedFileContent);
      res.status(200).json({ committed: true, commitSha: commitResult.commit && commitResult.commit.sha });
    } catch (err) {
      res.status(500).json({ error: "Commit failed", detail: String(err.message || err) });
    }
    return;
  }

  /* ---------------- Generate action (default) ---------------- */
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY not configured on the server" });
    return;
  }

  const { section, currentFileContent, newPageBriefs, faqAdditions } = req.body || {};
  const pageBriefs = newPageBriefs || [];
  const faqAdds = faqAdditions || [];
  if (!section || !currentFileContent || (pageBriefs.length === 0 && faqAdds.length === 0)) {
    res.status(400).json({ error: "Missing 'section', 'currentFileContent', or both 'newPageBriefs'/'faqAdditions' are empty" });
    return;
  }
  if (pageBriefs.length + faqAdds.length > 10) {
    res.status(400).json({ error: "Max 10 items per batch (new pages + FAQ additions combined)" });
    return;
  }

  const acceptedPages = [];
  const acceptedFaqs = [];
  const rejected = [];

  try {
    const dataArray = parseDataArray(currentFileContent);
    const existingSlugs = new Set(dataArray.map((e) => e.slug));
    const seenThisBatch = new Set();

    /* ---- New pages ---- */
    for (const brief of pageBriefs) {
      if (existingSlugs.has(brief.slug) || seenThisBatch.has(brief.slug)) {
        rejected.push({ slug: brief.slug, reasons: [`Slug "${brief.slug}" already exists — use a different slug, or this should be an FAQ addition instead`] });
        continue;
      }

      if (section !== "meanings" && !FIELD_DEFINITIONS[brief.formula]) {
        rejected.push({ slug: brief.slug, reasons: [`No field definitions found for formula "${brief.formula}" — this formula either doesn't exist yet or FIELD_DEFINITIONS needs updating. Not calling Gemini, since the page couldn't render anyway.`] });
        continue;
      }

      const prompt = section === "meanings" ? buildMeaningPrompt(brief) : buildCalculatorPrompt(brief);
      let generated;
      try {
        generated = await callGemini(prompt, geminiKey);
      } catch (err) {
        rejected.push({ slug: brief.slug, reasons: ["Gemini call failed: " + err.message] });
        continue;
      }

      const guardrailResult = runGuardrails(brief, generated, currentFileContent);
      if (guardrailResult.reasons.length > 0) {
        rejected.push({ slug: brief.slug, reasons: guardrailResult.reasons, warnings: guardrailResult.warnings, generatedContent: generated });
        continue;
      }

      const entry = Object.assign(
        { slug: brief.slug, title: brief.title, titleHook: brief.titleHook || generated.titleHook, hook: brief.hook || generated.hook },
        section === "meanings"
          ? { type: "info", h1: brief.title, metaDescription: generated.intro, intro: generated.intro, content: generated.content, caveat: generated.caveat, faq: generated.faq, related: brief.related || [] }
          : { type: "form", formula: brief.formula, fields: FIELD_DEFINITIONS[brief.formula], h1: brief.title, metaDescription: generated.intro, intro: generated.intro, explainer: generated.explainer, caveat: generated.caveat, depthBlocks: generated.depthBlocks, faq: generated.faq, related: brief.related || [] }
      );

      // Pre-flight: actually run this entry through the SAME rendering functions
      // build.js uses on the live site, before calling it accepted. Catches any
      // structural problem (missing fields, wrong shape, anything) right here in
      // the dashboard, instead of discovering it as a broken Vercel deploy later.
      try {
        buildToolContentHTML(entry, dataArray.concat([entry]), section, null);
        buildFaqSchema(entry.faq);
        buildToolSchema(entry, "https://quiklee.vercel.app/" + section + "/" + entry.slug);
        buildHowToSchema(entry);
      } catch (renderErr) {
        rejected.push({ slug: brief.slug, reasons: [`Failed pre-flight render check — would have broken the live build: ${renderErr.message}`], generatedContent: generated });
        continue;
      }

      dataArray.push(entry);
      seenThisBatch.add(brief.slug);
      acceptedPages.push({ slug: brief.slug, title: brief.title, previewIntro: generated.intro, previewFaq: (generated.faq || [])[0] });
      if (guardrailResult.warnings.length > 0) {
        rejected.push({ slug: brief.slug + " (accepted, with warnings)", reasons: [], warnings: guardrailResult.warnings });
      }
    }

    /* ---- FAQ additions, grouped by target page so each page gets one Gemini call ---- */
    const byTarget = {};
    faqAdds.forEach((item) => {
      if (!byTarget[item.targetSlug]) byTarget[item.targetSlug] = [];
      byTarget[item.targetSlug].push(item);
    });

    for (const targetSlug of Object.keys(byTarget)) {
      const targetEntry = dataArray.find((e) => e.slug === targetSlug);
      if (!targetEntry) {
        rejected.push({ slug: targetSlug + " (FAQ additions)", reasons: [`Target page "${targetSlug}" not found in the current file — it may need to be created as a new page first`] });
        continue;
      }

      let generated;
      try {
        const prompt = buildFaqAdditionPrompt(targetEntry.title, targetEntry.intro, byTarget[targetSlug]);
        generated = await callGemini(prompt, geminiKey);
      } catch (err) {
        rejected.push({ slug: targetSlug + " (FAQ additions)", reasons: ["Gemini call failed: " + err.message] });
        continue;
      }

      const newFaqs = generated.faq || [];
      const bannedHit = newFaqs.some((f) => BANNED_PHRASES.some((p) => (f.q + " " + f.a).toLowerCase().includes(p.toLowerCase())));
      if (bannedHit) {
        rejected.push({ slug: targetSlug + " (FAQ additions)", reasons: ["Contains banned filler phrase"], generatedContent: generated });
        continue;
      }

      if (!targetEntry.faq) targetEntry.faq = [];
      const existingQs = new Set(targetEntry.faq.map((f) => f.q.toLowerCase()));
      let addedCount = 0;
      newFaqs.forEach((f) => {
        if (!existingQs.has(f.q.toLowerCase())) {
          targetEntry.faq.push(f);
          existingQs.add(f.q.toLowerCase());
          addedCount++;
        }
      });
      acceptedFaqs.push({ targetSlug, targetTitle: targetEntry.title, addedCount, addedFaqs: newFaqs });
    }

    const updatedFileContent = serializeDataArray(currentFileContent, dataArray);

    res.status(200).json({
      updatedFileContent,
      acceptedPages,
      acceptedFaqs,
      rejected
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation pipeline failed", detail: String(err) });
  }
};
