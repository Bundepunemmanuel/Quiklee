/* Quiklee — render-lib
   Pure string-based HTML builders shared by build.js.
   No DOM dependency — safe to run in Node at build time.
*/

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

/* Builds the inner <div id="tool-root"> content for one tool page */
function buildToolContentHTML(entry, allData) {
  var html = "";
  html += "<h1>" + esc(entry.h1) + "</h1>";
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
    entry.explainer.forEach(function (p) { html += "<p>" + esc(p) + "</p>"; });
    if (entry.caveat) html += '<div class="caveat">' + esc(entry.caveat) + "</div>";
    html += "</div>";
  } else if (entry.caveat) {
    html += '<div class="explainer"><div class="caveat">' + esc(entry.caveat) + "</div></div>";
  }

  if (entry.related && entry.related.length) {
    html += '<div class="related"><h2>Related tools</h2><div class="related-list">';
    entry.related.forEach(function (slug) {
      var rel = findEntry(allData, slug);
      if (rel) html += '<a href="/' + rel.slug + '">' + esc(rel.title) + "</a>";
    });
    html += "</div></div>";
  }

  return html;
}

/* Builds the inner #hub-list content for a category hub page */
function buildHubListHTML(dataArray) {
  var groups = {};
  var order = [];
  dataArray.forEach(function (e) {
    if (!groups[e.cluster]) { groups[e.cluster] = { label: e.clusterLabel, items: [] }; order.push(e.cluster); }
    groups[e.cluster].items.push(e);
  });
  var html = "";
  order.forEach(function (key) {
    var g = groups[key];
    html += '<div class="cluster-group"><h3>' + esc(g.label) + '</h3><div class="tool-link-list">';
    g.items.forEach(function (item) {
      html += '<a href="/' + item.slug + '">' + esc(item.title) + '<span class="desc">' + esc(item.metaDescription) + "</span></a>";
    });
    html += "</div></div>";
  });
  return html;
}

module.exports = { esc: esc, findEntry: findEntry, buildToolContentHTML: buildToolContentHTML, buildHubListHTML: buildHubListHTML };
