/* /api/longtail.js — Vercel serverless function
   Password-gated proxy to Serper.dev's autocomplete endpoint.
   Your Serper API key stays server-side (env var), never sent to the browser.

   Required Vercel environment variables:
     ADMIN_KEY       — a password you choose, checked against the x-admin-key header
     SERPER_API_KEY  — your real Serper.dev API key

   Request:  POST /api/longtail   { "seed": "roi calculator" }
   Response: { "keywords": ["roi calculator formula for startups", ...], "creditsUsed": 26 }
*/

// Brand/corporate names to drop from results — extend this list as you see junk come through
const BRAND_DENYLIST = [
  "chase", "excel", "amazon", "google", "microsoft", "apple", "paypal",
  "venmo", "cashapp", "walmart", "target", "costco", "ebay", "netflix",
  "spotify", "youtube", "facebook", "instagram", "tiktok"
];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

function isJunk(phrase) {
  const words = phrase.trim().split(/\s+/);
  if (words.length < 4) return true;
  const lower = phrase.toLowerCase();
  if (BRAND_DENYLIST.some((b) => lower.includes(b))) return true;
  return false;
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
  if (!seed) {
    res.status(400).json({ error: "Missing 'seed' keyword in request body" });
    return;
  }

  const found = new Set();
  let creditsUsed = 0;

  try {
    // Loop the alphabet: "seed a", "seed b", ... "seed z" — same pattern as
    // manually typing a seed keyword into Google and reading the autocomplete list.
    for (const letter of ALPHABET) {
      const query = `${seed} ${letter}`;
      const response = await fetch("https://google.serper.dev/autocomplete", {
        method: "POST",
        headers: {
          "X-API-KEY": serperKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ q: query })
      });
      creditsUsed += 1;

      if (!response.ok) {
        // Don't abort the whole run on one bad letter — log and continue
        console.error(`Serper autocomplete failed for "${query}": ${response.status}`);
        continue;
      }

      const data = await response.json();
      // NOTE: verify this field name against Serper's current docs before relying on it —
      // API response shapes can change. As of this build it's typically `suggestions`.
      const suggestions = data.suggestions || data.results || [];
      suggestions.forEach((s) => {
        const phrase = typeof s === "string" ? s : (s.value || s.query || "");
        if (phrase && !isJunk(phrase)) found.add(phrase.trim());
      });
    }

    res.status(200).json({
      seed,
      keywords: Array.from(found).sort(),
      creditsUsed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Request to Serper failed", detail: String(err) });
  }
};
