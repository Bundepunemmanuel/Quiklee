/* /api/paa.js — Vercel serverless function
   Password-gated proxy to Serper.dev's search endpoint, pulling the
   "People Also Ask" box for each keyword. Real structured JSON from a
   licensed API — no HTML scraping, no artificial delays needed.

   Required Vercel environment variables:
     ADMIN_KEY       — same password as /api/longtail.js
     SERPER_API_KEY  — your real Serper.dev API key

   Request:  POST /api/paa   { "keywords": ["how to calculate roi for a startup", ...] }
   Response: { "results": [ { "keyword": "...", "questions": [{question, answer, source}] } ], "creditsUsed": 12 }
*/

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

  const keywords = (req.body && req.body.keywords) || [];
  if (!Array.isArray(keywords) || keywords.length === 0) {
    res.status(400).json({ error: "Missing 'keywords' array in request body" });
    return;
  }

  const results = [];
  let creditsUsed = 0;

  try {
    for (const keyword of keywords) {
      const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": serperKey,
          "Content-Type": "application/json"
        },
        // num:10 keeps this at 1 credit per query — raising it past 10 results
        // doubles the credit cost per Serper's pricing, so leave this alone
        // unless you specifically need more than the top 10 results.
        body: JSON.stringify({ q: keyword, num: 10 })
      });
      creditsUsed += 1;

      if (!response.ok) {
        console.error(`Serper search failed for "${keyword}": ${response.status}`);
        results.push({ keyword, questions: [], error: `HTTP ${response.status}` });
        continue;
      }

      const data = await response.json();
      // NOTE: verify this field name against Serper's current docs before relying on it.
      // As of this build, the People Also Ask box is typically under `peopleAlsoAsk`.
      const paa = data.peopleAlsoAsk || [];
      const questions = paa.map((item) => ({
        question: item.question || "",
        answer: item.snippet || "",
        source: item.link || ""
      }));

      results.push({ keyword, questions });
    }

    res.status(200).json({ results, creditsUsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Request to Serper failed", detail: String(err) });
  }
};
