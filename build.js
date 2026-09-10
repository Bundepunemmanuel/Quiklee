/* Quiklee — build script
   Run this any time you add/edit an entry in a *-data.js file:
     node build.js
   It generates a real, complete, static .html file for every tool and every hub page —
   content is baked into the raw HTML, so Google never depends on JavaScript to see it.
   Also rebuilds vercel.json (clean URLs) and sitemap.xml automatically.
   You never hand-write or hand-edit any of the generated files.
*/
const fs = require("fs");
const path = require("path");
const { esc, buildToolContentHTML, buildHubListHTML } = require("./render-lib.js");

const calculatorsData = require("./calculators-data.js");
const convertersData = require("./converters-data.js");
const meaningsData = require("./meanings-data.js");
const allData = [].concat(calculatorsData, convertersData, meaningsData);

const SITE = "https://quiklee.vercel.app";
const pageTemplate = fs.readFileSync(path.join(__dirname, "page-template.html"), "utf8");
const hubTemplate = fs.readFileSync(path.join(__dirname, "hub-template.html"), "utf8");

function fill(template, map) {
  return template.replace(/{{(\w+)}}/g, function (_, key) {
    return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : "";
  });
}

/* ---------- Generate one static file per tool ---------- */
function buildSection(dataArray, sectionPath, sectionLabel) {
  dataArray.forEach(function (entry) {
    const html = fill(pageTemplate, {
      TITLE: esc(entry.title),
      META_DESCRIPTION: esc(entry.metaDescription),
      CANONICAL: SITE + "/" + entry.slug,
      BREADCRUMB: '<a href="/">Home</a> &rsaquo; <a href="/' + sectionPath + '">' + esc(sectionLabel) + '</a> &rsaquo; ' + esc(entry.title),
      CONTENT: buildToolContentHTML(entry, allData)
    });
    fs.writeFileSync(path.join(__dirname, entry.slug + ".html"), html);
  });
  console.log("Built " + dataArray.length + " pages for " + sectionPath);
}

buildSection(calculatorsData, "calculators", "Calculators");
buildSection(convertersData, "converters", "Converters");
buildSection(meaningsData, "meanings", "Meanings");

/* ---------- Generate the 3 hub pages ---------- */
const hubs = [
  { file: "calculators.html", data: calculatorsData, path: "calculators", label: "Calculators",
    intro: "Every calculator on Quiklee, grouped by cluster. Each one is a real, separate page built for a specific search." },
  { file: "converters.html", data: convertersData, path: "converters", label: "Converters",
    intro: "Every converter on Quiklee, grouped by cluster. Each one is a real, separate page built for a specific search." },
  { file: "meanings.html", data: meaningsData, path: "meanings", label: "Meanings",
    intro: "Every meaning on Quiklee, grouped by category. Slang, acronyms, and tech terms, explained plainly." }
];

hubs.forEach(function (hub) {
  const html = fill(hubTemplate, {
    TITLE: "All " + hub.label,
    META_DESCRIPTION: "Browse every " + hub.label.toLowerCase() + " on Quiklee, grouped by category.",
    CANONICAL: SITE + "/" + hub.path,
    SECTION_LABEL: hub.label,
    H1: "All " + hub.label,
    INTRO: hub.intro,
    HUB_LIST: buildHubListHTML(hub.data)
  });
  fs.writeFileSync(path.join(__dirname, hub.file), html);
});
console.log("Built 3 hub pages");

/* ---------- Rebuild vercel.json (clean URLs, no manual rewrite list needed) ---------- */
const vercelConfig = {
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] }
  ]
};
fs.writeFileSync(path.join(__dirname, "vercel.json"), JSON.stringify(vercelConfig, null, 2) + "\n");
console.log("Rebuilt vercel.json (cleanUrls mode)");

/* ---------- Rebuild sitemap.xml ---------- */
const today = new Date().toISOString().slice(0, 10);
const staticUrls = ["/", "/calculators", "/converters", "/meanings"];
const toolUrls = allData.map(function (e) { return "/" + e.slug; });
const urls = staticUrls.concat(toolUrls);
const body = urls.map(function (u) {
  return "  <url>\n    <loc>" + SITE + u + "</loc>\n    <lastmod>" + today + "</lastmod>\n  </url>";
}).join("\n");
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + "\n</urlset>\n";
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), xml);
console.log("Rebuilt sitemap.xml with " + urls.length + " URLs");

console.log("\nDone. " + allData.length + " tool pages + 3 hub pages + index.html = " + (allData.length + 4) + " total live pages.");
