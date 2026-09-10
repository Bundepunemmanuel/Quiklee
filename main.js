/* Quiklee — client-side engine (runs in the browser)
   Content on tool/hub pages is now baked into the static HTML by build.js.
   This file only handles: search-as-you-type, and running the calculator
   logic when someone submits a tool's form. Nothing here is required for
   Google to read the page content — it's purely interactive behavior.
*/

(function () {
  "use strict";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  /* ---------------- Search (site-wide) ---------------- */
  function buildSearchIndex() {
    var all = [];
    if (typeof calculatorsData !== "undefined") {
      calculatorsData.forEach(function (e) { all.push({ slug: e.slug, title: e.title, cat: "Calculator" }); });
    }
    if (typeof convertersData !== "undefined") {
      convertersData.forEach(function (e) { all.push({ slug: e.slug, title: e.title, cat: "Converter" }); });
    }
    if (typeof meaningsData !== "undefined") {
      meaningsData.forEach(function (e) { all.push({ slug: e.slug, title: e.title, cat: "Meaning" }); });
    }
    return all;
  }

  function attachSearch(inputEl, resultsEl) {
    if (!inputEl || !resultsEl) return;
    var index = buildSearchIndex();

    function render(query) {
      var q = query.trim().toLowerCase();
      if (!q) { resultsEl.classList.remove("show"); resultsEl.innerHTML = ""; return; }
      var matches = index.filter(function (item) {
        return item.title.toLowerCase().indexOf(q) !== -1 || item.slug.indexOf(q) !== -1;
      }).slice(0, 8);
      if (!matches.length) {
        resultsEl.innerHTML = '<div style="padding:14px 16px;color:var(--muted);font-size:0.88rem;">No matches yet — try a different term.</div>';
        resultsEl.classList.add("show");
        return;
      }
      resultsEl.innerHTML = matches.map(function (m) {
        return '<a href="/' + m.slug + '">' + esc(m.title) + '<span class="cat-tag">' + m.cat + '</span></a>';
      }).join("");
      resultsEl.classList.add("show");
    }

    inputEl.addEventListener("input", function () { render(inputEl.value); });
    inputEl.addEventListener("focus", function () { if (inputEl.value) render(inputEl.value); });
    document.addEventListener("click", function (e) {
      if (!resultsEl.contains(e.target) && e.target !== inputEl) resultsEl.classList.remove("show");
    });
  }

  /* ---------------- Calculation engine ---------------- */
  function bmiCategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Healthy weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  }

  var UNIT_M = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 };

  function calculate(formula, v) {
    switch (formula) {

      case "bmi-universal": {
        var bmi;
        if (v.unit === "imperial") {
          bmi = (v.weight / (v.height * v.height)) * 703;
        } else {
          var hM = v.height / 100;
          bmi = v.weight / (hM * hM);
        }
        return { main: "BMI: " + bmi.toFixed(1), sub: "Category: " + bmiCategory(bmi) };
      }

      case "bmi-metric": {
        var hM2 = v.height / 100;
        var bmi2 = v.weight / (hM2 * hM2);
        return { main: "BMI: " + bmi2.toFixed(1), sub: "Category: " + bmiCategory(bmi2) };
      }

      case "bmi-athletic": {
        var hM3 = v.height / 100;
        var bmi3 = v.weight / (hM3 * hM3);
        var note = "Standard categories are unreliable for higher muscle mass — treat this as a formality, not feedback on body composition.";
        return { main: "BMI: " + bmi3.toFixed(1) + " (" + bmiCategory(bmi3) + ")", sub: note };
      }

      case "bmi-waist": {
        var hM4 = v.height / 100;
        var bmi4 = v.weight / (hM4 * hM4);
        var ratio = v.waist / v.height;
        var ratioNote = ratio < 0.5 ? "within the typically healthy range (under 0.5)" : "above the typical 0.5 guideline";
        return { main: "BMI: " + bmi4.toFixed(1), sub: "Waist-to-height ratio: " + ratio.toFixed(2) + " — " + ratioNote };
      }

      case "bmi-age-context": {
        var hM5 = v.height / 100;
        var bmi5 = v.weight / (hM5 * hM5);
        return { main: "BMI: " + bmi5.toFixed(1) + " (" + bmiCategory(bmi5) + ")", sub: "Reference only — pair this with waist circumference for a fuller picture at this age range." };
      }

      case "bmi-imperial-stones": {
        var totalLbs = (v.stones * 14) + v.pounds;
        var kg = totalLbs * 0.453592;
        var totalInches = (v.feet * 12) + v.inches;
        var cm = totalInches * 2.54;
        var hM6 = cm / 100;
        var bmi6 = kg / (hM6 * hM6);
        return { main: "BMI: " + bmi6.toFixed(1), sub: "Category: " + bmiCategory(bmi6) + " (≈" + kg.toFixed(1) + "kg, " + cm.toFixed(0) + "cm)" };
      }

      case "tip-standard": {
        var tipAmt = v.bill * (v.tipPercent / 100);
        var total = v.bill + tipAmt;
        var people = v.people > 0 ? v.people : 1;
        var per = total / people;
        return { main: "Tip: $" + tipAmt.toFixed(2), sub: "Total: $" + total.toFixed(2) + " — $" + per.toFixed(2) + " per person (" + people + ")" };
      }

      case "tip-split-round": {
        var tipAmt2 = v.bill * (v.tipPercent / 100);
        var total2 = v.bill + tipAmt2;
        var people2 = v.people > 0 ? v.people : 1;
        var raw = total2 / people2;
        var roundTo = parseFloat(v.roundUp) || 0;
        var per2 = roundTo > 0 ? Math.ceil(raw / roundTo) * roundTo : raw;
        var subExtra = roundTo > 0 ? " — rounded up from $" + raw.toFixed(2) : "";
        return { main: "$" + per2.toFixed(2) + " per person", sub: "Tip: $" + tipAmt2.toFixed(2) + " • Total: $" + total2.toFixed(2) + " split " + people2 + " ways" + subExtra };
      }

      case "tip-pretax": {
        var subtotal = v.totalBill - v.taxAmount;
        var tipAmt3 = subtotal * (v.tipPercent / 100);
        return { main: "Tip: $" + tipAmt3.toFixed(2), sub: "Based on pre-tax subtotal of $" + subtotal.toFixed(2) + " (tax of $" + v.taxAmount.toFixed(2) + " excluded)" };
      }

      case "percentage-basic": {
        var pct = (v.part / v.whole) * 100;
        return { main: pct.toFixed(2) + "%", sub: v.part + " is " + pct.toFixed(2) + "% of " + v.whole };
      }

      case "discount-percent": {
        var saved = v.price * (v.discount / 100);
        var salePrice = v.price - saved;
        return { main: "Sale price: $" + salePrice.toFixed(2), sub: "You save $" + saved.toFixed(2) + " (" + v.discount + "% off $" + v.price.toFixed(2) + ")" };
      }

      case "salary-increase": {
        var diff = v.newSalary - v.oldSalary;
        var pctInc = (diff / v.oldSalary) * 100;
        return { main: (pctInc >= 0 ? "+" : "") + pctInc.toFixed(1) + "%", sub: (diff >= 0 ? "+$" : "-$") + Math.abs(diff).toLocaleString() + " raise, from $" + v.oldSalary.toLocaleString() + " to $" + v.newSalary.toLocaleString() };
      }

      case "length-generic": {
        var meters = v.value * UNIT_M[v.fromUnit];
        var result = meters / UNIT_M[v.toUnit];
        var rounded = Math.round(result * 10000) / 10000;
        return { main: v.value + " " + v.fromUnit + " = " + rounded + " " + v.toUnit, sub: null };
      }

      case "height-cm-feet": {
        var totalIn = v.cm / 2.54;
        var feet = Math.floor(totalIn / 12);
        var inches = Math.round(totalIn - feet * 12);
        if (inches === 12) { feet += 1; inches = 0; }
        return { main: feet + "'" + inches + '"', sub: v.cm + "cm ≈ " + (v.cm / 30.48).toFixed(2) + " ft total" };
      }

      case "pace-km-mile": {
        var totalSec = (v.minutes * 60) + v.seconds;
        var factor = v.direction === "km-to-mi" ? 1.609344 : (1 / 1.609344);
        var resSec = totalSec * factor;
        var mm = Math.floor(resSec / 60);
        var ss = Math.round(resSec % 60);
        if (ss === 60) { mm += 1; ss = 0; }
        var unitOut = v.direction === "km-to-mi" ? "per mile" : "per km";
        var unitIn = v.direction === "km-to-mi" ? "km" : "mile";
        return { main: mm + ":" + pad(ss) + " " + unitOut, sub: "From " + v.minutes + ":" + pad(v.seconds) + " per " + unitIn };
      }

      case "weight-kg-lbs": {
        if (v.kg) {
          var lbs = v.kg * 2.20462;
          return { main: v.kg + " kg = " + lbs.toFixed(2) + " lbs", sub: null };
        } else if (v.lbs) {
          var kg2 = v.lbs / 2.20462;
          return { main: v.lbs + " lbs = " + kg2.toFixed(2) + " kg", sub: null };
        }
        return { main: "Enter a value in either field", sub: null };
      }

      case "time-min-hours": {
        var hours = v.minutes / 60;
        var hh = Math.floor(v.minutes / 60);
        var mm2 = Math.round(v.minutes % 60);
        return { main: hours.toFixed(2) + " hours", sub: "= " + hh + "h " + mm2 + "m" };
      }

      default:
        return { main: "—", sub: null };
    }
  }

  /* ---------------- Hook up any tool form present on the page ---------------- */
  function attachCalcForm() {
    var form = $("#tool-form");
    if (!form) return;
    var formula = form.getAttribute("data-formula");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var values = {};
      Array.prototype.slice.call(form.querySelectorAll("input, select")).forEach(function (el) {
        var id = el.id.replace(/^f-/, "");
        values[id] = el.tagName === "SELECT" ? el.value : (parseFloat(el.value) || 0);
      });
      var res = calculate(formula, values);
      $("#result-main").textContent = res.main;
      $("#result-sub").textContent = res.sub || "";
      $("#result-box").classList.add("show");
    });
  }

  window.Quiklee = {
    attachSearch: attachSearch,
    attachCalcForm: attachCalcForm
  };
})();
