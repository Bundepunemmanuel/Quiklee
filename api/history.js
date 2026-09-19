/* /api/history.js — Vercel serverless function
   Reads and appends to dashboard-history.json on the "dashboard-history" branch —
   a SEPARATE branch from "Chunk", so routine logging commits don't clutter your
   real content branch's history.

   Required Vercel environment variables:
     ADMIN_KEY      — same password as the other dashboard endpoints
     GITHUB_TOKEN    — same token as the other GitHub-connected endpoints
     GITHUB_REPO     — same repo

   GET  /api/history                → returns the full history list
   POST /api/history  { entry }     → appends one entry, returns the updated list

   Entry shape (all fields optional depending on type):
   {
     type: "research" | "generate" | "push",
     timestamp: "...",  (added server-side if omitted)
     seed, longtailCount, creditsUsed,           // research
     section, acceptedPagesCount, acceptedFaqsCount, rejectedCount,  // generate
     commitSha                                    // push
   }
*/

const HISTORY_FILE = "dashboard-history.json";
const HISTORY_BRANCH = "dashboard-history";

async function githubRequest(path, options = {}) {
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  if (!githubToken || !githubRepo) throw new Error("GITHUB_TOKEN or GITHUB_REPO not configured on the server");
  const response = await fetch(`https://api.github.com/repos/${githubRepo}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${githubToken}`,
      "Accept": "application/vnd.github+json",
      ...(options.headers || {})
    }
  });
  return response;
}

async function fetchHistory() {
  const response = await githubRequest(`/contents/${HISTORY_FILE}?ref=${HISTORY_BRANCH}`);
  if (response.status === 404) {
    // No history file yet — that's fine, means this is the first entry ever
    return { history: [], sha: null };
  }
  if (!response.ok) throw new Error(`GitHub fetch failed: ${response.status}`);
  const data = await response.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { history: JSON.parse(content), sha: data.sha };
}

async function writeHistory(history, sha) {
  const body = {
    message: `Log dashboard activity (${history.length} total entries)`,
    content: Buffer.from(JSON.stringify(history, null, 2), "utf8").toString("base64"),
    branch: HISTORY_BRANCH
  };
  if (sha) body.sha = sha;
  const response = await githubRequest(`/contents/${HISTORY_FILE}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub write failed: ${response.status} — ${detail}`);
  }
  return await response.json();
}

module.exports = async (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: "Invalid or missing password" });
    return;
  }

  try {
    if (req.method === "GET") {
      const { history } = await fetchHistory();
      res.status(200).json({ history });
      return;
    }

    if (req.method === "POST") {
      const entry = (req.body && req.body.entry) || {};
      if (!entry.type) {
        res.status(400).json({ error: "Missing 'entry.type'" });
        return;
      }
      entry.timestamp = entry.timestamp || new Date().toISOString();

      const { history, sha } = await fetchHistory();
      history.unshift(entry); // newest first
      await writeHistory(history, sha);
      res.status(200).json({ history });
      return;
    }

    res.status(405).json({ error: "Use GET or POST" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "History request failed",
      detail: String(err.message || err),
      hint: `Make sure a branch named "${HISTORY_BRANCH}" exists in your repo — it needs to be created once, same as you did for "Chunk".`
    });
  }
};
