/* Quiklee — calculators data (dashboard-patched) */
const calculatorsData = [
  {
    "slug": "bmi-calculator",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator",
    "titleHook": "BMI + Your Healthy Range",
    "metaDescription": "Calculate your Body Mass Index instantly using metric or imperial units, with an explanation of what your result means.",
    "h1": "BMI Calculator",
    "hook": "A 175cm, 70kg adult has a BMI of 22.9 — inside the healthy 18.5–24.9 range.",
    "intro": "Enter your height and weight for a BMI calculator built for adults, instantly. Switch units below — this version works with either metric or imperial.",
    "type": "form",
    "formula": "bmi-universal",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "unit",
        "label": "Units",
        "type": "select",
        "options": [
          {
            "value": "metric",
            "label": "Metric (kg, cm)"
          },
          {
            "value": "imperial",
            "label": "Imperial (lb, in)"
          }
        ]
      },
      {
        "id": "weight",
        "label": "Weight",
        "type": "number",
        "placeholder": "70"
      },
      {
        "id": "height",
        "label": "Height",
        "type": "number",
        "placeholder": "175"
      }
    ],
    "explainer": [
      "BMI divides your weight by the square of your height. It's a quick screening number, not a diagnosis — it doesn't know how much of your weight is muscle versus fat, and it treats a bodybuilder and a sedentary person of the same height and weight identically. See [[how-to-calculate-bmi-manually|the full formula worked by hand]] if you want to check the math yourself.",
      "The formula also doesn't factor in age or gender directly — a 25-year-old man and a 65-year-old woman with an identical BMI land in the same category, even though clinicians increasingly read BMI by age and gender separately. That's exactly why the women-over-40, men-over-50, and stones-and-pounds versions below exist, rather than one generic calculator trying to fit everyone.",
      "If your result looks off for your body type, the [[bmi-calculator-for-bodybuilders|bodybuilder]], [[bmi-calculator-for-athletes|athlete]], or [[bmi-calculator-waist-circumference|waist-circumference]] versions below account for that. And if you're weighing this BMI calculator vs body fat percentage as the better number to track, they're measuring different things entirely — BMI is weight-for-height, body fat percentage is actual tissue composition — see the [[body-fat-percentage-calculator|body fat calculator]] for that comparison directly."
    ],
    "caveat": "BMI was designed as a population-level statistic in the 1830s, not an individual diagnostic tool. Use it as one data point, not the whole picture.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "BMI classification table"
      },
      {
        "type": "table",
        "headers": [
          "BMI range",
          "Category"
        ],
        "rows": [
          [
            "Below 16",
            "Severe thinness"
          ],
          [
            "16 – 17",
            "Moderate thinness"
          ],
          [
            "17 – 18.5",
            "Mild thinness"
          ],
          [
            "18.5 – 25",
            "Healthy weight"
          ],
          [
            "25 – 30",
            "Overweight"
          ],
          [
            "30 – 35",
            "Obese Class I"
          ],
          [
            "35 – 40",
            "Obese Class II"
          ],
          [
            "Above 40",
            "Obese Class III"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Risks associated with being overweight"
      },
      {
        "type": "p",
        "text": "A BMI in the overweight or obese range is linked to a higher risk of several conditions, according to the CDC:"
      },
      {
        "type": "list",
        "items": [
          "High blood pressure",
          "Type II diabetes",
          "Coronary heart disease and stroke",
          "Higher LDL ('bad') cholesterol and lower HDL ('good') cholesterol",
          "Certain cancers",
          "Sleep apnea and breathing problems",
          "Osteoarthritis from added joint strain"
        ]
      },
      {
        "type": "h2",
        "text": "Risks associated with being underweight"
      },
      {
        "type": "list",
        "items": [
          "Nutrient deficiencies and weakened immune function",
          "Osteoporosis and increased fracture risk",
          "Fertility issues in women",
          "Slower recovery from illness or surgery"
        ]
      },
      {
        "type": "p",
        "text": "Being significantly underweight can also point to an underlying condition — it's worth mentioning to a doctor if it isn't explained by diet or activity level."
      },
      {
        "type": "h2",
        "text": "Limitations of BMI"
      },
      {
        "type": "p",
        "text": "In adults, BMI can't distinguish muscle from fat, so it's known to overstate body fat in muscular people and can understate it in older adults who've lost muscle mass. It also doesn't account for age, sex, ethnicity, or where fat is carried on the body."
      },
      {
        "type": "p",
        "text": "In children and teens, BMI is interpreted differently — using age- and sex-specific percentile charts rather than the flat adult categories above, since a growing body's proportions change constantly."
      }
    ],
    "faq": [
      {
        "q": "What is a normal BMI?",
        "a": "A BMI between 18.5 and 24.9 is classed as a normal, healthy weight range for most adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ falls into the obese category."
      },
      {
        "q": "Is a BMI of 25 chubby?",
        "a": "A BMI of 25 sits right at the boundary between 'healthy weight' and 'overweight' on the standard scale — it's not a dramatic reading either way, and BMI alone can't tell you how much of that is muscle versus fat."
      },
      {
        "q": "What is a good BMI for a 70 year old?",
        "a": "The standard 18.5–24.9 range still applies, though some research associates a slightly higher BMI (up into the mid-to-high 20s) with no added health risk for adults over 65, compared with younger age groups."
      },
      {
        "q": "Are BMI calculators accurate?",
        "a": "The math itself is exact — it's a simple formula. What's debated is how well the *result* reflects actual health, since BMI can't see muscle mass, bone density, or where fat is stored. Treat it as a quick screening number, not a diagnosis."
      },
      {
        "q": "How is BMI calculated?",
        "a": "BMI is your weight in kilograms divided by your height in metres, squared. In pounds and inches, it's (weight ÷ height²) × 703. See the step-by-step page linked below for a full worked example."
      },
      {
        "q": "What do the different BMI score categories actually mean?",
        "a": "BMI scores are split into four main categories: underweight (below 18.5), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 and above). These ranges help screen for weight categories that may lead to health issues, though they do not directly measure body fat percentage."
      },
      {
        "q": "How does my BMI help me figure out a calorie deficit for weight loss?",
        "a": "Your BMI helps identify if you are carrying excess weight, which is the first step in deciding if a calorie deficit is appropriate. While BMI does not calculate your exact calorie burn, moving from an overweight or obese range toward a normal BMI generally requires consuming fewer calories than your body expends daily."
      },
      {
        "q": "Does my daily calorie intake depend on my BMI?",
        "a": "Daily caloric requirements are primarily determined by your total daily energy expenditure—which factors in your height, weight, age, and activity level—rather than your BMI alone. However, a higher BMI often correlates with a higher maintenance calorie requirement simply due to the energy needed to support a larger body mass."
      },
      {
        "q": "What is considered a healthy weight according to BMI standards?",
        "a": "A healthy weight is defined as a BMI score between 18.5 and 24.9. This range is statistically associated with the lowest risk of weight-related health conditions for most adults."
      },
      {
        "q": "How many calories should I eat based on my BMI results?",
        "a": "A BMI result alone cannot tell you how many calories to eat. To find your target intake, you must combine your height and weight data with your activity level to calculate your maintenance calories, then adjust down for weight loss or up for weight gain."
      },
      {
        "q": "What is my ideal weight based on a normal BMI?",
        "a": "An ideal weight range corresponds to a BMI between 18.5 and 24.9 for your specific height. Because height is the variable factor, you can use the calculator to find the exact weight span where your score falls into this normal category."
      },
      {
        "q": "Can I use centimeters and kilograms in this calculator?",
        "a": "Yes. You can switch the unit toggle on the calculator to enter your height in centimeters and your weight in kilograms for metric measurements."
      },
      {
        "q": "How do Canadian health guidelines use BMI in relation to diabetes?",
        "a": "Canadian clinical guidelines use BMI as a preliminary screening tool because a higher BMI, particularly in the overweight or obese ranges, is strongly correlated with an increased risk of developing type 2 diabetes."
      },
      {
        "q": "Is this BMI calculator accurate to use during pregnancy?",
        "a": "No. Standard BMI calculators are designed for non-pregnant adults and do not account for the rapid weight gain and physical changes that occur during pregnancy. Expecting individuals should consult a healthcare provider for appropriate weight tracking."
      },
      {
        "q": "Can I enter my weight in pounds?",
        "a": "Yes. Switch the calculator units to imperial to enter your height in feet and inches and your weight in pounds."
      }
    ],
    "related": [
      "bmi-calculator-kg-cm",
      "bmi-calculator-for-athletes",
      "bmi-calculator-waist-circumference",
      "bmi-calculator-stones-pounds",
      "how-to-calculate-bmi-manually",
      "ideal-weight-calculator"
    ]
  },
  {
    "slug": "bmi-calculator-kg-cm",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator (kg and cm)",
    "titleHook": "Kilograms & cm, No Math",
    "metaDescription": "A streamlined BMI calculator that only uses kilograms and centimetres — no unit switching needed.",
    "h1": "BMI Calculator — kg and cm",
    "hook": "70kg at 175cm gives a BMI of 22.9 — no unit conversion required.",
    "intro": "No dropdown, no unit toggle — just weight in kilograms and height in centimetres, the way most of the world measures both.",
    "type": "form",
    "formula": "bmi-metric",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "70"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "175"
      }
    ],
    "explainer": [
      "This is the plain metric version: kilograms and centimetres in, BMI out. Formula is weight (kg) ÷ height (m)², where height in cm is converted to metres automatically — a BMI calculator using kg and cm from start to finish, with no unit switching in between.",
      "If you're used to stones and pounds instead, use the [[bmi-calculator-stones-pounds|imperial version]] linked below rather than converting by hand."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Healthy weight by height (quick reference)"
      },
      {
        "type": "p",
        "text": "If you'd rather look up a range than run the calculator, here's the healthy-BMI weight range (18.5–24.9) for common heights:"
      },
      {
        "type": "table",
        "headers": [
          "Height",
          "Healthy weight range"
        ],
        "rows": [
          [
            "150 cm",
            "41.6 – 56.0 kg"
          ],
          [
            "155 cm",
            "44.4 – 59.8 kg"
          ],
          [
            "160 cm",
            "47.4 – 63.7 kg"
          ],
          [
            "165 cm",
            "50.4 – 67.8 kg"
          ],
          [
            "170 cm",
            "53.5 – 72.0 kg"
          ],
          [
            "175 cm",
            "56.7 – 76.3 kg"
          ],
          [
            "180 cm",
            "59.9 – 80.7 kg"
          ],
          [
            "185 cm",
            "63.3 – 85.2 kg"
          ],
          [
            "190 cm",
            "66.8 – 89.9 kg"
          ]
        ]
      },
      {
        "type": "p",
        "text": "These are population-average ranges, not individual targets — muscle mass, frame size, and age all shift where a healthy weight actually falls for a given person."
      }
    ],
    "faq": [
      {
        "q": "Is BMI calculated differently in kg and cm?",
        "a": "No — the formula is identical to the imperial one, just without needing a conversion step. Weight in kg divided by height in metres, squared."
      },
      {
        "q": "What's a healthy BMI in kg and cm?",
        "a": "The same 18.5–24.9 range applies regardless of which units you use to get there — BMI is a unitless ratio once calculated."
      }
    ],
    "related": [
      "bmi-calculator",
      "bmi-calculator-stones-pounds",
      "healthy-bmi-range-by-age"
    ]
  },
  {
    "slug": "bmi-calculator-for-bodybuilders",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator for Bodybuilders",
    "titleHook": "Why Lifters Score High",
    "metaDescription": "BMI calculator for bodybuilders and heavily muscled lifters, with an explanation of why standard BMI overstates fatness for high muscle mass.",
    "h1": "BMI Calculator for Bodybuilders",
    "hook": "A 95kg, 178cm bodybuilder at 8% body fat can still score 'obese' on paper — muscle weighs more than fat.",
    "intro": "Muscle is denser than fat, so BMI — which only knows total weight — routinely flags lean, muscular lifters as 'overweight' or 'obese'. This version calculates the same number but tells you what it actually means for a bodybuilder's physique.",
    "type": "form",
    "formula": "bmi-athletic",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "95"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "178"
      },
      {
        "id": "physique",
        "label": "Training background",
        "type": "select",
        "options": [
          {
            "value": "competitive",
            "label": "Competitive bodybuilder / physique athlete"
          },
          {
            "value": "serious",
            "label": "Serious lifter, several years of training"
          },
          {
            "value": "recreational",
            "label": "Recreational lifting"
          }
        ]
      }
    ],
    "explainer": [
      "A male bodybuilder at 178cm and 95kg with 8% body fat will score 'obese' on the standard BMI scale — despite being leaner than almost anyone in the general population. That's the well-documented failure mode of applying a population-average formula to an outlier physique, and exactly why a BMI calculator taking muscle into account looks different from the plain version.",
      "For competitive and serious lifters, [[body-fat-percentage-calculator|a body-fat percentage estimate]] tells you far more than BMI ever will. Treat the number below as a formality, not feedback."
    ],
    "caveat": "If your BMI reads 'overweight' or 'obese' but you can see visible muscle separation and low body fat, trust the mirror and a body-fat estimate over this number.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "The same weight, three different verdicts"
      },
      {
        "type": "p",
        "text": "BMI can't see body composition — only the scale number matters to the formula. Here's how three people at 178cm and roughly the same BMI reading actually compare:"
      },
      {
        "type": "table",
        "headers": [
          "Profile",
          "Weight",
          "BMI reads as",
          "Actual body fat"
        ],
        "rows": [
          [
            "Competitive bodybuilder",
            "95 kg",
            "Obese (30.0)",
            "~8%"
          ],
          [
            "Sedentary, untrained",
            "93 kg",
            "Obese (29.4)",
            "~28%"
          ],
          [
            "Average fitness level",
            "78 kg",
            "Healthy (24.6)",
            "~18%"
          ]
        ]
      },
      {
        "type": "p",
        "text": "The bodybuilder and the sedentary person land in nearly the same BMI category despite one carrying triple the body fat of the other — which is exactly the scenario BMI was never built to distinguish."
      }
    ],
    "faq": [
      {
        "q": "Why is bodybuilder BMI always high?",
        "a": "Because BMI can't distinguish muscle from fat — it only measures total weight against height. A pound of muscle takes up less space than a pound of fat but weighs the same, so a very muscular person weighs more per inch of height than the population average BMI was built on."
      },
      {
        "q": "What should bodybuilders use instead of BMI?",
        "a": "A body-fat percentage estimate (calipers, a Navy-method calculation, or a DEXA scan) gives a far more useful number for anyone with significant muscle mass. Try the body fat percentage calculator linked below."
      }
    ],
    "related": [
      "bmi-calculator-for-athletes",
      "bmi-calculator-waist-circumference",
      "bmi-calculator",
      "body-fat-percentage-calculator",
      "lean-body-mass-calculator"
    ]
  },
  {
    "slug": "bmi-calculator-for-athletes",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator for Athletes",
    "titleHook": "Built for Muscle, Not Weight",
    "metaDescription": "BMI calculator built for athletes, with context on why muscle mass and training type skew standard BMI results.",
    "h1": "BMI Calculator for Athletes",
    "hook": "Power and strength athletes routinely score 'overweight' on standard BMI despite low body fat.",
    "intro": "Rugby players, sprinters, rowers, and powerlifters all tend to run 'high' on standard BMI charts for the same reason bodybuilders do — more muscle per centimetre of height than the population BMI was calibrated on.",
    "type": "form",
    "formula": "bmi-athletic",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "82"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "180"
      },
      {
        "id": "physique",
        "label": "Sport type",
        "type": "select",
        "options": [
          {
            "value": "power",
            "label": "Power / strength sport (rugby, powerlifting, throwing)"
          },
          {
            "value": "endurance",
            "label": "Endurance sport (running, cycling, swimming)"
          },
          {
            "value": "mixed",
            "label": "Mixed / team sport"
          }
        ]
      }
    ],
    "explainer": [
      "Power and strength athletes see the biggest gap between BMI and reality, since added muscle mass raises weight without adding fat. Endurance athletes tend to track closer to standard BMI ranges, since they typically carry less added muscle mass.",
      "Sports scientists generally use skinfold measurements, bioelectrical impedance, or DEXA scans instead of BMI when tracking athlete body composition. If you're comparing this BMI calculator with body fat percentage as the more informative number, see [[body-fat-percentage-calculator|the body fat percentage calculator]] for a rough version of that approach."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Typical BMI by sport (elite athletes)"
      },
      {
        "type": "p",
        "text": "Published sports-science data shows BMI varies widely by discipline, even among elite, low-body-fat athletes — a reminder that 'high BMI' alone says nothing about fitness or fat levels:"
      },
      {
        "type": "table",
        "headers": [
          "Sport",
          "Typical BMI range"
        ],
        "rows": [
          [
            "Marathon running",
            "18.5 – 21"
          ],
          [
            "Sprinting",
            "22 – 25"
          ],
          [
            "Swimming",
            "22 – 25"
          ],
          [
            "Rugby (forwards)",
            "28 – 32"
          ],
          [
            "Powerlifting / strongman",
            "28 – 35+"
          ]
        ]
      },
      {
        "type": "p",
        "text": "A rugby forward and a marathon runner can both be at the top of their sport's fitness level while sitting on opposite ends of the BMI scale — the difference is muscle mass and sport-specific build, not health."
      }
    ],
    "faq": [
      {
        "q": "Why do athletes have high BMI?",
        "a": "Muscle weighs more than fat for the same volume, so athletes with significant muscle mass weigh more per inch of height than a sedentary person of the same height — even at very low body fat."
      },
      {
        "q": "Does BMI matter for athletic performance?",
        "a": "Not directly — BMI is a general population health screening number, not a performance or fitness measure. Coaches and sports scientists use body composition and performance testing instead."
      }
    ],
    "related": [
      "bmi-calculator-for-bodybuilders",
      "bmi-calculator-waist-circumference",
      "bmi-calculator",
      "lean-body-mass-calculator"
    ]
  },
  {
    "slug": "bmi-calculator-waist-circumference",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator with Waist Circumference",
    "titleHook": "Real Risk Level",
    "metaDescription": "Calculates BMI alongside waist-to-height ratio, a stronger indicator of health risk than BMI alone.",
    "h1": "BMI Calculator with Waist Circumference",
    "hook": "A waist-to-height ratio under 0.5 is the healthy-range guideline most clinicians actually use.",
    "intro": "BMI alone can't tell where your weight is carried. Adding waist circumference gives you a waist-to-height ratio too — a measurement several studies rate as a better predictor of cardiovascular risk than BMI by itself.",
    "type": "form",
    "formula": "bmi-waist",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "78"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "172"
      },
      {
        "id": "waist",
        "label": "Waist circumference (cm)",
        "type": "number",
        "placeholder": "88"
      }
    ],
    "explainer": [
      "Waist-to-height ratio is calculated as waist ÷ height. A ratio under 0.5 is generally considered a healthy range for most adults, regardless of overall BMI category — this is why two people with the same BMI can have very different health risk profiles.",
      "Measure your waist at the narrowest point, usually just above the belly button, without pulling the tape measure tight. A full BMI calculator with neck and waist measurements — like the one used for body fat estimates — adds even more detail, but waist alone already improves on BMI's blind spot around where weight is carried."
    ],
    "caveat": "Waist-to-height ratio is a screening guide, not a diagnosis — it doesn't account for pregnancy, certain medical conditions, or body shapes where fat is carried elsewhere.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Waist circumference risk thresholds (absolute, not ratio-based)"
      },
      {
        "type": "p",
        "text": "Separately from the waist-to-height ratio above, health agencies including the NIH also flag risk based on raw waist measurement alone, regardless of height:"
      },
      {
        "type": "table",
        "headers": [
          "Group",
          "Increased risk above"
        ],
        "rows": [
          [
            "Men",
            "40 in / 102 cm"
          ],
          [
            "Women",
            "35 in / 88 cm"
          ]
        ]
      },
      {
        "type": "p",
        "text": "These absolute thresholds and the waist-to-height ratio measure slightly different things and can occasionally disagree for very tall or very short people — the ratio tends to scale more fairly across a wide height range."
      }
    ],
    "faq": [
      {
        "q": "What is a healthy waist-to-height ratio?",
        "a": "A ratio below 0.5 (waist measurement less than half your height) is the general guideline used across most age groups, though some clinicians allow slightly higher for adults over 65."
      },
      {
        "q": "Is waist size a better health measure than BMI?",
        "a": "For cardiovascular risk specifically, many studies suggest yes — waist-to-height ratio reflects where fat is stored, which BMI can't see at all. It's best used alongside BMI, not as a full replacement."
      }
    ],
    "related": [
      "bmi-calculator-for-athletes",
      "bmi-calculator-for-bodybuilders",
      "bmi-calculator"
    ]
  },
  {
    "slug": "bmi-calculator-women-over-40",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator for Women Over 40",
    "titleHook": "For Midlife Body Shifts",
    "metaDescription": "BMI calculator for women over 40, with context on how hormonal changes and muscle loss affect the standard BMI scale.",
    "h1": "BMI Calculator for Women Over 40",
    "hook": "Body composition shifts after 40 even when the number on the scale doesn't.",
    "intro": "After 40, body composition shifts even if weight on the scale doesn't — muscle mass declines gradually and fat distribution tends to shift toward the abdomen, especially around perimenopause and menopause. The BMI formula itself doesn't change, but what a given number means for health risk can.",
    "type": "form",
    "formula": "bmi-age-context",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "68"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "165"
      },
      {
        "id": "ageBand",
        "label": "Age range",
        "type": "select",
        "options": [
          {
            "value": "40s",
            "label": "40–49"
          },
          {
            "value": "50s",
            "label": "50–59"
          },
          {
            "value": "60plus",
            "label": "60+"
          }
        ]
      }
    ],
    "explainer": [
      "Some research suggests slightly higher BMI ranges may carry less added risk for women over 65 compared to younger adults, while the standard 18.5–24.9 'normal' band was calibrated mostly on younger populations. This is one calculator built to work as a BMI calculator for women over 60 too, not just the 40s and 50s — the age selector above adjusts the framing accordingly.",
      "Tracking [[bmi-calculator-waist-circumference|waist circumference alongside BMI]] becomes more informative after 40, since abdominal fat redistribution is common during this stage regardless of total weight change."
    ],
    "caveat": "This tool gives context, not medical advice — if you're navigating perimenopause-related weight changes, a doctor or registered dietitian can give guidance specific to your situation.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Body composition by decade (typical, not universal)"
      },
      {
        "type": "p",
        "text": "Research on aging and body composition shows a consistent pattern of gradual muscle loss and fat redistribution, even when total weight stays flat:"
      },
      {
        "type": "table",
        "headers": [
          "Age range",
          "Typical shift"
        ],
        "rows": [
          [
            "30s",
            "Muscle mass roughly stable; earliest hormonal shifts if perimenopause begins"
          ],
          [
            "40s",
            "Muscle mass begins declining ~1% per year; fat increasingly shifts toward the abdomen"
          ],
          [
            "50s",
            "Muscle loss accelerates around menopause; waist circumference often rises independent of weight"
          ],
          [
            "60s+",
            "Continued muscle loss (sarcopenia); strength training becomes especially protective"
          ]
        ]
      },
      {
        "type": "p",
        "text": "This is why two women at the identical BMI, 15 years apart, can have meaningfully different body composition and health risk — the number alone doesn't capture the shift."
      }
    ],
    "faq": [
      {
        "q": "What is a healthy BMI for women?",
        "a": "The standard 18.5–24.9 range applies to women the same as men — BMI's formula doesn't factor in sex, though body composition at a given BMI often differs between men and women."
      },
      {
        "q": "Does BMI change after 40?",
        "a": "The formula and categories stay the same, but body composition often shifts — less muscle, more abdominal fat — even at a stable weight. That's why the same BMI number can mean something different at 25 versus 45."
      }
    ],
    "related": [
      "bmi-calculator-waist-circumference",
      "bmi-calculator-men-over-50",
      "healthy-bmi-range-by-age"
    ]
  },
  {
    "slug": "bmi-calculator-men-over-50",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator for Men Over 50",
    "titleHook": "Accounts for Muscle Loss",
    "metaDescription": "BMI calculator for men over 50, with context on age-related muscle loss and how it affects standard BMI interpretation.",
    "h1": "BMI Calculator for Men Over 50",
    "hook": "A stable BMI over decades can hide a real shift — muscle quietly replaced by fat at the same weight.",
    "intro": "Men typically start losing muscle mass (sarcopenia) gradually from their 30s onward, accelerating after 50. Two men with an identical BMI at 30 and 55 can have very different muscle-to-fat ratios, even at the same number.",
    "type": "form",
    "formula": "bmi-age-context",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "85"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "178"
      },
      {
        "id": "ageBand",
        "label": "Age range",
        "type": "select",
        "options": [
          {
            "value": "50s",
            "label": "50–59"
          },
          {
            "value": "60s",
            "label": "60–69"
          },
          {
            "value": "70plus",
            "label": "70+"
          }
        ]
      }
    ],
    "explainer": [
      "A stable BMI over decades can mask a real shift underneath — muscle replaced by fat at roughly the same weight, sometimes called 'normal weight obesity.' This is part of why strength training is recommended alongside weight management for men over 50, not just calorie tracking. The age selector above also makes this usable as a BMI calculator for men over 60 or into your 70s, since sarcopenia's effect on interpretation only grows with age.",
      "Grip strength and [[bmi-calculator-waist-circumference|waist circumference]] are two simple measures doctors increasingly pair with BMI for this age group, since neither is fooled by a stable number on the scale."
    ],
    "caveat": "This tool gives context, not medical advice — for guidance specific to your health history, talk to a doctor.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Muscle loss by decade in men"
      },
      {
        "type": "p",
        "text": "Sarcopenia (age-related muscle loss) follows a fairly consistent pattern in research, and it can happen even while weight — and BMI — stays flat:"
      },
      {
        "type": "table",
        "headers": [
          "Age range",
          "Typical shift"
        ],
        "rows": [
          [
            "30s–40s",
            "Muscle mass loss begins, often under 1% per year — usually unnoticed"
          ],
          [
            "50s",
            "Loss accelerates to roughly 1–2% per year without resistance training"
          ],
          [
            "60s",
            "Continued loss; grip strength and functional strength often decline noticeably"
          ],
          [
            "70s+",
            "Loss can reach 15% or more of peak muscle mass without intervention"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Strength training is the most consistently effective way to slow this pattern — and it's also why two men can share the same BMI at very different actual fitness and strength levels."
      }
    ],
    "faq": [
      {
        "q": "What is a healthy BMI for men over 50?",
        "a": "The standard 18.5–24.9 range still applies, though some clinicians give slightly more latitude in the upper end of 'healthy' for older adults, since a small BMI increase with age is common and not automatically harmful."
      },
      {
        "q": "Why does muscle loss matter if my weight is stable?",
        "a": "Because BMI can't tell the difference — a man who loses 5kg of muscle and gains 5kg of fat shows an unchanged BMI, despite a meaningfully worse body composition."
      }
    ],
    "related": [
      "bmi-calculator-waist-circumference",
      "bmi-calculator-women-over-40",
      "healthy-bmi-range-by-age"
    ]
  },
  {
    "slug": "bmi-calculator-stones-pounds",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "BMI Calculator in Stones and Pounds",
    "titleHook": "No Converting Required",
    "metaDescription": "UK-style BMI calculator using stones and pounds for weight, with height in feet and inches.",
    "h1": "BMI Calculator — Stones and Pounds",
    "hook": "11 stone 4lb at 5'9\" gives a BMI of 23.4 — no manual conversion needed.",
    "intro": "Built for stones and pounds rather than kilograms — the way weight is still commonly given in the UK and Ireland. Height goes in as feet and inches.",
    "type": "form",
    "formula": "bmi-imperial-stones",
    "gauge": {
      "bands": [
        {
          "label": "Underweight",
          "weight": 3.5,
          "color": "#6B9BD1"
        },
        {
          "label": "Healthy",
          "weight": 6.5,
          "color": "#1F8A5F"
        },
        {
          "label": "Overweight",
          "weight": 5,
          "color": "#C77D22"
        },
        {
          "label": "Obese",
          "weight": 10,
          "color": "#B8443A"
        }
      ]
    },
    "fields": [
      {
        "id": "stones",
        "label": "Weight — stones",
        "type": "number",
        "placeholder": "11"
      },
      {
        "id": "pounds",
        "label": "Weight — pounds",
        "type": "number",
        "placeholder": "4"
      },
      {
        "id": "feet",
        "label": "Height — feet",
        "type": "number",
        "placeholder": "5"
      },
      {
        "id": "inches",
        "label": "Height — inches",
        "type": "number",
        "placeholder": "9"
      }
    ],
    "explainer": [
      "11 stone 4 lb converts to 71.7kg; 5'9\" converts to 175cm — the calculator handles both conversions internally so you can enter weight and height exactly as you'd say them out loud. If you're more used to pounds and inches without the stones, that's the same underlying math a BMI calculator using pounds and inches runs — just a different way of writing the same weight.",
      "If you'd rather work in kilograms and centimetres directly, the [[bmi-calculator-kg-cm|metric version]] is linked below."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Healthy weight by height (quick reference)"
      },
      {
        "type": "p",
        "text": "The healthy-BMI weight range (18.5–24.9) for common UK/Irish heights, in stones and pounds:"
      },
      {
        "type": "table",
        "headers": [
          "Height",
          "Healthy weight range"
        ],
        "rows": [
          [
            "4'10\"",
            "6st 5lb – 8st 7lb"
          ],
          [
            "5'0\"",
            "6st 11lb – 9st 2lb"
          ],
          [
            "5'2\"",
            "7st 3lb – 9st 10lb"
          ],
          [
            "5'4\"",
            "7st 10lb – 10st 5lb"
          ],
          [
            "5'6\"",
            "8st 3lb – 11st 0lb"
          ],
          [
            "5'8\"",
            "8st 10lb – 11st 10lb"
          ],
          [
            "5'10\"",
            "9st 3lb – 12st 6lb"
          ],
          [
            "6'0\"",
            "9st 10lb – 13st 2lb"
          ],
          [
            "6'2\"",
            "10st 4lb – 13st 12lb"
          ]
        ]
      },
      {
        "type": "p",
        "text": "The NHS uses this same 18.5–24.9 healthy range regardless of whether weight is entered in stones or kilograms — the classification itself doesn't change with units."
      }
    ],
    "faq": [
      {
        "q": "How do I calculate BMI in stones and pounds?",
        "a": "Convert stones and pounds to kilograms first (1 stone = 6.35kg), then use the standard metric BMI formula — or just enter your weight directly above and skip the manual conversion."
      },
      {
        "q": "How many pounds are in a stone?",
        "a": "14 pounds make one stone. So 11 stone 4 pounds is (11 × 14) + 4 = 158 pounds total, which is what the calculator converts internally before applying the BMI formula."
      }
    ],
    "related": [
      "bmi-calculator-kg-cm",
      "bmi-calculator",
      "how-to-calculate-bmi-manually"
    ]
  },
  {
    "slug": "how-to-calculate-bmi-manually",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "How to Calculate BMI Manually",
    "titleHook": "The Exact Formula, By Hand",
    "metaDescription": "Step-by-step guide to calculating BMI by hand, with the formula and a worked example.",
    "h1": "How to Calculate BMI Manually",
    "hook": "The imperial formula's mysterious '703' is just a unit-conversion constant, not a typo.",
    "intro": "The full formula, in both metric and imperial, with a worked example for each — useful as a BMI calculator using measurements you've already jotted down, for checking homework, or just curious what the calculator above is actually doing.",
    "type": "info",
    "content": [
      {
        "type": "h2",
        "text": "Metric formula"
      },
      {
        "type": "p",
        "text": "BMI = weight in kilograms ÷ (height in metres × height in metres)"
      },
      {
        "type": "steps",
        "items": [
          "Convert height from centimetres to metres by dividing by 100. Example: 175cm ÷ 100 = 1.75m.",
          "Square the height in metres. Example: 1.75 × 1.75 = 3.0625.",
          "Divide weight in kilograms by that number. Example: 70kg ÷ 3.0625 = 22.86.",
          "That result, 22.86, is the BMI."
        ]
      },
      {
        "type": "h2",
        "text": "Imperial formula"
      },
      {
        "type": "p",
        "text": "BMI = (weight in pounds ÷ (height in inches × height in inches)) × 703"
      },
      {
        "type": "steps",
        "items": [
          "Convert height fully to inches. Example: 5'9\" = 69 inches.",
          "Square the height in inches. Example: 69 × 69 = 4,761.",
          "Divide weight in pounds by that number, then multiply by 703. Example: (154 ÷ 4,761) × 703 ≈ 22.74.",
          "That result is the BMI — the 703 constant exists purely to make the imperial formula land on the same scale as the metric one."
        ]
      },
      {
        "type": "p",
        "text": "The 703 multiplier trips people up most often — it's not arbitrary, it's the unit conversion factor (1kg/m² = 703 lb/in²) baked into the formula so you don't have to convert to metric first."
      }
    ],
    "caveat": null,
    "faq": [
      {
        "q": "What is the BMI formula?",
        "a": "Metric: weight in kg ÷ (height in metres)². Imperial: (weight in lb ÷ (height in inches)²) × 703. Both formulas produce the same BMI scale."
      },
      {
        "q": "Why is there a 703 in the imperial BMI formula?",
        "a": "It's a unit-conversion constant, not an arbitrary number — it makes the imperial (pounds and inches) formula land on the exact same 0–40+ scale as the metric one, without needing to convert to kilograms first."
      }
    ],
    "related": [
      "bmi-calculator",
      "bmi-calculator-kg-cm",
      "healthy-bmi-range-by-age"
    ]
  },
  {
    "slug": "healthy-bmi-range-by-age",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "Healthy BMI Range by Age",
    "titleHook": "See Where You Fall by Age",
    "metaDescription": "Reference table of standard BMI categories, plus how interpretation shifts across age groups.",
    "h1": "Healthy BMI Range by Age",
    "hook": "The 18.5–24.9 'normal' range doesn't officially change by age for adults — but how strictly it's applied does.",
    "intro": "The standard BMI categories don't officially change by age for adults — but how much weight clinicians give the number does. Here's the standard scale, and the caveats that come with it at different life stages.",
    "type": "info",
    "content": [
      {
        "type": "h2",
        "text": "Standard adult BMI categories (18–64)"
      },
      {
        "type": "table",
        "headers": [
          "BMI range",
          "Category"
        ],
        "rows": [
          [
            "Below 18.5",
            "Underweight"
          ],
          [
            "18.5 – 24.9",
            "Healthy weight"
          ],
          [
            "25.0 – 29.9",
            "Overweight"
          ],
          [
            "30.0 and above",
            "Obese"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "How interpretation shifts with age"
      },
      {
        "type": "table",
        "headers": [
          "Age group",
          "Note"
        ],
        "rows": [
          [
            "Children & teens",
            "Uses percentile charts by age and sex, not the flat adult scale — a paediatric growth chart, not this calculator, is the right tool."
          ],
          [
            "18–64",
            "Standard categories above apply most directly."
          ],
          [
            "65+",
            "Some research associates slightly higher BMI (up to ~27) with no added mortality risk in this group, versus younger adults."
          ]
        ]
      },
      {
        "type": "p",
        "text": "None of these ranges account for muscle mass, pregnancy, or certain medical conditions — see the athlete, bodybuilder, or waist-circumference calculators for those situations."
      },
      {
        "type": "p",
        "text": "For a finer breakdown of obesity class — Class I, II, and III rather than one flat 'Obese' band — see the classification table on the [[bmi-calculator|main BMI calculator]], which splits out the levels of obesity in more detail."
      }
    ],
    "caveat": null,
    "faq": [
      {
        "q": "What is a healthy BMI range?",
        "a": "18.5 to 24.9 for most adults aged 18–64. Below that is classed underweight, 25–29.9 overweight, and 30+ obese."
      },
      {
        "q": "Does healthy BMI change with age?",
        "a": "The official categories stay the same for adults, but some research suggests slightly higher BMI carries less added health risk for adults over 65 compared with younger age groups."
      }
    ],
    "related": [
      "bmi-calculator-women-over-40",
      "bmi-calculator-men-over-50",
      "bmi-calculator"
    ]
  },
  {
    "slug": "ideal-weight-calculator",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "Ideal Weight Calculator",
    "titleHook": "What Doctors Use as Reference",
    "metaDescription": "Estimate your ideal body weight from height and gender using the Devine formula, with an explanation of what it does and doesn't account for.",
    "h1": "Ideal Weight Calculator",
    "hook": "A 175cm man's Devine-formula ideal weight is about 70.5kg — a reference point, not a strict target.",
    "intro": "If you've been asking a BMI calculator how much you should weigh and want a more direct answer, this tool estimates ideal weight straight from height and gender, using the Devine formula — the same one many hospitals use as a starting reference point, most often for medication dosing.",
    "type": "form",
    "formula": "ideal-weight",
    "fields": [
      {
        "id": "gender",
        "label": "Gender",
        "type": "select",
        "options": [
          {
            "value": "male",
            "label": "Male"
          },
          {
            "value": "female",
            "label": "Female"
          }
        ]
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "175"
      }
    ],
    "explainer": [
      "The Devine formula was originally created in 1974 to help estimate drug dosing, not as a fitness or aesthetic target — it starts from a base weight at 5 feet and adds a fixed amount per inch above that.",
      "Like [[bmi-calculator|BMI]], it doesn't know your frame size, muscle mass, or body composition — treat the result as a reference range, not a number to chase exactly. See [[lean-body-mass-calculator|lean body mass]] for a measure that accounts for your actual weight instead of just height."
    ],
    "caveat": "This is a population-average estimate, not a personalized target — frame size, muscle mass, and individual health all matter more than hitting this exact number.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Four formulas, four different answers"
      },
      {
        "type": "p",
        "text": "Devine isn't the only ideal-weight formula in clinical use — several others exist, and they genuinely disagree. For a 175cm man:"
      },
      {
        "type": "table",
        "headers": [
          "Formula",
          "Year",
          "Result"
        ],
        "rows": [
          [
            "Devine",
            "1974",
            "70.5 kg"
          ],
          [
            "Robinson",
            "1983",
            "68.9 kg"
          ],
          [
            "Miller",
            "1983",
            "68.7 kg"
          ],
          [
            "Hamwi",
            "1964",
            "72.0 kg"
          ]
        ]
      },
      {
        "type": "p",
        "text": "A roughly 3kg spread across formulas, all for the same height — a reminder that 'ideal weight' was never meant to be a precise target, just a population-average reference point. Devine is used here because it's the most common in clinical dosing calculations today."
      }
    ],
    "faq": [
      {
        "q": "What is my ideal weight?",
        "a": "It depends on height and gender in the simplest formulas, though real 'ideal' weight also depends on frame size, muscle mass, and overall health — this calculator gives a population-average reference point, not a personalized target."
      },
      {
        "q": "How is ideal weight calculated?",
        "a": "This calculator uses the Devine formula: for men, 50kg + 2.3kg per inch of height over 5 feet; for women, 45.5kg + 2.3kg per inch over 5 feet. It was originally designed for medical dosing calculations, not fitness goals."
      },
      {
        "q": "Why do different ideal weight calculators give different answers?",
        "a": "Because they're built from different formulas, developed in different decades from different population data. None of them is 'more correct' — they're all rough population averages, which is exactly why the result should be read as a reference range, not a precise target."
      }
    ],
    "related": [
      "bmi-calculator",
      "lean-body-mass-calculator",
      "body-fat-percentage-calculator"
    ]
  },
  {
    "slug": "body-fat-percentage-calculator",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "Body Fat Percentage Calculator",
    "titleHook": "No Calipers, No Scan Needed",
    "metaDescription": "Estimate body fat percentage using the US Navy tape-measure method, more accurate for muscular bodies than BMI alone.",
    "h1": "Body Fat Percentage Calculator",
    "hook": "The US Navy method estimates body fat from waist, neck, and height — no calipers or scan needed.",
    "intro": "Enter your measurements to estimate body fat percentage using the US Navy method — a tape-measure formula that's far more useful than BMI for anyone with significant muscle mass.",
    "type": "form",
    "formula": "body-fat-navy",
    "fields": [
      {
        "id": "gender",
        "label": "Gender",
        "type": "select",
        "options": [
          {
            "value": "male",
            "label": "Male"
          },
          {
            "value": "female",
            "label": "Female"
          }
        ]
      },
      {
        "id": "height",
        "label": "Height (inches)",
        "type": "number",
        "placeholder": "70"
      },
      {
        "id": "neck",
        "label": "Neck circumference (inches)",
        "type": "number",
        "placeholder": "15"
      },
      {
        "id": "waist",
        "label": "Waist circumference (inches)",
        "type": "number",
        "placeholder": "34"
      },
      {
        "id": "hip",
        "label": "Hip circumference (inches, women only)",
        "type": "number",
        "placeholder": "38"
      }
    ],
    "explainer": [
      "The Navy method was developed for military fitness assessments and is accurate to within roughly 3–4% of a DEXA scan for most body types — far closer than [[bmi-calculator|BMI]] gets for anyone muscular. It's the natural next step if you've been running a BMI calculator vs body fat percentage comparison and want the body-fat side of that comparison to actually be a number, not a guess.",
      "For the most accurate reading, measure waist at the navel and neck just below the larynx, keeping the tape snug but not compressing the skin."
    ],
    "caveat": "This is an estimate, not a clinical measurement — for a precise reading, a DEXA scan or hydrostatic weighing is the gold standard.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Body fat percentage categories"
      },
      {
        "type": "p",
        "text": "Standard classification ranges used by the American Council on Exercise, by gender:"
      },
      {
        "type": "table",
        "headers": [
          "Category",
          "Men",
          "Women"
        ],
        "rows": [
          [
            "Essential fat",
            "2–5%",
            "10–13%"
          ],
          [
            "Athletes",
            "6–13%",
            "14–20%"
          ],
          [
            "Fitness",
            "14–17%",
            "21–24%"
          ],
          [
            "Average",
            "18–24%",
            "25–31%"
          ],
          [
            "Obese",
            "25%+",
            "32%+"
          ]
        ]
      },
      {
        "type": "p",
        "text": "These bands are broader than BMI's, on purpose — body fat percentage naturally varies more by age, genetics, and training history than a single 'healthy' number could capture accurately."
      }
    ],
    "faq": [
      {
        "q": "How is body fat percentage calculated?",
        "a": "This calculator uses the US Navy method, based on waist, neck, and height measurements (plus hip for women). It's a formula derived from population data, accurate to within a few percentage points of a DEXA scan for most people."
      },
      {
        "q": "What is a healthy body fat percentage?",
        "a": "Roughly 10–20% for men and 18–28% for women is considered a healthy, non-athletic range, though 'healthy' varies by age and individual — athletes often run lower than these ranges."
      },
      {
        "q": "Is the Navy method accurate for very lean or very heavy people?",
        "a": "It tends to be less reliable at the extremes — very lean, highly muscular people and people with very high body fat both see larger errors than the typical ±3-4% margin. A DEXA scan is more reliable outside the average range."
      }
    ],
    "related": [
      "bmi-calculator-for-bodybuilders",
      "lean-body-mass-calculator",
      "ideal-weight-calculator"
    ]
  },
  {
    "slug": "lean-body-mass-calculator",
    "cluster": "bmi",
    "clusterLabel": "BMI & Body Calculators",
    "title": "Lean Body Mass Calculator",
    "titleHook": "Everything That Isn't Fat",
    "metaDescription": "Estimate lean body mass and fat mass from weight, height, and gender using the Boer formula.",
    "h1": "Lean Body Mass Calculator",
    "hook": "An 80kg, 178cm man has an estimated lean mass of about 65.5kg — everything that isn't fat.",
    "intro": "Enter your weight, height, and gender to estimate lean body mass — your total weight minus estimated fat mass, using the Boer formula.",
    "type": "form",
    "formula": "lean-body-mass",
    "fields": [
      {
        "id": "gender",
        "label": "Gender",
        "type": "select",
        "options": [
          {
            "value": "male",
            "label": "Male"
          },
          {
            "value": "female",
            "label": "Female"
          }
        ]
      },
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "placeholder": "80"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "placeholder": "178"
      }
    ],
    "explainer": [
      "The Boer formula estimates lean mass from just weight, height, and gender — it's a population-based estimate, not a direct measurement, so it won't capture unusually high or low muscle mass as accurately as [[body-fat-percentage-calculator|a body-fat percentage reading]] would. For tracking a BMI calculator with muscle mass changes over time — after a training block, say — lean mass is often the more useful number to watch than BMI itself.",
      "Lean body mass includes muscle, bone, organs, and water — everything in your body that isn't fat tissue."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "What to do with your lean mass number"
      },
      {
        "type": "p",
        "text": "The most common practical use of lean body mass is setting protein intake — sports nutrition guidance typically scales protein to lean mass rather than total body weight, since fat tissue doesn't need the same protein support muscle does:"
      },
      {
        "type": "table",
        "headers": [
          "Goal",
          "Protein per kg of lean mass"
        ],
        "rows": [
          [
            "General health",
            "1.2 – 1.6 g"
          ],
          [
            "Muscle maintenance",
            "1.6 – 2.0 g"
          ],
          [
            "Muscle building",
            "2.0 – 2.4 g"
          ]
        ]
      },
      {
        "type": "p",
        "text": "For the 65.5kg lean mass example above, that's roughly 105–130g of protein daily for general muscle-building goals — noticeably more precise than the flat 'grams per pound of bodyweight' rule most people default to."
      }
    ],
    "faq": [
      {
        "q": "What is lean body mass?",
        "a": "It's your total body weight minus fat mass — so muscle, bone, organs, and water combined. It's often used as a reference point for setting protein intake or tracking strength-training progress."
      },
      {
        "q": "How is lean body mass calculated?",
        "a": "This calculator uses the Boer formula, a widely-used estimate based on weight, height, and gender. For a more precise number, a DEXA scan or bioelectrical impedance scale measures it directly rather than estimating."
      },
      {
        "q": "How much protein should I eat based on lean body mass?",
        "a": "A common range in sports nutrition guidance is 1.6–2.4g of protein per kg of lean mass daily, depending on training goals — higher for muscle building, lower for general maintenance. This is general guidance, not individualized dietary advice."
      }
    ],
    "related": [
      "body-fat-percentage-calculator",
      "ideal-weight-calculator",
      "bmi-calculator-for-bodybuilders"
    ]
  },
  {
    "slug": "percentage-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Percentage Calculator",
    "titleHook": "Any Two Numbers, Instant %",
    "metaDescription": "Find what percentage one number is of another, or find a percentage of a number, instantly.",
    "h1": "Percentage Calculator",
    "hook": "45 is 25% of 180 — enter any two numbers to get the exact percentage.",
    "intro": "General-purpose percentage calculator — enter the part and the whole to find what percentage X is of Y, or flip it to find a percentage of a number instead.",
    "type": "form",
    "formula": "percentage-basic",
    "fields": [
      {
        "id": "part",
        "label": "Part",
        "type": "number",
        "placeholder": "45"
      },
      {
        "id": "whole",
        "label": "Whole",
        "type": "number",
        "placeholder": "180"
      }
    ],
    "explainer": [
      "Percentage is calculated as (part ÷ whole) × 100. Entering 45 and 180 tells you 45 is 25% of 180.",
      "For a sale price specifically, or a raise on a salary, the [[discount-percentage-calculator|discount]] and [[pay-raise-calculator|pay raise]] calculators below skip the mental math of figuring out which number is the 'part' and which is the 'whole'. If you need to track how a number changed over time rather than what fraction it represents, see [[percentage-increase-calculator|percentage increase]] instead."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Mental math cheat sheet"
      },
      {
        "type": "p",
        "text": "Common percentages of round numbers — useful for quick estimates without reaching for a calculator:"
      },
      {
        "type": "table",
        "headers": [
          "",
          "10%",
          "15%",
          "20%",
          "25%"
        ],
        "rows": [
          [
            "50",
            "5",
            "7.5",
            "10",
            "12.5"
          ],
          [
            "100",
            "10",
            "15",
            "20",
            "25"
          ],
          [
            "200",
            "20",
            "30",
            "40",
            "50"
          ],
          [
            "500",
            "50",
            "75",
            "100",
            "125"
          ]
        ]
      },
      {
        "type": "p",
        "text": "The fastest shortcut: 10% of any number just moves the decimal point one place left. Everything else builds from there — 20% is double the 10% figure, 5% is half of it."
      }
    ],
    "faq": [
      {
        "q": "How do I find the percentage of a number?",
        "a": "Multiply the number by the percentage, then divide by 100. To find 25% of 180: 180 × 25 ÷ 100 = 45."
      },
      {
        "q": "What percentage is X of Y?",
        "a": "Divide X by Y, then multiply by 100. Enter your two numbers above to get the exact answer instantly instead of doing the division by hand."
      },
      {
        "q": "How do I convert a percentage to a decimal?",
        "a": "Divide by 100 — 25% becomes 0.25. This is the step hiding inside every percentage formula, which is why the calculator above does it for you automatically."
      }
    ],
    "related": [
      "discount-percentage-calculator",
      "pay-raise-calculator",
      "percentage-increase-calculator",
      "percentage-difference-calculator"
    ]
  },
  {
    "slug": "discount-percentage-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Discount Percentage Calculator",
    "titleHook": "See the Sale Price Fast",
    "metaDescription": "Calculate the sale price and amount saved from an original price and a discount percentage — also works as a percent off calculator.",
    "h1": "Discount Percentage Calculator",
    "hook": "A 30% discount on $89.99 saves $27.00, landing at $62.99.",
    "intro": "Enter the original price and the discount percentage to get both the amount you save and the final price you'll actually pay.",
    "type": "form",
    "formula": "discount-percent",
    "fields": [
      {
        "id": "price",
        "label": "Original price",
        "type": "number",
        "placeholder": "89.99"
      },
      {
        "id": "discount",
        "label": "Discount (%)",
        "type": "number",
        "placeholder": "30"
      }
    ],
    "explainer": [
      "Amount saved is price × (discount ÷ 100); the sale price is what's left after subtracting that from the original price. A 30% discount on $89.99 saves $27.00, landing at $62.99 — the same math whether you think of this as a discount calculator or a percent off calculator, since both terms describe the same thing.",
      "For stacked discounts (like an extra 20% off an already-reduced price), run the sale price back through this calculator a second time — stacked percentages don't add together directly."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "How much you'd save, by price and discount"
      },
      {
        "type": "table",
        "headers": [
          "Price",
          "10% off",
          "20% off",
          "30% off",
          "50% off"
        ],
        "rows": [
          [
            "$50",
            "$5.00",
            "$10.00",
            "$15.00",
            "$25.00"
          ],
          [
            "$100",
            "$10.00",
            "$20.00",
            "$30.00",
            "$50.00"
          ],
          [
            "$200",
            "$20.00",
            "$40.00",
            "$60.00",
            "$100.00"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Savings scale linearly with price, so a 20% discount always saves twice what a 10% discount does on the same item — useful for a quick gut-check before running the exact numbers above."
      }
    ],
    "faq": [
      {
        "q": "How do I calculate a discount percentage?",
        "a": "Multiply the original price by the discount percentage, divide by 100 — that's your savings. Subtract that from the original price for the final sale price."
      },
      {
        "q": "What is percent off?",
        "a": "It's another way of saying discount — '30% off' and '30% discount' mean the same thing: you pay 70% of the original price."
      },
      {
        "q": "Can I work out the discount from the sale price instead?",
        "a": "Yes — if you know the original price and the sale price, subtract the sale price from the original, divide by the original, then multiply by 100 to get the discount percentage."
      }
    ],
    "related": [
      "percentage-calculator",
      "pay-raise-calculator",
      "tip-calculator"
    ]
  },
  {
    "slug": "pay-raise-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Pay Raise Calculator",
    "titleHook": "Is Your Raise Actually Good?",
    "metaDescription": "Calculate the percentage increase between an old salary and a new salary — also works as a salary increase calculator.",
    "h1": "Pay Raise Calculator",
    "hook": "Going from $62,000 to $68,000 is a $6,000 raise — about 9.7%, not a round number.",
    "intro": "Enter your old and new salary to see the raise as both a dollar amount and a percentage — useful for comparing offers or checking a stated raise is what it claims to be.",
    "type": "form",
    "formula": "salary-increase",
    "fields": [
      {
        "id": "oldSalary",
        "label": "Old salary",
        "type": "number",
        "placeholder": "62000"
      },
      {
        "id": "newSalary",
        "label": "New salary",
        "type": "number",
        "placeholder": "68000"
      }
    ],
    "explainer": [
      "Percentage increase is (new − old) ÷ old × 100. Going from $62,000 to $68,000 is a $6,000 raise, or about 9.7% — not a round number, which is exactly why it's worth checking rather than estimating. This works equally well as a salary increase calculator if that's the phrase you started with — same math, same result either way.",
      "This calculates gross pay, before tax — your actual take-home increase will be smaller once tax withholding adjusts. If an offer states the percentage but not the dollar amount (or vice versa), this works in reverse too."
    ],
    "caveat": "Results are gross (pre-tax) figures — your net take-home increase will be smaller once tax withholding is applied.",
    "depthBlocks": [
      {
        "type": "h2",
        "text": "What counts as a good raise, by type"
      },
      {
        "type": "table",
        "headers": [
          "Raise type",
          "Typical range"
        ],
        "rows": [
          [
            "Cost-of-living adjustment",
            "~3% (tracks inflation)"
          ],
          [
            "Standard annual merit increase",
            "3–5%"
          ],
          [
            "Promotion",
            "10–20%"
          ],
          [
            "Changing employers",
            "10–20%+"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Job-change raises tend to run highest since a new employer is competing against your current offer, not just adjusting an existing one — which is why staying long-term without negotiating can quietly fall behind market rate."
      }
    ],
    "faq": [
      {
        "q": "How do I calculate salary increase percentage?",
        "a": "Subtract your old salary from your new salary, divide by the old salary, then multiply by 100. A raise from $62,000 to $68,000 is (68,000 − 62,000) ÷ 62,000 × 100 ≈ 9.7%."
      },
      {
        "q": "What is a good raise percentage?",
        "a": "A standard annual merit increase is typically 3–5%. Promotions or role changes often bring 10–20%, and cost-of-living adjustments track inflation, usually in the low single digits. Context — your industry, performance, and how long since your last raise — matters more than a single benchmark number."
      },
      {
        "q": "Does this show my raise before or after tax?",
        "a": "Before tax (gross). Your actual take-home increase will be smaller once your employer adjusts tax withholding on the new salary — this calculator shows the raw percentage and dollar change agreed with your employer."
      }
    ],
    "related": [
      "percentage-calculator",
      "discount-percentage-calculator"
    ]
  },
  {
    "slug": "percentage-increase-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Percentage Increase Calculator",
    "titleHook": "Old to New, Exact %",
    "metaDescription": "Calculate the percentage increase between any two numbers, with the formula and a worked example.",
    "h1": "Percentage Increase Calculator",
    "hook": "Going from 50 to 65 is a 30% increase — enter any old and new value to check yours.",
    "intro": "Enter an old value and a new value to find the percentage increase between them — works for prices, measurements, scores, or any two comparable numbers.",
    "type": "form",
    "formula": "percentage-increase",
    "fields": [
      {
        "id": "oldValue",
        "label": "Old value",
        "type": "number",
        "placeholder": "50"
      },
      {
        "id": "newValue",
        "label": "New value",
        "type": "number",
        "placeholder": "65"
      }
    ],
    "explainer": [
      "Percentage increase is (new − old) ÷ old × 100. This assumes the new value is larger — for a decrease, use the [[percentage-decrease-calculator|percentage decrease calculator]] instead, since the formula's framing (and how the result reads) differs slightly.",
      "This is a directional calculation — it matters which number is 'old' and which is 'new'. For a non-directional comparison between two values, see [[percentage-difference-calculator|percentage difference]] instead."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "A gut-check for multiples"
      },
      {
        "type": "p",
        "text": "Percentage increase gets unintuitive past 100% — this table anchors the common multiples:"
      },
      {
        "type": "table",
        "headers": [
          "Change",
          "Percentage increase"
        ],
        "rows": [
          [
            "1.5× the original",
            "50%"
          ],
          [
            "Double (2×)",
            "100%"
          ],
          [
            "Triple (3×)",
            "200%"
          ],
          [
            "10× the original",
            "900%"
          ]
        ]
      },
      {
        "type": "p",
        "text": "The pattern: percentage increase is always (multiplier − 1) × 100. Doubling isn't a '200% increase' — it's a 100% increase, since you've added exactly one more of the original amount, not two."
      }
    ],
    "faq": [
      {
        "q": "How do I calculate percentage increase?",
        "a": "Subtract the old value from the new value, divide by the old value, then multiply by 100. Going from 50 to 65: (65 − 50) ÷ 50 × 100 = 30%."
      },
      {
        "q": "What is the formula for percent increase?",
        "a": "(New value − Old value) ÷ Old value × 100. The result is positive if the new value is larger, negative if it's smaller."
      },
      {
        "q": "Can percentage increase be more than 100%?",
        "a": "Yes — if a value more than doubles. Going from 10 to 25 is a 150% increase, since the value grew by more than its entire original amount."
      }
    ],
    "related": [
      "percentage-decrease-calculator",
      "percentage-change-calculator",
      "percentage-difference-calculator",
      "pay-raise-calculator"
    ]
  },
  {
    "slug": "percentage-decrease-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Percentage Decrease Calculator",
    "titleHook": "How Much Dropped",
    "metaDescription": "Calculate the percentage decrease between any two numbers, with the formula and a worked example.",
    "h1": "Percentage Decrease Calculator",
    "hook": "Dropping from 80 to 60 is a 25% decrease — enter any old and new value to check yours.",
    "intro": "Enter an old value and a new value to find the percentage decrease between them — useful for price drops, weight loss tracking, or any figure that's gone down.",
    "type": "form",
    "formula": "percentage-decrease",
    "fields": [
      {
        "id": "oldValue",
        "label": "Old value",
        "type": "number",
        "placeholder": "80"
      },
      {
        "id": "newValue",
        "label": "New value",
        "type": "number",
        "placeholder": "60"
      }
    ],
    "explainer": [
      "Percentage decrease is (old − new) ÷ old × 100. This assumes the new value is smaller — for a rise instead, use the [[percentage-increase-calculator|percentage increase calculator]].",
      "Note that percentage decrease isn't simply the negative of percentage increase in reverse — going from 100 to 80 is a 20% decrease, but going back from 80 to 100 is a 25% increase, because the base number changes."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "The mirror table"
      },
      {
        "type": "p",
        "text": "Percentage decrease approaches 100% as the value shrinks toward zero — it can never reach or exceed 100% for a positive value dropping to another positive value:"
      },
      {
        "type": "table",
        "headers": [
          "Change",
          "Percentage decrease"
        ],
        "rows": [
          [
            "Down to three-quarters",
            "25%"
          ],
          [
            "Down to half",
            "50%"
          ],
          [
            "Down to a quarter",
            "75%"
          ],
          [
            "Down to zero",
            "100%"
          ]
        ]
      },
      {
        "type": "p",
        "text": "This is the direct mirror of the increase table — but note it's not symmetric: doubling is a 100% increase, yet halving is only a 50% decrease, because the base value being measured against is different each direction."
      }
    ],
    "faq": [
      {
        "q": "How do I calculate percentage decrease?",
        "a": "Subtract the new value from the old value, divide by the old value, then multiply by 100. Dropping from 80 to 60: (80 − 60) ÷ 80 × 100 = 25%."
      },
      {
        "q": "Why isn't percentage decrease just the reverse of percentage increase?",
        "a": "Because the base number changes direction. Falling from 100 to 80 is a 20% decrease, but climbing back from 80 to 100 is a 25% increase — the percentage is always calculated against the starting value, which is different in each direction."
      },
      {
        "q": "Can percentage decrease be more than 100%?",
        "a": "Only if the new value is zero or negative. Dropping from 50 to 0 is a 100% decrease exactly; dropping below zero would exceed 100%, which only makes sense for values that can go negative, like temperature or account balance."
      }
    ],
    "related": [
      "percentage-increase-calculator",
      "percentage-change-calculator",
      "discount-percentage-calculator"
    ]
  },
  {
    "slug": "percentage-change-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Percentage Change Calculator",
    "titleHook": "Up or Down, One Tool",
    "metaDescription": "Calculate percentage change between two values automatically, whether it's an increase or a decrease.",
    "h1": "Percentage Change Calculator",
    "hook": "One calculator for both directions — it automatically labels the result as an increase or decrease.",
    "intro": "Enter an old and new value and this automatically works out whether it's an increase or decrease, and by how much — no need to pick the right calculator first.",
    "type": "form",
    "formula": "percentage-change",
    "fields": [
      {
        "id": "oldValue",
        "label": "Old value",
        "type": "number",
        "placeholder": "50"
      },
      {
        "id": "newValue",
        "label": "New value",
        "type": "number",
        "placeholder": "45"
      }
    ],
    "explainer": [
      "Percentage change uses the same formula either direction — (new − old) ÷ old × 100 — and just reports whether the result is positive (an increase) or negative (a decrease), so you don't need to pick between [[percentage-increase-calculator|increase]] and [[percentage-decrease-calculator|decrease]] calculators separately.",
      "This is still a directional measurement, tied to which value is 'old' and which is 'new' — for a comparison that doesn't care about direction, see [[percentage-difference-calculator|percentage difference]]."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Same two numbers, opposite reading"
      },
      {
        "type": "p",
        "text": "Direction always depends on which value you call 'old' — swap them and the sign flips:"
      },
      {
        "type": "table",
        "headers": [
          "Old → New",
          "Reading"
        ],
        "rows": [
          [
            "80 → 100",
            "+25% (increase)"
          ],
          [
            "100 → 80",
            "-20% (decrease)"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Same two numbers, same pair — but which one you enter as 'old' determines whether the result reads as a 25% increase or a 20% decrease. That's the core thing this calculator handles automatically."
      }
    ],
    "faq": [
      {
        "q": "What's the difference between percentage change and percentage increase?",
        "a": "Percentage increase specifically means the value went up. Percentage change is the general term that covers both directions — this calculator works out automatically whether your numbers represent an increase or a decrease."
      },
      {
        "q": "How do I calculate percentage change?",
        "a": "(New value − Old value) ÷ Old value × 100. A positive result means an increase, a negative result means a decrease."
      },
      {
        "q": "What does a negative percentage change mean?",
        "a": "It means the value went down — a -15% change is the same thing as a 15% decrease, just expressed with a sign instead of the word 'decrease'."
      }
    ],
    "related": [
      "percentage-increase-calculator",
      "percentage-decrease-calculator",
      "percentage-difference-calculator"
    ]
  },
  {
    "slug": "percentage-difference-calculator",
    "cluster": "percentage",
    "clusterLabel": "Percentage Calculators",
    "title": "Percentage Difference Calculator",
    "titleHook": "No Number Comes First",
    "metaDescription": "Calculate the percentage difference between two values — a non-directional comparison, unlike percentage change.",
    "h1": "Percentage Difference Calculator",
    "hook": "Percentage difference treats both numbers equally — it doesn't matter which one came first.",
    "intro": "Enter two values to find the percentage difference between them — this is a symmetric comparison, unlike percentage change, so it doesn't matter which number you enter first.",
    "type": "form",
    "formula": "percentage-difference",
    "fields": [
      {
        "id": "valueA",
        "label": "Value A",
        "type": "number",
        "placeholder": "40"
      },
      {
        "id": "valueB",
        "label": "Value B",
        "type": "number",
        "placeholder": "50"
      }
    ],
    "explainer": [
      "Percentage difference divides the gap between two numbers by their average, not by either one alone: |A − B| ÷ ((A + B) ÷ 2) × 100. This is what makes it symmetric — swap A and B and you get the exact same answer, unlike [[percentage-change-calculator|percentage change]].",
      "This is the right calculator when comparing two independent measurements (like two lab results, or two competing prices) where neither one is naturally the 'before' or the 'after'."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Proof it's symmetric"
      },
      {
        "type": "p",
        "text": "Swap which number goes first and the answer doesn't move — unlike percentage change, where direction matters:"
      },
      {
        "type": "table",
        "headers": [
          "A",
          "B",
          "Percentage difference"
        ],
        "rows": [
          [
            "40",
            "50",
            "22.2%"
          ],
          [
            "50",
            "40",
            "22.2%"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Compare that to percentage change on the same numbers: 40 → 50 reads as a +25% increase, while 50 → 40 reads as a -20% decrease. Percentage difference deliberately ignores that direction, which is exactly why it fits comparisons where neither number is naturally 'first'."
      }
    ],
    "faq": [
      {
        "q": "What is the difference between percentage difference and percentage change?",
        "a": "Percentage change is directional — it treats one number as the starting point and measures how far the other moved from it, so swapping the two numbers changes the answer. Percentage difference is symmetric — it compares both numbers against their average, so swapping them gives the same result either way."
      },
      {
        "q": "When should I use percentage difference instead of percentage change?",
        "a": "Use percentage difference when neither value is naturally 'before' or 'after' — like comparing two competitors' prices. Use percentage change when one value clearly came first, like tracking a price over time."
      },
      {
        "q": "Can percentage difference be negative?",
        "a": "No — percentage difference is always shown as a positive number, since it measures the size of the gap between two values, not which direction it moved. That's the direct tradeoff for it being symmetric."
      }
    ],
    "related": [
      "percentage-change-calculator",
      "percentage-increase-calculator",
      "percentage-calculator"
    ]
  },
  {
    "slug": "tip-calculator",
    "cluster": "tip",
    "clusterLabel": "Tip Calculators",
    "title": "Tip Calculator",
    "titleHook": "Tip, Split & Round Up",
    "metaDescription": "Calculate the tip and total bill instantly, split evenly across any number of people.",
    "h1": "Tip Calculator",
    "hook": "A $64 bill with a 20% tip comes to $76.80 total — $12.80 for the tip.",
    "intro": "Enter the bill, pick a tip percentage, and split across the table if you're not paying alone.",
    "type": "form",
    "formula": "tip-standard",
    "fields": [
      {
        "id": "bill",
        "label": "Bill amount",
        "type": "number",
        "placeholder": "84.50"
      },
      {
        "id": "tipPercent",
        "label": "Tip percentage",
        "type": "number",
        "placeholder": "18"
      },
      {
        "id": "people",
        "label": "Number of people",
        "type": "number",
        "placeholder": "1"
      }
    ],
    "explainer": [
      "Tip is calculated as bill × (tip percent ÷ 100). This works as a restaurant tip calculator or a general-purpose one for any service — if you're splitting the table, the total (bill + tip) is then divided evenly by the number of people, functioning as a bill splitter too. See [[tip-calculator-split-bill|the dedicated split-bill version]] if you want rounded, clean per-person amounts.",
      "18–20% is the typical range for good sit-down service in the US; 10-15% is more standard in the UK and much of Europe, where service is often already included."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Tipping norms by country"
      },
      {
        "type": "p",
        "text": "Tipping isn't universal — what's standard in the US would look strange, or even rude, elsewhere:"
      },
      {
        "type": "table",
        "headers": [
          "Country",
          "Typical restaurant tip"
        ],
        "rows": [
          [
            "United States",
            "18–22%"
          ],
          [
            "Canada",
            "15–20%"
          ],
          [
            "United Kingdom",
            "10–15% (often already included as a service charge)"
          ],
          [
            "Australia",
            "Not expected — round up if you like"
          ],
          [
            "Japan",
            "None — can be considered impolite"
          ],
          [
            "Most of Western Europe",
            "5–10% or round up, often already included"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Always check the bill for an already-added service charge before tipping on top of it — in many countries, tipping again on top of that is unusual."
      }
    ],
    "faq": [
      {
        "q": "How much should I tip?",
        "a": "15–20% is standard for sit-down restaurant service in the US, with 20% typical for good service. In the UK and much of Europe, 10% or simply rounding up is more common, since service is often already included in the bill."
      },
      {
        "q": "How do I calculate tip percentage?",
        "a": "Multiply the bill by the tip percentage, then divide by 100. An $84.50 bill with an 18% tip: 84.50 × 18 ÷ 100 = $15.21."
      },
      {
        "q": "Who should you tip, and who shouldn't you tip?",
        "a": "Sit-down restaurant servers, bartenders, hairdressers, and delivery drivers are standard in the US. Tipping is generally not expected for counter-service pickup, retail staff, or in countries where service is built into the price — it varies a lot by country and industry, so when in doubt, a quick local search for the specific service is worth it."
      },
      {
        "q": "How does a tip calculator work?",
        "a": "It multiplies your bill by a tip percentage to get the tip amount, adds that to the bill for a total, then — if you're splitting the table — divides that total evenly across however many people are paying."
      }
    ],
    "related": [
      "tip-calculator-split-bill",
      "tip-calculator-no-tax",
      "discount-percentage-calculator"
    ]
  },
  {
    "slug": "tip-calculator-split-bill",
    "cluster": "tip",
    "clusterLabel": "Tip Calculators",
    "title": "Tip Calculator — Split the Bill",
    "titleHook": "No More Hunting for Change",
    "metaDescription": "Split a restaurant bill and tip evenly across a group, with an option to round each person's share up.",
    "h1": "Tip Calculator — Split the Bill",
    "hook": "A $212 bill split five ways with a 20% tip is $50.88 per person — or round up to $51 flat.",
    "intro": "Built specifically for group dinners — enter the bill and group size, and optionally round each person's share up to a clean number, so nobody's hunting for exact change.",
    "type": "form",
    "formula": "tip-split-round",
    "fields": [
      {
        "id": "bill",
        "label": "Total bill",
        "type": "number",
        "placeholder": "212.00"
      },
      {
        "id": "tipPercent",
        "label": "Tip percentage",
        "type": "number",
        "placeholder": "20"
      },
      {
        "id": "people",
        "label": "Number of people",
        "type": "number",
        "placeholder": "5"
      },
      {
        "id": "roundUp",
        "label": "Round each share up to nearest",
        "type": "select",
        "options": [
          {
            "value": "0",
            "label": "No rounding — exact split"
          },
          {
            "value": "1",
            "label": "Nearest $1"
          },
          {
            "value": "5",
            "label": "Nearest $5"
          }
        ]
      }
    ],
    "explainer": [
      "Rounding each person's share up (rather than down) means the group slightly overpays the tip — which most servers won't mind, and it saves the group from awkward exact-change math at the table. This works as a straightforward bill splitter for any group size, not just even numbers of people.",
      "For an uneven split where people ordered very different amounts, this tool assumes an even split — for itemized splitting, each person's actual order needs to be tallied separately."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "Per-person quick reference ($100 bill, 20% tip)"
      },
      {
        "type": "p",
        "text": "For a $100 bill with a 20% tip ($120 total), here's the per-person share at common group sizes:"
      },
      {
        "type": "table",
        "headers": [
          "People",
          "Per person"
        ],
        "rows": [
          [
            "2",
            "$60.00"
          ],
          [
            "3",
            "$40.00"
          ],
          [
            "4",
            "$30.00"
          ],
          [
            "5",
            "$24.00"
          ],
          [
            "6",
            "$20.00"
          ],
          [
            "8",
            "$15.00"
          ]
        ]
      },
      {
        "type": "p",
        "text": "For any other bill amount, the same math scales proportionally — use the calculator above for your exact numbers."
      }
    ],
    "faq": [
      {
        "q": "How do you split a tip between people?",
        "a": "Add the tip to the bill for a total, then divide that total by the number of people for an even split. This calculator can also round each share up to a clean dollar amount."
      },
      {
        "q": "Should everyone pay the same amount if orders are different?",
        "a": "That's a group preference, not a rule — an even split is simplest, but if orders varied a lot, it's fairer to calculate each person's tip based on what they actually ordered."
      },
      {
        "q": "How do I use a bill splitter?",
        "a": "Enter the total bill, your tip percentage, and the number of people — the calculator adds the tip to the bill and divides the result evenly, with an option to round each share up to a clean amount."
      }
    ],
    "related": [
      "tip-calculator",
      "tip-calculator-no-tax"
    ]
  },
  {
    "slug": "tip-calculator-no-tax",
    "cluster": "tip",
    "clusterLabel": "Tip Calculators",
    "title": "Tip Calculator — Tip Before Tax",
    "titleHook": "Tip the Subtotal, Not Tax",
    "metaDescription": "Calculates tip based on the pre-tax subtotal instead of the total including sales tax — also works as a tax and tip calculator.",
    "h1": "Tip Calculator — Tip Before Tax",
    "hook": "Etiquette says tip on the subtotal, not the tax-inclusive total — this calculator does that split for you.",
    "intro": "Etiquette guides generally recommend tipping on the subtotal before sales tax, not the tax-inclusive total. This version asks for both figures and calculates the tip on the pre-tax amount only.",
    "type": "form",
    "formula": "tip-pretax",
    "fields": [
      {
        "id": "totalBill",
        "label": "Total on receipt (incl. tax)",
        "type": "number",
        "placeholder": "92.40"
      },
      {
        "id": "taxAmount",
        "label": "Sales tax amount",
        "type": "number",
        "placeholder": "7.40"
      },
      {
        "id": "tipPercent",
        "label": "Tip percentage",
        "type": "number",
        "placeholder": "20"
      }
    ],
    "explainer": [
      "The receipt's tax line is usually printed separately from the subtotal — enter that tax figure here and the tool subtracts it before applying your tip percentage. This is effectively a tax and tip calculator in one, splitting out the two figures automatically instead of leaving you to do that subtraction by hand.",
      "The difference is usually small (a percent or two of the tip amount) but it's the technically correct way to calculate a tip, since the server didn't provide the tax."
    ],
    "caveat": null,
    "depthBlocks": [
      {
        "type": "h2",
        "text": "How much does it actually matter?"
      },
      {
        "type": "p",
        "text": "At a typical 8% sales tax and a 20% tip, here's the real dollar gap between tipping on the subtotal versus the tax-inclusive total:"
      },
      {
        "type": "table",
        "headers": [
          "Pre-tax bill",
          "Tip on subtotal",
          "Tip on full total",
          "Difference"
        ],
        "rows": [
          [
            "$50",
            "$10.00",
            "$10.80",
            "$0.80"
          ],
          [
            "$100",
            "$20.00",
            "$21.60",
            "$1.60"
          ],
          [
            "$200",
            "$40.00",
            "$43.20",
            "$3.20"
          ]
        ]
      },
      {
        "type": "p",
        "text": "The gap scales with the bill — small on a casual meal, but worth the extra 10 seconds of math on a larger group dinner or a higher sales-tax state."
      }
    ],
    "faq": [
      {
        "q": "Should tip calculation include tax?",
        "a": "Most etiquette guides say no — tip on the pre-tax subtotal, since the server or business didn't provide the tax. In practice, plenty of people tip on the full total anyway, and it's not considered rude either way."
      },
      {
        "q": "Should you tip before or after tax?",
        "a": "Before — on the subtotal, technically. The gap is usually just a percent or two of the tip amount, so it's a minor correction rather than a big difference."
      },
      {
        "q": "How do I calculate tax and tip separately?",
        "a": "Subtract the tax amount (shown separately on most receipts) from the total to get the subtotal, then calculate your tip percentage from that subtotal rather than the tax-inclusive total."
      }
    ],
    "related": [
      "tip-calculator",
      "tip-calculator-split-bill"
    ]
  },
  {
    "slug": "age-calculator-school",
    "title": "Age Calculator School",
    "titleHook": "Exact Grade Eligibility",
    "hook": "A child born on September 15, 2018, is exactly 5 years, 11 months, and 17 days old on the typical September 1 kindergarten cutoff date of 2024.",
    "type": "form",
    "formula": "age-calculator",
    "h1": "Age Calculator School",
    "metaDescription": "Determine exact school placement, grade eligibility, and milestone ages instantly using precise calendar math.",
    "intro": "Determine exact school placement, grade eligibility, and milestone ages instantly using precise calendar math.",
    "explainer": [
      "This age calculator for school determines a student's exact age in years, months, and days based on a specified cutoff date—typically the state or district deadline for kindergarten or grade-level enrollment. By comparing a child's birth date against this administrative threshold, the tool eliminates manual counting errors and confirms whether a student meets the legal age requirement for a specific grade level.",
      "Beyond initial enrollment, the tool calculates age progressions for grade transitions, athletic eligibility brackets, and graduation year projections. It accounts for varying month lengths and leap years automatically, ensuring the resulting age matches official school district verification standards."
    ],
    "caveat": "School district policies regarding cutoff dates vary by state and country, so always verify local administrative guidelines before submitting enrollment paperwork.",
    "faq": [
      {
        "q": "How do school districts determine kindergarten eligibility?",
        "a": "Most school districts require a child to turn five years old by a specific cutoff date, such as September 1 or September 30 of the academic year. This calculator lets you input that exact district deadline to verify eligibility."
      },
      {
        "q": "Does this tool account for leap years?",
        "a": "Yes, the calculation engine uses standard calendar dates, factoring in leap years to calculate the exact number of days between the birth date and the target school year start date."
      },
      {
        "q": "Can I use this for high school graduation age projections?",
        "a": "Yes, by setting the target date to future calendar years, you can project the student's exact age at the start of each grade through high school graduation."
      }
    ],
    "related": [],
    "fields": [
      {
        "id": "birthYear",
        "label": "Birth year",
        "placeholder": "1990"
      },
      {
        "id": "birthMonth",
        "label": "Birth month",
        "placeholder": "6"
      },
      {
        "id": "birthDay",
        "label": "Birth day",
        "placeholder": "15"
      }
    ]
  },
  {
    "slug": "age-calculator-softball",
    "title": "Age Calculator Softball",
    "titleHook": "Softball Age Checker",
    "hook": "A player born on May 12, 2010, is exactly 14 years, 3 months, and 15 days old as of August 27, 2024.",
    "type": "form",
    "formula": "age-calculator",
    "h1": "Age Calculator Softball",
    "metaDescription": "Determine a player's exact age in years, months, and days for roster eligibility verification.",
    "intro": "Determine a player's exact age in years, months, and days for roster eligibility verification.",
    "explainer": [
      "Youth and adult softball leagues enforce strict age cut-offs to ensure fair competition and compliance with governing bodies like USA Softball or Little League. Using an age calculator for softball allows coaches, league administrators, and parents to verify birthdates against specific seasonal deadlines with precision, eliminating manual calculation errors.",
      "To use the tool, input the player's exact date of birth and select the league's designated reference date—often January 1st of the current year or the first day of the tournament. The output displays the precise age breakdown required for division placement, tournament brackets, and insurance documentation."
    ],
    "caveat": "Always cross-reference the calculated age with the specific rulebook of your governing body, as cut-off dates vary by league type and tournament tier.",
    "faq": [
      {
        "q": "How do softball leagues determine age eligibility?",
        "a": "Leagues typically use a specific calendar date—such as January 1st or August 31st—as the reference point to establish a player's age for the entire upcoming season."
      },
      {
        "q": "What documents are needed to verify a player's age?",
        "a": "Official roster verification generally requires a state-issued birth certificate, passport, or adoption papers that match the birthdate entered into the eligibility system."
      },
      {
        "q": "Do travel ball teams use different age cut-offs than recreational leagues?",
        "a": "Yes, travel organizations often group players by birth year (e.g., 14U based on turning 14 during the calendar year), whereas recreational leagues frequently use school grade or age-as-of-date thresholds."
      }
    ],
    "related": [],
    "fields": [
      {
        "id": "birthYear",
        "label": "Birth year",
        "placeholder": "1990"
      },
      {
        "id": "birthMonth",
        "label": "Birth month",
        "placeholder": "6"
      },
      {
        "id": "birthDay",
        "label": "Birth day",
        "placeholder": "15"
      }
    ]
  },
  {
    "slug": "age-calculator-usssa-softball",
    "title": "Age Calculator Usssa Softball",
    "titleHook": "USSSA Age Cutoff Checker",
    "hook": "**A player born on May 14, 2012, turns 12 by December 31, 2024, placing them in the 12U division.**",
    "type": "form",
    "formula": "age-calculator",
    "h1": "Age Calculator Usssa Softball",
    "metaDescription": "Determine a player's official division eligibility by calculating their exact age as of December 31.",
    "intro": "Determine a player's official division eligibility by calculating their exact age as of December 31.",
    "explainer": [
      "USSSA softball uses a strict age-determination date to classify players for league and tournament play. This age calculator for usssa softball subtracts the player's birth date from December 31 of the current playing year, establishing the exact age bracket they must compete in for the entire season regardless of when their birthday falls during the calendar year.",
      "Tournaments and state championships strictly enforce these cutoffs to maintain competitive fairness across divisions ranging from 8U to 18U. Entering the correct birth date prevents roster disqualifications and ensures compliance with official governing body regulations."
    ],
    "caveat": "Always verify official tournament rulebooks, as specific local leagues may enforce distinct formatting requirements or additional documentation for proof of age.",
    "faq": [
      {
        "q": "What is the age cutoff date for USSSA softball?",
        "a": "USSSA determines player age eligibility as of December 31 of the current calendar year. For example, a player turning 12 on December 15 plays in the 12U division for the entire year, even though they are 11 for most of the season."
      },
      {
        "q": "How do I know which division my child belongs in?",
        "a": "Match the age calculated as of December 31 to the corresponding division limit. If the player turns 10 or younger during the calendar year, they qualify for the 10U division; if they turn 11 during the year, they move to 12U."
      },
      {
        "q": "Does this calculator account for leap years?",
        "a": "Yes, the calculation accounts for leap years to determine the exact number of days and precise age classification required by tournament officials."
      }
    ],
    "related": [],
    "fields": [
      {
        "id": "birthYear",
        "label": "Birth year",
        "placeholder": "1990"
      },
      {
        "id": "birthMonth",
        "label": "Birth month",
        "placeholder": "6"
      },
      {
        "id": "birthDay",
        "label": "Birth day",
        "placeholder": "15"
      }
    ]
  }
];

if (typeof module !== "undefined") { module.exports = calculatorsData; }
