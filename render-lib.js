/* Quiklee — render-lib
   Pure string-based HTML builders shared by build.js.
   No DOM dependency — safe to run in Node at build time.
*/

function urlFor(sectionPath, slug) {
  return sectionPath ? "/" + sectionPath + "/" + slug : "/" + slug;
}

/* Builds the jump-to-cluster chip nav shown at the top of a hub page */
function buildClusterNav(dataArray, sectionPath) {
  var seen = {};
  var order = [];
  dataArray.forEach(function (e) {
    if (!seen[e.cluster]) { seen[e.cluster] = e.clusterLabel; order.push(e.cluster); }
  });
  var html = "";
  order.forEach(function (key) {
    html += '<a href="#cluster-' + esc(key) + '" class="cluster-chip">' + esc(seen[key]) + "</a>";
  });
  return html;
}

/* Builds the inner #hub-list content for a category hub page — ledger rows, not cards */
function buildHubListHTML(dataArray, sectionPath) {
  var groups = {};
  var order = [];
  dataArray.forEach(function (e) {
    if (!groups[e.cluster]) { groups[e.cluster] = { label: e.clusterLabel, items: [] }; order.push(e.cluster); }
    groups[e.cluster].items.push(e);
  });
  var html = "";
  order.forEach(function (key) {
    var g = groups[key];
    html += '<div class="cluster-group" id="cluster-' + esc(key) + '"><h3>' + esc(g.label) + '<span class="count">' + g.items.length + '</span></h3><div class="accent-rule"></div><div class="tool-link-list">';
    g.items.forEach(function (item) {
      html += '<a href="' + urlFor(sectionPath, item.slug) + '"><span class="tool-name">' + esc(item.title) + '</span><span class="desc">' + esc(item.metaDescription) + "</span></a>";
    });
    html += "</div></div>";
  });
  return html;
}

/* Renders the depth-block content (risks, limitations, classification tables, etc.)
   using the same h2/p/table/steps pattern as info-type pages — but attachable to
   any tool page, form or info, wherever real added depth is warranted. */
function buildDepthBlocksHTML(blocks) {
  if (!blocks || !blocks.length) return "";
  var html = '<div class="depth-blocks">';
  blocks.forEach(function (block) {
    if (block.type === "h2") html += "<h2>" + esc(block.text) + "</h2>";
    else if (block.type === "p") html += "<p>" + esc(block.text) + "</p>";
    else if (block.type === "steps") {
      html += "<ol class='steps'>" + block.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ol>";
    } else if (block.type === "list") {
      html += "<ul class='depth-list'>" + block.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>";
    } else if (block.type === "table") {
      html += '<table class="info-table"><thead><tr>' + block.headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>";
      block.rows.forEach(function (row) {
        html += "<tr>" + row.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
      });
      html += "</tbody></table>";
    }
  });
  html += "</div>";
  return html;
}

/* Renders an empty gauge shell for form-type entries that request one (e.g. BMI).
   main.js positions the marker and colors it once a result is calculated. */
function buildGaugeHTML(gauge) {
  if (!gauge) return "";
  var html = '<div class="gauge-wrap" id="gauge-wrap" style="display:none;">';
  html += '<div class="gauge-bar">';
  gauge.bands.forEach(function (band) {
    html += '<div class="gauge-band" style="flex:' + band.weight + ';background:' + band.color + ';" title="' + esc(band.label) + '"></div>';
  });
  html += '<div class="gauge-marker" id="gauge-marker"></div>';
  html += "</div>";
  html += '<div class="gauge-labels">' + gauge.bands.map(function (b) { return "<span>" + esc(b.label) + "</span>"; }).join("") + "</div>";
  html += "</div>";
  return html;
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function findEntry(dataArray, slug) {
  for (var i = 0; i < dataArray.length; i++) {
    if (dataArray[i].slug === slug) return dataArray[i];
  }
  return null;
}

/* Turns explainer paragraphs into HTML, auto-linking any [[slug|label]] markers
   the data file uses for natural, in-body contextual links (not a forced link dump). */
function linkifyExplainer(text, sectionPath) {
  return esc(text).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, function (_, slug, label) {
    return '<a href="' + urlFor(sectionPath, slug) + '">' + esc(label) + "</a>";
  });
}

/* Builds the inner <div id="tool-root"> content for one tool page */
function buildToolContentHTML(entry, allData, sectionPath) {
  var html = "";
  html += "<h1>" + esc(entry.h1) + "</h1>";

  if (entry.hook) {
    html += '<p class="hook-line">' + esc(entry.hook) + "</p>";
  }
  html += '<p class="muted" style="max-width:560px;">' + esc(entry.intro) + "</p>";

  if (entry.type === "form") {
    html += '<div class="tool-card"><form id="tool-form" data-formula="' + esc(entry.formula) + '">';
    entry.fields.forEach(function (f) {
      html += '<div class="field"><label for="f-' + f.id + '">' + esc(f.label) + "</label>";
      if (f.type === "select") {
        html += '<select id="f-' + f.id + '">';
        f.options.forEach(function (o) { html += '<option value="' + esc(o.value) + '">' + esc(o.label) + "</option>"; });
        html += "</select>";
      } else {
        html += '<input type="number" step="any" id="f-' + f.id + '" placeholder="' + esc(f.placeholder || "") + '">';
      }
      html += "</div>";
    });
    html += '<button type="submit" class="btn-calc">Calculate</button>';
    html += '<div class="result-box" id="result-box"><div class="result-main" id="result-main"></div><div class="result-sub" id="result-sub"></div></div>';
    if (entry.gauge) html += buildGaugeHTML(entry.gauge);
    html += "</form></div>";
  } else if (entry.type === "info") {
    html += '<div class="tool-card">';
    entry.content.forEach(function (block) {
      if (block.type === "h2") html += "<h2>" + esc(block.text) + "</h2>";
      else if (block.type === "p") html += "<p>" + esc(block.text) + "</p>";
      else if (block.type === "steps") {
        html += "<ol class='steps'>" + block.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ol>";
      } else if (block.type === "table") {
        html += '<table class="info-table"><thead><tr>' + block.headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>";
        block.rows.forEach(function (row) {
          html += "<tr>" + row.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
        });
        html += "</tbody></table>";
      }
    });
    html += "</div>";
  }

  if (entry.type === "form" && entry.explainer && entry.explainer.length) {
    html += '<div class="explainer"><h2>How this works</h2>';
    entry.explainer.forEach(function (p) { html += "<p>" + linkifyExplainer(p, sectionPath) + "</p>"; });
    if (entry.caveat) html += '<div class="caveat">' + esc(entry.caveat) + "</div>";
    html += "</div>";
  } else if (entry.caveat) {
    html += '<div class="explainer"><div class="caveat">' + esc(entry.caveat) + "</div></div>";
  }

  if (entry.depthBlocks && entry.depthBlocks.length) {
    html += buildDepthBlocksHTML(entry.depthBlocks);
  }

  if (entry.faq && entry.faq.length) {
    html += buildFaqHTML(entry.faq);
  }

  if (entry.related && entry.related.length) {
    html += '<div class="related"><h2>Related tools</h2><div class="related-list">';
    entry.related.forEach(function (slug) {
      var rel = findEntry(allData, slug);
      if (rel) html += '<a href="' + urlFor(sectionPath, rel.slug) + '">' + esc(rel.title) + "</a>";
    });
    html += "</div></div>";
  }

  return html;
}

/* Renders a real, visible FAQ section — this is what carries long-tail keyword
   phrasing into actual page body content, in plain language, matched to intent. */
function buildFaqHTML(faqList) {
  var html = '<div class="faq-section"><h2>Frequently asked questions</h2>';
  faqList.forEach(function (item) {
    html += '<div class="faq-item"><h3>' + esc(item.q) + "</h3><p>" + esc(item.a) + "</p></div>";
  });
  html += "</div>";
  return html;
}

/* Generates matching FAQPage JSON-LD so Google can show FAQ rich results. */
function buildFaqSchema(faqList) {
  if (!faqList || !faqList.length) return "";
  var schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(function (item) {
      return {
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      };
    })
  };
  return JSON.stringify(schema);
}

/* Builds the inner #hub-list content for a category hub page */

module.exports = {
  esc: esc,
  findEntry: findEntry,
  buildToolContentHTML: buildToolContentHTML,
  buildHubListHTML: buildHubListHTML,
  buildClusterNav: buildClusterNav,
  buildDepthBlocksHTML: buildDepthBlocksHTML,
  buildGaugeHTML: buildGaugeHTML,
  buildFaqHTML: buildFaqHTML,
  buildFaqSchema: buildFaqSchema
};
