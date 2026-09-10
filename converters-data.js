/* Quiklee — converters data */
const convertersData = [
  {
    slug: "length-converter",
    cluster: "length",
    clusterLabel: "Length Converters",
    title: "Length Converter",
    metaDescription: "Convert between millimetres, centimetres, metres, kilometres, inches, feet, yards, and miles instantly.",
    h1: "Length Converter",
    intro: "General-purpose length converter — pick any two units from millimetres to miles.",
    type: "form",
    formula: "length-generic",
    fields: [
      { id: "value", label: "Value", type: "number", placeholder: "10" },
      { id: "fromUnit", label: "From", type: "select", options: [
        { value: "mm", label: "Millimetres (mm)" }, { value: "cm", label: "Centimetres (cm)" },
        { value: "m", label: "Metres (m)" }, { value: "km", label: "Kilometres (km)" },
        { value: "in", label: "Inches (in)" }, { value: "ft", label: "Feet (ft)" },
        { value: "yd", label: "Yards (yd)" }, { value: "mi", label: "Miles (mi)" }
      ]},
      { id: "toUnit", label: "To", type: "select", options: [
        { value: "mm", label: "Millimetres (mm)" }, { value: "cm", label: "Centimetres (cm)" },
        { value: "m", label: "Metres (m)" }, { value: "km", label: "Kilometres (km)" },
        { value: "in", label: "Inches (in)" }, { value: "ft", label: "Feet (ft)" },
        { value: "yd", label: "Yards (yd)" }, { value: "mi", label: "Miles (mi)" }
      ]}
    ],
    explainer: [
      "All conversions route through metres internally, so any unit can convert to any other directly — mm to miles works just as well as cm to inches.",
      "For two common specific cases — converting height, or converting a running pace — the dedicated tools below are faster than picking units manually."
    ],
    caveat: null,
    related: ["cm-to-feet-height-converter", "km-to-miles-running-pace-converter", "kg-to-lbs-converter"]
  },
  {
    slug: "cm-to-feet-height-converter",
    cluster: "length",
    clusterLabel: "Length Converters",
    title: "cm to Feet — Height Converter",
    metaDescription: "Convert height from centimetres to feet and inches, formatted the way height is usually written.",
    h1: "cm to Feet — Height Converter",
    intro: "Built specifically for converting a person's height — enter centimetres, get feet and inches formatted the normal way (like 5'9\"), not a decimal.",
    type: "form",
    formula: "height-cm-feet",
    fields: [
      { id: "cm", label: "Height (cm)", type: "number", placeholder: "175" }
    ],
    explainer: [
      "A generic length converter would give you 175cm = 5.74 feet — technically correct, but nobody says their height that way. This tool converts to feet and inches and formats it as 5'9\", rounding to the nearest whole inch.",
      "This comes up constantly for filling out forms, profiles, or just converting a doctor's measurement to something you can picture."
    ],
    caveat: null,
    related: ["length-converter", "kg-to-lbs-converter"]
  },
  {
    slug: "km-to-miles-running-pace-converter",
    cluster: "length",
    clusterLabel: "Length Converters",
    title: "Running Pace Converter — km to Miles",
    metaDescription: "Convert running pace between minutes-per-kilometre and minutes-per-mile.",
    h1: "Running Pace Converter — km to Miles",
    intro: "This converts pace, not distance — enter your minutes-and-seconds per kilometre, get the equivalent pace per mile (or the reverse).",
    type: "form",
    formula: "pace-km-mile",
    fields: [
      { id: "direction", label: "Convert", type: "select", options: [
        { value: "km-to-mi", label: "Per km → per mile" },
        { value: "mi-to-km", label: "Per mile → per km" }
      ]},
      { id: "minutes", label: "Minutes", type: "number", placeholder: "5" },
      { id: "seconds", label: "Seconds", type: "number", placeholder: "30" }
    ],
    explainer: [
      "A straight distance converter (1 mile = 1.609km) doesn't directly give you pace, because pace is inverted — a runner doing 5:00/km isn't doing 5:00 × 1.609 per mile, they're doing roughly 8:03/mile. This tool does the inversion correctly.",
      "Useful when switching between a treadmill set in miles and a GPS watch or race displaying splits in kilometres, or vice versa."
    ],
    caveat: null,
    related: ["length-converter", "cm-to-feet-height-converter"]
  },
  {
    slug: "kg-to-lbs-converter",
    cluster: "weight",
    clusterLabel: "Weight Converters",
    title: "kg to lbs Converter",
    metaDescription: "Convert weight between kilograms and pounds instantly, in either direction.",
    h1: "kg to lbs Converter",
    intro: "Enter a value in either field — it converts both directions automatically.",
    type: "form",
    formula: "weight-kg-lbs",
    fields: [
      { id: "kg", label: "Kilograms", type: "number", placeholder: "70" },
      { id: "lbs", label: "Pounds", type: "number", placeholder: "" }
    ],
    explainer: [
      "1kg = 2.20462lbs. Fill in either box and hit convert — you don't need to know which direction you're converting before you start typing."
    ],
    caveat: null,
    related: ["length-converter", "cm-to-feet-height-converter", "bmi-calculator-kg-cm"]
  },
  {
    slug: "minutes-to-hours-converter",
    cluster: "time",
    clusterLabel: "Time Converters",
    title: "Minutes to Hours Converter",
    metaDescription: "Convert minutes to hours, shown both as decimal hours and as hours-and-minutes.",
    h1: "Minutes to Hours Converter",
    intro: "Enter a number of minutes to get both the decimal hours (for timesheets and spreadsheets) and the hours-and-minutes format (for reading).",
    type: "form",
    formula: "time-min-hours",
    fields: [
      { id: "minutes", label: "Minutes", type: "number", placeholder: "150" }
    ],
    explainer: [
      "150 minutes is both '2.5 hours' (decimal — what payroll and spreadsheets want) and '2 hours 30 minutes' (what a person actually says out loud). This tool gives you both at once so you don't have to pick which format you need in advance."
    ],
    caveat: null,
    related: ["length-converter", "kg-to-lbs-converter"]
  }
];

if (typeof module !== "undefined") { module.exports = convertersData; }
