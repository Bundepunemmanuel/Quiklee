/* Quiklee — converters data
   Each entry generates one real static file at /converters/[slug].html
   Same fields as calculators: hook, titleHook, depthBlocks, faq, explainer with [[slug|text]] links.
*/
const convertersData = [
  {
    slug: "length-converter",
    cluster: "length",
    clusterLabel: "Length Converters",
    title: "Length Converter",
    titleHook: "Any Unit, Instant Convert",
    metaDescription: "Convert between millimetres, centimetres, metres, kilometres, inches, feet, yards, and miles instantly.",
    h1: "Length Converter",
    hook: "10 miles converts to 16.09 km — any length unit converts to any other, instantly.",
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
      "For two common specific cases — converting [[cm-to-feet-height-converter|height]], or converting a [[km-to-miles-running-pace-converter|running pace]] — the dedicated tools below are faster than picking units manually, since they format the result the way people actually say it rather than a plain decimal."
    ],
    caveat: null,
    depthBlocks: [
      { type: "h2", text: "Common conversion factors" },
      { type: "table", headers: ["Unit", "Equals"], rows: [
        ["1 inch", "2.54 cm"],
        ["1 foot", "0.3048 m"],
        ["1 yard", "0.9144 m"],
        ["1 mile", "1.60934 km"],
        ["1 metre", "3.28084 ft"]
      ]},
      { type: "p", text: "Miles and kilometres are the two units people convert most — worth memorizing the rough shortcut: multiply km by 0.62 to estimate miles, or miles by 1.6 to estimate km." }
    ],
    faq: [
      { q: "How do I convert miles to km?", a: "Multiply miles by 1.60934. 10 miles × 1.60934 = 16.09 km." },
      { q: "What is 1 inch in cm?", a: "1 inch equals exactly 2.54 centimetres — this is the defined conversion factor, not a rounded approximation." },
      { q: "Why are there so many length units?", a: "Metric (mm/cm/m/km) and imperial (in/ft/yd/mi) developed from different historical measurement systems — most of the world uses metric today, with the US a notable exception still using imperial for everyday length." }
    ],
    related: ["cm-to-feet-height-converter", "km-to-miles-running-pace-converter", "kg-to-lbs-converter"]
  },
  {
    slug: "cm-to-feet-height-converter",
    cluster: "length",
    clusterLabel: "Length Converters",
    title: "cm to Feet — Height Converter",
    titleHook: "Height, Not Just Decimals",
    metaDescription: "Convert height from centimetres to feet and inches, formatted the way height is usually written.",
    h1: "cm to Feet — Height Converter",
    hook: "175cm converts to 5'9\" — the way height is actually said out loud, not a decimal.",
    intro: "Built specifically for converting a person's height — enter centimetres, get feet and inches formatted the normal way (like 5'9\"), not a decimal.",
    type: "form",
    formula: "height-cm-feet",
    fields: [
      { id: "cm", label: "Height (cm)", type: "number", placeholder: "175" }
    ],
    explainer: [
      "A generic length converter would give you 175cm = 5.74 feet — technically correct, but nobody says their height that way. This tool converts to feet and inches and formats it as 5'9\", rounding to the nearest whole inch.",
      "This comes up constantly for filling out forms, profiles, or just converting a doctor's measurement to something you can picture. For BMI purposes specifically, the [[bmi-calculator-stones-pounds|stones-and-pounds BMI calculator]] handles this same height format natively, so you don't need to convert first."
    ],
    caveat: null,
    depthBlocks: [
      { type: "h2", text: "Common heights, converted" },
      { type: "table", headers: ["cm", "Feet & inches"], rows: [
        ["150 cm", "4'11\""],
        ["160 cm", "5'3\""],
        ["165 cm", "5'5\""],
        ["170 cm", "5'7\""],
        ["175 cm", "5'9\""],
        ["180 cm", "5'11\""],
        ["185 cm", "6'1\""],
        ["190 cm", "6'3\""]
      ]}
    ],
    faq: [
      { q: "How tall is 175cm in feet?", a: "175cm converts to 5 feet 9 inches (5'9\"), rounding to the nearest whole inch." },
      { q: "How do I convert cm to feet and inches?", a: "Divide centimetres by 2.54 to get total inches, then divide by 12 to get whole feet, with the remainder as inches. 175 ÷ 2.54 = 68.9 inches ≈ 5 feet 9 inches." }
    ],
    related: ["length-converter", "kg-to-lbs-converter"]
  },
  {
    slug: "km-to-miles-running-pace-converter",
    cluster: "length",
    clusterLabel: "Length Converters",
    title: "Running Pace Converter — km to Miles",
    titleHook: "Pace, Not Distance",
    metaDescription: "Convert running pace between minutes-per-kilometre and minutes-per-mile.",
    h1: "Running Pace Converter — km to Miles",
    hook: "A 5:00/km pace converts to about 8:03/mile — not a simple multiply, since pace is inverted.",
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
    depthBlocks: [
      { type: "h2", text: "Common paces, both ways" },
      { type: "table", headers: ["Per km", "Per mile"], rows: [
        ["4:00", "6:26"],
        ["4:30", "7:14"],
        ["5:00", "8:03"],
        ["5:30", "8:51"],
        ["6:00", "9:39"],
        ["6:30", "10:28"],
        ["7:00", "11:16"]
      ]}
    ],
    faq: [
      { q: "How do I convert running pace from km to miles?", a: "Multiply your per-km pace (in seconds) by 1.60934 to get your per-mile pace. A 5:00/km pace is 300 seconds; 300 × 1.60934 ≈ 483 seconds ≈ 8:03/mile." },
      { q: "What is 5 min/km in min/mile?", a: "5:00/km converts to approximately 8:03/mile." }
    ],
    related: ["length-converter", "cm-to-feet-height-converter"]
  },
  {
    slug: "kg-to-lbs-converter",
    cluster: "weight",
    clusterLabel: "Weight Converters",
    title: "kg to lbs Converter",
    titleHook: "Either Direction, Instant",
    metaDescription: "Convert weight between kilograms and pounds instantly, in either direction.",
    h1: "kg to lbs Converter",
    hook: "70kg converts to about 154.3 lbs — enter either value and it converts automatically.",
    intro: "Enter a value in either field — it converts both directions automatically.",
    type: "form",
    formula: "weight-kg-lbs",
    fields: [
      { id: "kg", label: "Kilograms", type: "number", placeholder: "70" },
      { id: "lbs", label: "Pounds", type: "number", placeholder: "" }
    ],
    explainer: [
      "1kg = 2.20462lbs. Fill in either box and hit convert — you don't need to know which direction you're converting before you start typing. This is the same conversion factor used internally by the [[bmi-calculator|BMI calculator]] when switching between metric and imperial units."
    ],
    caveat: null,
    depthBlocks: [
      { type: "h2", text: "Common weights, converted" },
      { type: "table", headers: ["kg", "lbs"], rows: [
        ["50 kg", "110.2 lbs"],
        ["60 kg", "132.3 lbs"],
        ["70 kg", "154.3 lbs"],
        ["80 kg", "176.4 lbs"],
        ["90 kg", "198.4 lbs"],
        ["100 kg", "220.5 lbs"]
      ]}
    ],
    faq: [
      { q: "How many pounds is 1 kg?", a: "1 kilogram equals 2.20462 pounds." },
      { q: "How do I convert kg to lbs?", a: "Multiply kilograms by 2.20462. 70kg × 2.20462 ≈ 154.3 lbs." }
    ],
    related: ["length-converter", "cm-to-feet-height-converter", "bmi-calculator-kg-cm"]
  },
  {
    slug: "minutes-to-hours-converter",
    cluster: "time",
    clusterLabel: "Time Converters",
    title: "Minutes to Hours Converter",
    titleHook: "Decimal or Clock Time",
    metaDescription: "Convert minutes to hours, shown both as decimal hours and as hours-and-minutes.",
    h1: "Minutes to Hours Converter",
    hook: "150 minutes is 2.5 hours — or 2 hours 30 minutes, however you need it written.",
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
    depthBlocks: [
      { type: "h2", text: "Common durations, converted" },
      { type: "table", headers: ["Minutes", "Decimal hours", "Hours & minutes"], rows: [
        ["30", "0.5", "0h 30m"],
        ["60", "1.0", "1h 0m"],
        ["90", "1.5", "1h 30m"],
        ["120", "2.0", "2h 0m"],
        ["150", "2.5", "2h 30m"],
        ["180", "3.0", "3h 0m"]
      ]}
    ],
    faq: [
      { q: "How do I convert minutes to decimal hours for payroll?", a: "Divide minutes by 60. 150 minutes ÷ 60 = 2.5 decimal hours — the format most timesheet and payroll systems expect." },
      { q: "What is 90 minutes in hours?", a: "90 minutes is 1.5 hours, or 1 hour 30 minutes." }
    ],
    related: ["length-converter", "kg-to-lbs-converter"]
  }
];

if (typeof module !== "undefined") { module.exports = convertersData; }
