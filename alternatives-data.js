/* Quiklee — alternatives data
   "X Alternatives" pages (e.g. "Canva Alternatives") — replaces the earlier "Comparisons"
   plan with a stronger standalone SEO pattern: one tool framed against several competitors,
   rather than a single head-to-head "A vs B" page.

   This file is intentionally empty right now — this round only stands up the category
   infrastructure (folder routing, hub page, build pipeline). Real entries get added the
   same way every other section does: copy the shape below, fill it in, run `node build.js`.

   Suggested entry shape (uncomment and adapt when adding the first real page):

   {
     slug: "canva-alternatives",
     cluster: "design-tools",
     clusterLabel: "Design Tool Alternatives",
     title: "Canva Alternatives",
     titleHook: "5 Real Options, Compared",
     metaDescription: "The best Canva alternatives in 2026, compared on price, features, and who each one actually suits.",
     h1: "Canva Alternatives",
     hook: "Figma is the strongest free alternative for teams; Adobe Express wins for pure simplicity.",
     intro: "...",
     type: "info",
     content: [
       { type: "h2", text: "..." },
       { type: "table", headers: ["Tool", "Best for", "Price"], rows: [ ["...", "...", "..."] ] }
     ],
     caveat: null,
     faq: [ { q: "...", a: "..." } ],
     related: []
   }
*/
const alternativesData = [];

if (typeof module !== "undefined") { module.exports = alternativesData; }
