/* Quiklee — calculators data
   Each entry powers one real URL, routed to calculator.html by vercel.json.
   type: 'form' (interactive tool) or 'info' (reference content, still real & useful)
*/
const calculatorsData = [

  /* ================= BMI CLUSTER ================= */
  {
    slug: "bmi-calculator",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator",
    metaDescription: "Calculate your Body Mass Index instantly using metric or imperial units, with an explanation of what your result means.",
    h1: "BMI Calculator",
    intro: "Enter your height and weight to get your BMI instantly. Switch units below — this version works with either metric or imperial.",
    type: "form",
    formula: "bmi-universal",
    fields: [
      { id: "unit", label: "Units", type: "select", options: [
        { value: "metric", label: "Metric (kg, cm)" },
        { value: "imperial", label: "Imperial (lb, in)" }
      ]},
      { id: "weight", label: "Weight", type: "number", placeholder: "70" },
      { id: "height", label: "Height", type: "number", placeholder: "175" }
    ],
    explainer: [
      "BMI divides your weight by the square of your height. It's a quick screening number, not a diagnosis — it doesn't know how much of your weight is muscle versus fat, and it treats a bodybuilder and a sedentary person of the same height and weight identically.",
      "If your result looks off for your body type, the bodybuilder, athlete, or waist-circumference versions below account for that."
    ],
    caveat: "BMI was designed as a population-level statistic in the 1830s, not an individual diagnostic tool. Use it as one data point, not the whole picture.",
    related: ["bmi-calculator-kg-cm", "bmi-calculator-for-athletes", "bmi-calculator-waist-circumference", "bmi-calculator-stones-pounds", "how-to-calculate-bmi-manually"]
  },
  {
    slug: "bmi-calculator-kg-cm",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator (kg and cm)",
    metaDescription: "A streamlined BMI calculator that only uses kilograms and centimetres — no unit switching needed.",
    h1: "BMI Calculator — kg and cm",
    intro: "No dropdown, no unit toggle — just weight in kilograms and height in centimetres, the way most of the world measures both.",
    type: "form",
    formula: "bmi-metric",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "70" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "175" }
    ],
    explainer: [
      "This is the plain metric version: kilograms and centimetres in, BMI out. Formula is weight (kg) ÷ height (m)², where height in cm is converted to metres automatically.",
      "If you're used to stones and pounds instead, use the imperial version linked below rather than converting by hand."
    ],
    caveat: null,
    related: ["bmi-calculator", "bmi-calculator-stones-pounds", "healthy-bmi-range-by-age"]
  },
  {
    slug: "bmi-calculator-for-bodybuilders",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator for Bodybuilders",
    metaDescription: "BMI calculator for bodybuilders and heavily muscled lifters, with an explanation of why standard BMI overstates fatness for high muscle mass.",
    h1: "BMI Calculator for Bodybuilders",
    intro: "Muscle is denser than fat, so BMI — which only knows total weight — routinely flags lean, muscular lifters as 'overweight' or 'obese'. This version calculates the same number but tells you what it actually means for a bodybuilder's physique.",
    type: "form",
    formula: "bmi-athletic",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "95" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "178" },
      { id: "physique", label: "Training background", type: "select", options: [
        { value: "competitive", label: "Competitive bodybuilder / physique athlete" },
        { value: "serious", label: "Serious lifter, several years of training" },
        { value: "recreational", label: "Recreational lifting" }
      ]}
    ],
    explainer: [
      "A male bodybuilder at 178cm and 95kg with 8% body fat will score 'obese' on the standard BMI scale — despite being leaner than almost anyone in the general population. That's the well-documented failure mode of applying a population-average formula to an outlier physique.",
      "For competitive and serious lifters, a body-fat percentage measurement (calipers, DEXA, or even a decent visual estimate) tells you far more than BMI ever will. Treat the number below as a formality, not feedback."
    ],
    caveat: "If your BMI reads 'overweight' or 'obese' but you can see visible muscle separation and low body fat, trust the mirror and a body-fat estimate over this number.",
    related: ["bmi-calculator-for-athletes", "bmi-calculator-waist-circumference", "bmi-calculator"]
  },
  {
    slug: "bmi-calculator-for-athletes",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator for Athletes",
    metaDescription: "BMI calculator built for athletes, with context on why muscle mass and training type skew standard BMI results.",
    h1: "BMI Calculator for Athletes",
    intro: "Rugby players, sprinters, rowers, and powerlifters all tend to run 'high' on standard BMI charts for the same reason bodybuilders do — more muscle per centimetre of height than the population BMI was calibrated on.",
    type: "form",
    formula: "bmi-athletic",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "82" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "180" },
      { id: "physique", label: "Sport type", type: "select", options: [
        { value: "power", label: "Power / strength sport (rugby, powerlifting, throwing)" },
        { value: "endurance", label: "Endurance sport (running, cycling, swimming)" },
        { value: "mixed", label: "Mixed / team sport" }
      ]}
    ],
    explainer: [
      "Power and strength athletes see the biggest gap between BMI and reality, since added muscle mass raises weight without adding fat. Endurance athletes tend to track closer to standard BMI ranges, since they typically carry less added muscle mass.",
      "Sports scientists generally use skinfold measurements, bioelectrical impedance, or DEXA scans instead of BMI when tracking athlete body composition — BMI is used for population screening, not athlete monitoring."
    ],
    caveat: null,
    related: ["bmi-calculator-for-bodybuilders", "bmi-calculator-waist-circumference", "bmi-calculator"]
  },
  {
    slug: "bmi-calculator-waist-circumference",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator with Waist Circumference",
    metaDescription: "Calculates BMI alongside waist-to-height ratio, a stronger indicator of health risk than BMI alone.",
    h1: "BMI Calculator with Waist Circumference",
    intro: "BMI alone can't tell where your weight is carried. Adding waist circumference gives you a waist-to-height ratio too — a measurement several studies rate as a better predictor of cardiovascular risk than BMI by itself.",
    type: "form",
    formula: "bmi-waist",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "78" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "172" },
      { id: "waist", label: "Waist circumference (cm)", type: "number", placeholder: "88" }
    ],
    explainer: [
      "Waist-to-height ratio is calculated as waist ÷ height. A ratio under 0.5 is generally considered a healthy range for most adults, regardless of overall BMI category — this is why two people with the same BMI can have very different health risk profiles.",
      "Measure your waist at the narrowest point, usually just above the belly button, without pulling the tape measure tight."
    ],
    caveat: "Waist-to-height ratio is a screening guide, not a diagnosis — it doesn't account for pregnancy, certain medical conditions, or body shapes where fat is carried elsewhere.",
    related: ["bmi-calculator-for-athletes", "bmi-calculator-for-bodybuilders", "bmi-calculator"]
  },
  {
    slug: "bmi-calculator-women-over-40",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator for Women Over 40",
    metaDescription: "BMI calculator for women over 40, with context on how hormonal changes and muscle loss affect the standard BMI scale.",
    h1: "BMI Calculator for Women Over 40",
    intro: "After 40, body composition shifts even if weight on the scale doesn't — muscle mass declines gradually and fat distribution tends to shift toward the abdomen, especially around perimenopause and menopause. The BMI formula itself doesn't change, but what a given number means for health risk can.",
    type: "form",
    formula: "bmi-age-context",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "68" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "165" },
      { id: "ageBand", label: "Age range", type: "select", options: [
        { value: "40s", label: "40–49" },
        { value: "50s", label: "50–59" },
        { value: "60plus", label: "60+" }
      ]}
    ],
    explainer: [
      "Some research suggests slightly higher BMI ranges may carry less added risk for women over 65 compared to younger adults, while the standard 18.5–24.9 'normal' band was calibrated mostly on younger populations.",
      "Tracking waist circumference alongside BMI becomes more informative after 40, since abdominal fat redistribution is common during this stage regardless of total weight change."
    ],
    caveat: "This tool gives context, not medical advice — if you're navigating perimenopause-related weight changes, a doctor or registered dietitian can give guidance specific to your situation.",
    related: ["bmi-calculator-waist-circumference", "bmi-calculator-men-over-50", "healthy-bmi-range-by-age"]
  },
  {
    slug: "bmi-calculator-men-over-50",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator for Men Over 50",
    metaDescription: "BMI calculator for men over 50, with context on age-related muscle loss and how it affects standard BMI interpretation.",
    h1: "BMI Calculator for Men Over 50",
    intro: "Men typically start losing muscle mass (sarcopenia) gradually from their 30s onward, accelerating after 50. Two men with an identical BMI at 30 and 55 can have very different muscle-to-fat ratios, even at the same number.",
    type: "form",
    formula: "bmi-age-context",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "85" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "178" },
      { id: "ageBand", label: "Age range", type: "select", options: [
        { value: "50s", label: "50–59" },
        { value: "60s", label: "60–69" },
        { value: "70plus", label: "70+" }
      ]}
    ],
    explainer: [
      "A stable BMI over decades can mask a real shift underneath — muscle replaced by fat at roughly the same weight, sometimes called 'normal weight obesity.' This is part of why strength training is recommended alongside weight management for men over 50, not just calorie tracking.",
      "Grip strength and waist circumference are two simple measures doctors increasingly pair with BMI for this age group, since neither is fooled by a stable number on the scale."
    ],
    caveat: "This tool gives context, not medical advice — for guidance specific to your health history, talk to a doctor.",
    related: ["bmi-calculator-waist-circumference", "bmi-calculator-women-over-40", "healthy-bmi-range-by-age"]
  },
  {
    slug: "bmi-calculator-stones-pounds",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "BMI Calculator in Stones and Pounds",
    metaDescription: "UK-style BMI calculator using stones and pounds for weight, with height in feet and inches.",
    h1: "BMI Calculator — Stones and Pounds",
    intro: "Built for stones and pounds rather than kilograms — the way weight is still commonly given in the UK and Ireland. Height goes in as feet and inches.",
    type: "form",
    formula: "bmi-imperial-stones",
    fields: [
      { id: "stones", label: "Weight — stones", type: "number", placeholder: "11" },
      { id: "pounds", label: "Weight — pounds", type: "number", placeholder: "4" },
      { id: "feet", label: "Height — feet", type: "number", placeholder: "5" },
      { id: "inches", label: "Height — inches", type: "number", placeholder: "9" }
    ],
    explainer: [
      "11 stone 4 lb converts to 71.7kg; 5'9\" converts to 175cm — the calculator handles both conversions internally so you can enter weight and height exactly as you'd say them out loud.",
      "If you'd rather work in kilograms and centimetres directly, the metric version is linked below."
    ],
    caveat: null,
    related: ["bmi-calculator-kg-cm", "bmi-calculator", "how-to-calculate-bmi-manually"]
  },
  {
    slug: "how-to-calculate-bmi-manually",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "How to Calculate BMI Manually",
    metaDescription: "Step-by-step guide to calculating BMI by hand, with the formula and a worked example.",
    h1: "How to Calculate BMI Manually",
    intro: "The full formula, in both metric and imperial, with a worked example for each — useful if you're doing this on paper, checking homework, or just curious what the calculator above is actually doing.",
    type: "info",
    content: [
      { type: "h2", text: "Metric formula" },
      { type: "p", text: "BMI = weight in kilograms ÷ (height in metres × height in metres)" },
      { type: "steps", items: [
        "Convert height from centimetres to metres by dividing by 100. Example: 175cm ÷ 100 = 1.75m.",
        "Square the height in metres. Example: 1.75 × 1.75 = 3.0625.",
        "Divide weight in kilograms by that number. Example: 70kg ÷ 3.0625 = 22.86.",
        "That result, 22.86, is the BMI."
      ]},
      { type: "h2", text: "Imperial formula" },
      { type: "p", text: "BMI = (weight in pounds ÷ (height in inches × height in inches)) × 703" },
      { type: "steps", items: [
        "Convert height fully to inches. Example: 5'9\" = 69 inches.",
        "Square the height in inches. Example: 69 × 69 = 4,761.",
        "Divide weight in pounds by that number, then multiply by 703. Example: (154 ÷ 4,761) × 703 ≈ 22.74.",
        "That result is the BMI — the 703 constant exists purely to make the imperial formula land on the same scale as the metric one."
      ]},
      { type: "p", text: "The 703 multiplier trips people up most often — it's not arbitrary, it's the unit conversion factor (1kg/m² = 703 lb/in²) baked into the formula so you don't have to convert to metric first." }
    ],
    caveat: null,
    related: ["bmi-calculator", "bmi-calculator-kg-cm", "healthy-bmi-range-by-age"]
  },
  {
    slug: "healthy-bmi-range-by-age",
    cluster: "bmi",
    clusterLabel: "BMI Calculators",
    title: "Healthy BMI Range by Age",
    metaDescription: "Reference table of standard BMI categories, plus how interpretation shifts across age groups.",
    h1: "Healthy BMI Range by Age",
    intro: "The standard BMI categories don't officially change by age for adults — but how much weight clinicians give the number does. Here's the standard scale, and the caveats that come with it at different life stages.",
    type: "info",
    content: [
      { type: "h2", text: "Standard adult BMI categories (18–64)" },
      { type: "table", headers: ["BMI range", "Category"], rows: [
        ["Below 18.5", "Underweight"],
        ["18.5 – 24.9", "Healthy weight"],
        ["25.0 – 29.9", "Overweight"],
        ["30.0 and above", "Obese"]
      ]},
      { type: "h2", text: "How interpretation shifts with age" },
      { type: "table", headers: ["Age group", "Note"], rows: [
        ["Children & teens", "Uses percentile charts by age and sex, not the flat adult scale — a paediatric growth chart, not this calculator, is the right tool."],
        ["18–64", "Standard categories above apply most directly."],
        ["65+", "Some research associates slightly higher BMI (up to ~27) with no added mortality risk in this group, versus younger adults."]
      ]},
      { type: "p", text: "None of these ranges account for muscle mass, pregnancy, or certain medical conditions — see the athlete, bodybuilder, or waist-circumference calculators for those situations." }
    ],
    caveat: null,
    related: ["bmi-calculator-women-over-40", "bmi-calculator-men-over-50", "bmi-calculator"]
  },

  /* ================= TIP CLUSTER ================= */
  {
    slug: "tip-calculator",
    cluster: "tip",
    clusterLabel: "Tip Calculators",
    title: "Tip Calculator",
    metaDescription: "Calculate the tip and total bill instantly, split evenly across any number of people.",
    h1: "Tip Calculator",
    intro: "Enter the bill, pick a tip percentage, and split across the table if you're not paying alone.",
    type: "form",
    formula: "tip-standard",
    fields: [
      { id: "bill", label: "Bill amount", type: "number", placeholder: "84.50" },
      { id: "tipPercent", label: "Tip percentage", type: "number", placeholder: "18" },
      { id: "people", label: "Number of people", type: "number", placeholder: "1" }
    ],
    explainer: [
      "Tip is calculated as bill × (tip percent ÷ 100). If you're splitting the table, the total (bill + tip) is then divided evenly by the number of people.",
      "18–20% is the typical range for good sit-down service in the US; 10-15% is more standard in the UK and much of Europe, where service is often already included."
    ],
    caveat: null,
    related: ["tip-calculator-split-bill", "tip-calculator-no-tax", "discount-percentage-calculator"]
  },
  /* NOTE: discount-percentage-calculator is defined below in the PERCENTAGE / MONEY CLUSTER */
  {
    slug: "tip-calculator-split-bill",
    cluster: "tip",
    clusterLabel: "Tip Calculators",
    title: "Tip Calculator — Split the Bill",
    metaDescription: "Split a restaurant bill and tip evenly across a group, with an option to round each person's share up.",
    h1: "Tip Calculator — Split the Bill",
    intro: "Built specifically for group dinners — enter the bill and group size, and optionally round each person's share up to a clean number, so nobody's hunting for exact change.",
    type: "form",
    formula: "tip-split-round",
    fields: [
      { id: "bill", label: "Total bill", type: "number", placeholder: "212.00" },
      { id: "tipPercent", label: "Tip percentage", type: "number", placeholder: "20" },
      { id: "people", label: "Number of people", type: "number", placeholder: "5" },
      { id: "roundUp", label: "Round each share up to nearest", type: "select", options: [
        { value: "0", label: "No rounding — exact split" },
        { value: "1", label: "Nearest $1" },
        { value: "5", label: "Nearest $5" }
      ]}
    ],
    explainer: [
      "Rounding each person's share up (rather than down) means the group slightly overpays the tip — which most servers won't mind, and it saves the group from awkward exact-change math at the table.",
      "For an uneven split where people ordered very different amounts, this tool assumes an even split — for itemized splitting, each person's actual order needs to be tallied separately."
    ],
    caveat: null,
    related: ["tip-calculator", "tip-calculator-no-tax"]
  },
  {
    slug: "tip-calculator-no-tax",
    cluster: "tip",
    clusterLabel: "Tip Calculators",
    title: "Tip Calculator — Tip Before Tax",
    metaDescription: "Calculates tip based on the pre-tax subtotal instead of the total including sales tax.",
    h1: "Tip Calculator — Tip Before Tax",
    intro: "Etiquette guides generally recommend tipping on the subtotal before sales tax, not the tax-inclusive total. This version asks for both figures and calculates the tip on the pre-tax amount only.",
    type: "form",
    formula: "tip-pretax",
    fields: [
      { id: "totalBill", label: "Total on receipt (incl. tax)", type: "number", placeholder: "92.40" },
      { id: "taxAmount", label: "Sales tax amount", type: "number", placeholder: "7.40" },
      { id: "tipPercent", label: "Tip percentage", type: "number", placeholder: "20" }
    ],
    explainer: [
      "The receipt's tax line is usually printed separately from the subtotal — enter that tax figure here and the tool subtracts it before applying your tip percentage.",
      "The difference is usually small (a percent or two of the tip amount) but it's the technically correct way to calculate a tip, since the server didn't provide the tax."
    ],
    caveat: null,
    related: ["tip-calculator", "tip-calculator-split-bill"]
  },

  /* ================= PERCENTAGE / MONEY CLUSTER ================= */
  {
    slug: "percentage-calculator",
    cluster: "percentage",
    clusterLabel: "Percentage Calculators",
    title: "Percentage Calculator",
    metaDescription: "Find what percentage one number is of another, or find a percentage of a number, instantly.",
    h1: "Percentage Calculator",
    intro: "General-purpose percentage calculator — enter the part and the whole to find what percentage one is of the other.",
    type: "form",
    formula: "percentage-basic",
    fields: [
      { id: "part", label: "Part", type: "number", placeholder: "45" },
      { id: "whole", label: "Whole", type: "number", placeholder: "180" }
    ],
    explainer: [
      "Percentage is calculated as (part ÷ whole) × 100. Entering 45 and 180 tells you 45 is 25% of 180.",
      "For a sale price specifically, or a raise on a salary, the dedicated calculators below skip the mental math of figuring out which number is the 'part' and which is the 'whole'."
    ],
    caveat: null,
    related: ["discount-percentage-calculator", "salary-increase-percentage-calculator"]
  },
  {
    slug: "discount-percentage-calculator",
    cluster: "percentage",
    clusterLabel: "Percentage Calculators",
    title: "Discount Percentage Calculator",
    metaDescription: "Calculate the sale price and amount saved from an original price and a discount percentage.",
    h1: "Discount Percentage Calculator",
    intro: "Enter the original price and the discount percentage to get both the amount you save and the final price you'll actually pay.",
    type: "form",
    formula: "discount-percent",
    fields: [
      { id: "price", label: "Original price", type: "number", placeholder: "89.99" },
      { id: "discount", label: "Discount (%)", type: "number", placeholder: "30" }
    ],
    explainer: [
      "Amount saved is price × (discount ÷ 100); the sale price is what's left after subtracting that from the original price. A 30% discount on $89.99 saves $27.00, landing at $62.99.",
      "For stacked discounts (like an extra 20% off an already-reduced price), run the sale price back through this calculator a second time — stacked percentages don't add together directly."
    ],
    caveat: null,
    related: ["percentage-calculator", "salary-increase-percentage-calculator", "tip-calculator"]
  },
  {
    slug: "salary-increase-percentage-calculator",
    cluster: "percentage",
    clusterLabel: "Percentage Calculators",
    title: "Salary Increase Percentage Calculator",
    metaDescription: "Calculate the percentage increase between an old salary and a new salary, or a raise amount.",
    h1: "Salary Increase Percentage Calculator",
    intro: "Enter your old and new salary to see the raise as both a dollar amount and a percentage — useful for comparing offers or checking a stated raise is what it claims to be.",
    type: "form",
    formula: "salary-increase",
    fields: [
      { id: "oldSalary", label: "Old salary", type: "number", placeholder: "62000" },
      { id: "newSalary", label: "New salary", type: "number", placeholder: "68000" }
    ],
    explainer: [
      "Percentage increase is (new − old) ÷ old × 100. Going from $62,000 to $68,000 is a $6,000 raise, or about 9.7% — not a round number, which is exactly why it's worth checking rather than estimating.",
      "If an offer states the percentage but not the dollar amount (or vice versa), this works in reverse too — the result shows both regardless of which numbers you start with."
    ],
    caveat: null,
    related: ["percentage-calculator", "discount-percentage-calculator"]
  }
];

if (typeof module !== "undefined") { module.exports = calculatorsData; }
