/* /api/fetch-data.js — Vercel serverless function
   Fetches the current *-data.js file directly from your GitHub repo, so the
   dashboard always works against the real, latest version — no manual upload step.

   Required Vercel environment variables:
     ADMIN_KEY      — same password as the other dashboard endpoints
     GITHUB_TOKEN   — a GitHub Personal Access Token, scoped to this one repo
     GITHUB_REPO    — "yourusername/yourrepo" (e.g. "Bundepunemmanuel/Quiklee")

   Request:  GET /api/fetch-data?section=calculators
   Response: { "section": "calculators", "content": "<raw file text>", "sha": "..." }

   The "sha" is GitHub's version identifier for the file — not used for writing here
   (this endpoint is read-only / fetch-only, per your call not to auto-commit), but
   included in case a future write step needs it.
*/

const FILE_MAP = {
  calculators: "calculators-data.js",
  converters: "converters-data.js",
  meanings: "meanings-data.js",
  alternatives: "alternatives-data.js"
};

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Use GET" });
    return;
  }

  const adminKey = req.headers["x-admin-key"];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: "Invalid or missing password" });
    return;
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  if (!githubToken || !githubRepo) {
    res.status(500).json({ error: "GITHUB_TOKEN or GITHUB_REPO not configured on the server" });
    return;
  }

  const section = (req.query && req.query.section || "").trim();
  const filename = FILE_MAP[section];
  if (!filename) {
    res.status(400).json({ error: "Invalid 'section' — must be one of: " + Object.keys(FILE_MAP).join(", ") });
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${filename}?ref=Chunk`, {
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      const detail = await response.text();
      res.status(response.status).json({ error: `GitHub API error fetching ${filename}`, detail });
      return;
    }

    const data = await response.json();
    // GitHub returns file content base64-encoded
    const content = Buffer.from(data.content, "base64").toString("utf8");

    res.status(200).json({ section, filename, content, sha: data.sha });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from GitHub", detail: String(err) });
  }
};
