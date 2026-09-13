/* /api/longtail.js — Vercel serverless function
   Password-gated proxy to Google's public autocomplete suggest endpoint.
   No API key needed, no Serper credits spent — this is a public, unauthenticated
   endpoint (the same one your browser calls for search-bar suggestions), used here
   at low, normal, personal-project volume with no evasion tactics.

   Required Vercel environment variables:
     ADMIN_KEY  — a password you choose, checked against the x-admin-key header

   Request:  POST /api/longtail   { "seed": "roi calculator" }
   Response: { "keywords": ["roi calculator formula for startups", ...], "creditsUsed": 0 }
*/

// Brand/corporate names to drop from results — extend this list as you see junk come through
const BRAND_DENYLIST = [
  "chase", "excel", "amazon", "google", "microsoft", "apple", "paypal",
  "venmo", "cashapp", "walmart", "target", "costco", "ebay", "netflix",
  "spotify", "youtube", "facebook", "instagram", "tiktok"
];

// Reduced from the full 26-letter alphabet — these consistently return more useful
// long-tail phrases per past runs. Edit this list any time based on what you observe.
const LETTERS = ["a", "b", "c", "d", "f", "h", "i", "k", "l", "m", "n", "s", "t", "w", "y"];

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

  const seed = (req.body && req.body.seed || "").trim();
  if (!seed) {
    res.status(400).json({ error: "Missing 'seed' keyword in request body" });
    return;
  }

  const found = new Set();

  try {
    for (const letter of LETTERS) {
      const query = `${seed} ${letter}`;
      const url = "https://suggestqueries.google.com/complete/search?client=firefox&q=" + encodeURIComponent(query);
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Suggest endpoint failed for "${query}": ${response.status}`);
        continue;
      }

      // Response shape: ["query", ["suggestion 1", "suggestion 2", ...], ...]
      const data = await response.json();
      const suggestions = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
      suggestions.forEach((phrase) => {
        if (phrase && !isJunk(phrase)) found.add(phrase.trim());
      });
    }

    res.status(200).json({
      seed,
      keywords: Array.from(found).sort(),
      creditsUsed: 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Request to suggest endpoint failed", detail: String(err) });
  }
};
