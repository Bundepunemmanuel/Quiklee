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
      calculatorsData.forEach(function (e) { all.push({ slug: e.slug, title: e.title, cat: "Calculator", path: "calculators" }); });
    }
    if (typeof convertersData !== "undefined") {
      convertersData.forEach(function (e) { all.push({ slug: e.slug, title: e.title, cat: "Converter", path: "" }); });
    }
    if (typeof meaningsData !== "undefined") {
      meaningsData.forEach(function (e) { all.push({ slug: e.slug, title: e.title, cat: "Meaning", path: "" }); });
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
        var url = m.path ? "/" + m.path + "/" + m.slug : "/" + m.slug;
        return '<a href="' + url + '">' + esc(m.title) + '<span class="cat-tag">' + m.cat + '</span></a>';
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

  /* Maps a BMI value onto a 0-100% position for the visual gauge (15 -> 0%, 40 -> 100%, clamped) */
  function bmiGaugePercent(bmi) {
    var pct = ((bmi - 15) / (40 - 15)) * 100;
    return Math.max(2, Math.min(98, pct));
  }

  function bodyFatCategory(bf, gender) {
    if (gender === "male") {
      if (bf < 6) return "Essential fat";
      if (bf < 14) return "Athletes";
      if (bf < 18) return "Fitness";
      if (bf < 25) return "Average";
      return "Obese";
    }
    if (bf < 14) return "Essential fat";
    if (bf < 21) return "Athletes";
    if (bf < 25) return "Fitness";
    if (bf < 32) return "Average";
    return "Obese";
  }

  function bmiCategoryColor(bmi) {
    if (bmi < 18.5) return "#6B9BD1";
    if (bmi < 25) return "#1F8A5F";
    if (bmi < 30) return "#C77D22";
    return "#B8443A";
  }

  function bmiInterpretation(bmi) {
    if (bmi < 18.5) return "This is below the typical healthy range for your height.";
    if (bmi < 25) return "This falls within the typical healthy range for your height.";
    if (bmi < 30) return "This is above the typical healthy range for your height.";
    return "This is well above the typical healthy range for your height.";
  }

  /* Healthy weight range (18.5–24.9 BMI) for a given height, in kilograms */
  function healthyRangeKg(heightCm) {
    var hM = heightCm / 100;
    return { min: 18.5 * hM * hM, max: 24.9 * hM * hM };
  }

  /* Healthy weight range for a given height, in pounds */
  function healthyRangeLb(heightIn) {
    return { min: (18.5 * heightIn * heightIn) / 703, max: (24.9 * heightIn * heightIn) / 703 };
  }

  /* Formats a pound value as "Xst Ylb" for the stones-and-pounds page */
  function lbToStoneFormat(lb) {
    var stones = Math.floor(lb / 14);
    var remainder = Math.round(lb % 14);
    if (remainder === 14) { stones += 1; remainder = 0; }
    return stones + "st " + remainder + "lb";
  }

  var UNIT_M = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 };

  function calculate(formula, v) {
    switch (formula) {

      case "bmi-universal": {
        var bmi;
        var rangeText;
        if (v.unit === "imperial") {
          bmi = (v.weight / (v.height * v.height)) * 703;
          var r1 = healthyRangeLb(v.height);
          rangeText = "Healthy weight for this height: " + r1.min.toFixed(0) + "–" + r1.max.toFixed(0) + " lb";
        } else {
          var hM = v.height / 100;
          bmi = v.weight / (hM * hM);
          var r2 = healthyRangeKg(v.height);
          rangeText = "Healthy weight for this height: " + r2.min.toFixed(1) + "–" + r2.max.toFixed(1) + " kg";
        }
        return { main: "BMI: " + bmi.toFixed(1), category: bmiCategory(bmi), categoryColor: bmiCategoryColor(bmi), rangeText: rangeText, sub: bmiInterpretation(bmi), gaugeValue: bmiGaugePercent(bmi) };
      }

      case "bmi-metric": {
        var hM2 = v.height / 100;
        var bmi2 = v.weight / (hM2 * hM2);
        var r3 = healthyRangeKg(v.height);
        return { main: "BMI: " + bmi2.toFixed(1), category: bmiCategory(bmi2), categoryColor: bmiCategoryColor(bmi2), rangeText: "Healthy weight for this height: " + r3.min.toFixed(1) + "–" + r3.max.toFixed(1) + " kg", sub: bmiInterpretation(bmi2), gaugeValue: bmiGaugePercent(bmi2) };
      }

      case "bmi-athletic": {
        var hM3 = v.height / 100;
        var bmi3 = v.weight / (hM3 * hM3);
        var r4 = healthyRangeKg(v.height);
        var note = "Standard categories are unreliable for higher muscle mass — treat this as a formality, not feedback on body composition.";
        return { main: "BMI: " + bmi3.toFixed(1), category: bmiCategory(bmi3), categoryColor: bmiCategoryColor(bmi3), rangeText: "Standard healthy range for this height: " + r4.min.toFixed(1) + "–" + r4.max.toFixed(1) + " kg", sub: note, gaugeValue: bmiGaugePercent(bmi3) };
      }

      case "bmi-waist": {
        var hM4 = v.height / 100;
        var bmi4 = v.weight / (hM4 * hM4);
        var ratio = v.waist / v.height;
        var ratioNote = ratio < 0.5 ? "within the typically healthy range (under 0.5)" : "above the typical 0.5 guideline";
        var r5 = healthyRangeKg(v.height);
        return { main: "BMI: " + bmi4.toFixed(1), category: bmiCategory(bmi4), categoryColor: bmiCategoryColor(bmi4), rangeText: "Healthy weight for this height: " + r5.min.toFixed(1) + "–" + r5.max.toFixed(1) + " kg", sub: "Waist-to-height ratio: " + ratio.toFixed(2) + " — " + ratioNote, gaugeValue: bmiGaugePercent(bmi4) };
      }

      case "bmi-age-context": {
        var hM5 = v.height / 100;
        var bmi5 = v.weight / (hM5 * hM5);
        var r6 = healthyRangeKg(v.height);
        return { main: "BMI: " + bmi5.toFixed(1), category: bmiCategory(bmi5), categoryColor: bmiCategoryColor(bmi5), rangeText: "Healthy weight for this height: " + r6.min.toFixed(1) + "–" + r6.max.toFixed(1) + " kg", sub: "Reference only — pair this with waist circumference for a fuller picture at this age range.", gaugeValue: bmiGaugePercent(bmi5) };
      }

      case "bmi-imperial-stones": {
        var totalLbs = (v.stones * 14) + v.pounds;
        var kg = totalLbs * 0.453592;
        var totalInches = (v.feet * 12) + v.inches;
        var cm = totalInches * 2.54;
        var hM6 = cm / 100;
        var bmi6 = kg / (hM6 * hM6);
        var r7 = healthyRangeLb(totalInches);
        var rangeStoneText = "Healthy weight for this height: " + lbToStoneFormat(r7.min) + " – " + lbToStoneFormat(r7.max);
        return { main: "BMI: " + bmi6.toFixed(1), category: bmiCategory(bmi6), categoryColor: bmiCategoryColor(bmi6), rangeText: rangeStoneText, sub: bmiInterpretation(bmi6), gaugeValue: bmiGaugePercent(bmi6) };
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

      case "ideal-weight": {
        // Devine formula, height entered in cm, converted to inches internally
        var totalInches = v.height / 2.54;
        var overSixty = Math.max(0, totalInches - 60);
        var idealKg = v.gender === "male"
          ? 50 + 2.3 * overSixty
          : 45.5 + 2.3 * overSixty;
        var idealLbs = idealKg * 2.20462;
        return { main: idealKg.toFixed(1) + " kg (" + idealLbs.toFixed(1) + " lb)", sub: "Devine formula estimate for " + v.height + "cm — a range, not a target to hit exactly" };
      }

      case "body-fat-navy": {
        // US Navy method (imperial inches, log10-based)
        var bf;
        if (v.gender === "male") {
          bf = 495 / (1.0324 - 0.19077 * Math.log10(v.waist - v.neck) + 0.15456 * Math.log10(v.height)) - 450;
        } else {
          bf = 495 / (1.29579 - 0.35004 * Math.log10(v.waist + v.hip - v.neck) + 0.22100 * Math.log10(v.height)) - 450;
        }
        if (!isFinite(bf) || bf < 0) return { main: "Check your measurements", sub: "Waist must be larger than neck for this formula to work." };
        return { main: bf.toFixed(1) + "% body fat", sub: "Category: " + bodyFatCategory(bf, v.gender) + " — US Navy method, accurate to roughly ±3-4% versus a DEXA scan" };
      }

      case "lean-body-mass": {
        // Boer formula, metric
        var lbm = v.gender === "male"
          ? 0.407 * v.weight + 0.267 * v.height - 19.2
          : 0.252 * v.weight + 0.473 * v.height - 48.3;
        var fatMass = v.weight - lbm;
        var proteinLow = Math.round(lbm * 1.2);
        var proteinHigh = Math.round(lbm * 2.4);
        return { main: lbm.toFixed(1) + " kg lean mass", sub: "≈ " + fatMass.toFixed(1) + " kg fat mass. Suggested protein range: " + proteinLow + "–" + proteinHigh + "g/day (1.2–2.4g per kg lean mass, depending on goal)" };
      }

      case "percentage-increase": {
        var incAmt = v.newValue - v.oldValue;
        var incPct = (incAmt / v.oldValue) * 100;
        return { main: "+" + incPct.toFixed(2) + "%", sub: v.oldValue + " → " + v.newValue + " is an increase of " + incAmt.toFixed(2) };
      }

      case "percentage-decrease": {
        var decAmt = v.oldValue - v.newValue;
        var decPct = (decAmt / v.oldValue) * 100;
        return { main: "-" + decPct.toFixed(2) + "%", sub: v.oldValue + " → " + v.newValue + " is a decrease of " + decAmt.toFixed(2) };
      }

      case "percentage-change": {
        var chgAmt = v.newValue - v.oldValue;
        var chgPct = (chgAmt / v.oldValue) * 100;
        var direction = chgPct >= 0 ? "increase" : "decrease";
        return { main: (chgPct >= 0 ? "+" : "") + chgPct.toFixed(2) + "%", sub: v.oldValue + " → " + v.newValue + " is a " + Math.abs(chgPct).toFixed(2) + "% " + direction };
      }

      case "percentage-difference": {
        var diffAmt = Math.abs(v.valueA - v.valueB);
        var avg = (v.valueA + v.valueB) / 2;
        var diffPct = (diffAmt / avg) * 100;
        return { main: diffPct.toFixed(2) + "%", sub: "Symmetric difference between " + v.valueA + " and " + v.valueB + " (not directional, unlike percentage change)" };
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

      var categoryEl = $("#result-category");
      if (categoryEl) {
        if (res.category) {
          categoryEl.textContent = res.category;
          categoryEl.style.color = res.categoryColor || "";
        } else {
          categoryEl.textContent = "";
        }
      }
      var rangeEl = $("#result-range");
      if (rangeEl) { rangeEl.textContent = res.rangeText || ""; }

      if (res.gaugeValue !== undefined) {
        var gaugeWrap = $("#gauge-wrap");
        var marker = $("#gauge-marker");
        if (gaugeWrap && marker) {
          gaugeWrap.style.display = "block";
          marker.style.left = res.gaugeValue + "%";
        }
      }
    });
  }

  window.Quiklee = {
    attachSearch: attachSearch,
    attachCalcForm: attachCalcForm
  };
})();
