/* Quiklee — build script
   Run this any time you add/edit an entry in a *-data.js file:
     node build.js
   It generates a real, complete, static .html file for every tool and every hub page —
   content is baked into the raw HTML, so Google never depends on JavaScript to see it.
   Also rebuilds vercel.json (clean URLs) and sitemap.xml automatically.
   You never hand-write or hand-edit any of the generated files.

   All 4 sections (calculators, converters, meanings, alternatives) use folder-based
   clean URLs: /calculators/[slug], /converters/[slug], /meanings/[slug], /alternatives/[slug].
*/
const fs = require("fs");
const path = require("path");
const { esc, buildToolContentHTML, buildHubListHTML, buildClusterNav, buildFaqSchema, buildToolSchema, buildHowToSchema } = require("./render-lib.js");

const calculatorsData = require("./calculators-data.js");
const convertersData = require("./converters-data.js");
const meaningsData = require("./meanings-data.js");
const alternativesData = require("./alternatives-data.js");
const allData = [].concat(calculatorsData, convertersData, meaningsData, alternativesData);

/* Global slug -> sectionPath map, so related/in-body links resolve to the
   correct folder even when they point across sections (e.g. a converter
   linking to a calculator, or vice versa). */
const slugMap = {};
[
  { data: calculatorsData, path: "calculators" },
  { data: convertersData, path: "converters" },
  { data: meaningsData, path: "meanings" },
  { data: alternativesData, path: "alternatives" }
].forEach(function (section) {
  section.data.forEach(function (entry) { slugMap[entry.slug] = section.path; });
});

const SITE = "https://quiklee.vercel.app";
const pageTemplate = fs.readFileSync(path.join(__dirname, "page-template.html"), "utf8");
const hubTemplate = fs.readFileSync(path.join(__dirname, "hub-template.html"), "utf8");

const TITLE_MAX = 60;
const META_MAX = 160;
let warnings = 0;

function fill(template, map) {
  return template.replace(/{{(\w+)}}/g, function (_, key) {
    return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : "";
  });
}

function checkLengths(entry) {
  const fullTitle = entry.title + " | " + (entry.titleHook || "Quiklee");
  if (fullTitle.length > TITLE_MAX) {
    console.warn("  ⚠ TITLE too long (" + fullTitle.length + " chars, max " + TITLE_MAX + "): " + fullTitle);
    warnings++;
  }
  if (entry.metaDescription && entry.metaDescription.length > META_MAX) {
    console.warn("  ⚠ META DESCRIPTION too long (" + entry.metaDescription.length + " chars, max " + META_MAX + "): " + entry.slug);
    warnings++;
  }
}

/* ---------- Generate one static file per tool, in /<sectionPath>/<slug>.html ---------- */
function buildSection(dataArray, sectionPath, sectionLabel) {
  const dir = path.join(__dirname, sectionPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  dataArray.forEach(function (entry) {
    checkLengths(entry);
    const urlPath = "/" + sectionPath + "/" + entry.slug;
    const canonical = SITE + urlPath;
    // Combine FAQ, SoftwareApplication, and HowTo schema into one or more script tags —
    // each is additive structured data; empty ones are simply omitted.
    const schemas = [
      buildFaqSchema(entry.faq),
      buildToolSchema(entry, canonical),
      buildHowToSchema(entry)
    ].filter(Boolean);
    const schemaTags = schemas.map(function (s) { return '<script type="application/ld+json">' + s + "</script>"; }).join("\n");
    const html = fill(pageTemplate, {
      TITLE: esc(entry.title),
      TITLE_HOOK: esc(entry.titleHook || "Quiklee"),
      META_DESCRIPTION: esc(entry.metaDescription),
      CANONICAL: canonical,
      BREADCRUMB: '<a href="/">Home</a> &rsaquo; <a href="/' + sectionPath + '">' + esc(sectionLabel) + '</a> &rsaquo; ' + esc(entry.title),
      CONTENT: buildToolContentHTML(entry, allData, sectionPath, slugMap),
      FAQ_SCHEMA_TAG: schemaTags
    });
    fs.writeFileSync(path.join(dir, entry.slug + ".html"), html);
  });
  console.log("Built " + dataArray.length + " pages for " + sectionPath + " (folder: /" + sectionPath + "/)");
}

buildSection(calculatorsData, "calculators", "Calculators");
buildSection(convertersData, "converters", "Converters");
buildSection(meaningsData, "meanings", "Meanings");
buildSection(alternativesData, "alternatives", "Alternatives");

/* ---------- Generate the 4 hub pages (always at root) ---------- */
const hubs = [
  { file: "calculators.html", data: calculatorsData, path: "calculators", label: "Calculators",
    intro: "Every calculator on Quiklee, grouped by cluster. Each one is a real, separate page built for a specific search." },
  { file: "converters.html", data: convertersData, path: "converters", label: "Converters",
    intro: "Every converter on Quiklee, grouped by cluster. Each one is a real, separate page built for a specific search." },
  { file: "meanings.html", data: meaningsData, path: "meanings", label: "Meanings",
    intro: "Every meaning on Quiklee, grouped by category. Slang, acronyms, and tech terms, explained plainly." },
  { file: "alternatives.html", data: alternativesData, path: "alternatives", label: "Alternatives",
    intro: "Real alternatives to popular tools and apps, compared honestly — coming soon." }
];

hubs.forEach(function (hub) {
  const html = fill(hubTemplate, {
    TITLE: "All " + hub.label,
    TITLE_HOOK: "Quiklee",
    META_DESCRIPTION: "Browse every " + hub.label.toLowerCase() + " on Quiklee, grouped by category.",
    CANONICAL: SITE + "/" + hub.path,
    SECTION_LABEL: hub.label,
    H1: "All " + hub.label,
    INTRO: hub.intro,
    HUB_LIST: hub.data.length ? buildHubListHTML(hub.data, hub.path) : '<p class="muted" style="padding:16px;">No pages here yet — check back soon.</p>',
    HUB_NAV: hub.data.length ? buildClusterNav(hub.data, hub.path) : "",
    FAQ_SCHEMA_TAG: ""
  });
  fs.writeFileSync(path.join(__dirname, hub.file), html);
});
console.log("Built 4 hub pages");

/* ---------- Rebuild vercel.json (clean URLs, no manual rewrite list needed) ---------- */
const vercelConfig = {
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] },
    { source: "/emmybund", headers: [
      { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" }
    ]}
  ]
};
fs.writeFileSync(path.join(__dirname, "vercel.json"), JSON.stringify(vercelConfig, null, 2) + "\n");
console.log("Rebuilt vercel.json (cleanUrls mode)");

/* ---------- Rebuild sitemap.xml ---------- */
const today = new Date().toISOString().slice(0, 10);
const staticUrls = ["/", "/calculators", "/converters", "/meanings", "/alternatives"];
const calcUrls = calculatorsData.map(function (e) { return "/calculators/" + e.slug; });
const convUrls = convertersData.map(function (e) { return "/converters/" + e.slug; });
const meanUrls = meaningsData.map(function (e) { return "/meanings/" + e.slug; });
const altUrls = alternativesData.map(function (e) { return "/alternatives/" + e.slug; });
const urls = staticUrls.concat(calcUrls, convUrls, meanUrls, altUrls);
const body = urls.map(function (u) {
  return "  <url>\n    <loc>" + SITE + u + "</loc>\n    <lastmod>" + today + "</lastmod>\n  </url>";
}).join("\n");
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + "\n</urlset>\n";
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), xml);
console.log("Rebuilt sitemap.xml with " + urls.length + " URLs");

console.log("\nDone. " + allData.length + " tool pages + 4 hub pages + index.html = " + (allData.length + 5) + " total live pages.");
if (warnings > 0) {
  console.log(warnings + " title/meta length warning(s) above — fix these before deploying so nothing gets truncated in search results.");
} else {
  console.log("All titles and meta descriptions are within Google's display limits.");
}
