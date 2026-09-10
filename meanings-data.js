/* Quiklee — meanings data */
const meaningsData = [
  {
    slug: "lol-meaning-texting-vs-slack",
    cluster: "internet-terms",
    clusterLabel: "Meanings",
    title: "LOL Meaning — Texting vs. Slack/Work Chat",
    metaDescription: "What LOL means in casual texting versus professional chat like Slack, where its tone shifts.",
    h1: "LOL Meaning — Texting vs. Work Chat",
    intro: "LOL stands for 'laughing out loud' — but what it signals changes a lot depending on where you see it.",
    type: "info",
    content: [
      { type: "h2", text: "In texting or DMs" },
      { type: "p", text: "Usually means genuine amusement, though often mild — most people don't literally laugh out loud when they type it. \"lol yeah that's fair\" is closer to a verbal shrug-smile than an actual laugh." },
      { type: "h2", text: "In Slack or work chat" },
      { type: "p", text: "Tends to soften a message rather than express amusement. \"can you resend that file lol\" isn't about anything funny — the LOL takes the edge off what could otherwise read as a blunt or annoyed request." },
      { type: "h2", text: "Common variants" },
      { type: "table", headers: ["Variant", "Typical meaning"], rows: [
        ["lol", "Mild amusement or softening a message"],
        ["LOL", "Same, but capitalized for more emphasis"],
        ["lolol / lololol", "Exaggerated for comic effect, often ironic"],
        ["lol.", "The period can read as flat or sarcastic, not genuinely amused"]
      ]}
    ],
    caveat: null,
    related: ["iykyk-meaning", "fyi-meaning"]
  },
  {
    slug: "iykyk-meaning",
    cluster: "internet-terms",
    clusterLabel: "Meanings",
    title: "IYKYK Meaning",
    metaDescription: "What IYKYK stands for and how it's used, with real usage examples.",
    h1: "IYKYK Meaning",
    intro: "IYKYK stands for \"if you know, you know\" — used to reference something only a specific group will fully get, without explaining it to everyone else.",
    type: "info",
    content: [
      { type: "p", text: "It signals an inside reference on purpose — the point is exclusivity, not confusion. Explaining the joke afterward usually defeats the purpose." },
      { type: "h2", text: "Example uses" },
      { type: "steps", items: [
        "Caption on a photo from a niche event: \"best night ever, iykyk\" — referring to something only attendees would recognize.",
        "Comment on a regional food photo: \"iykyk\" — implying the dish is a local secret outsiders wouldn't know to order.",
        "Reply to an old inside joke resurfacing: \"iykyk 😭\" — acknowledging shared history without re-explaining it."
      ]},
      { type: "p", text: "It's most common as a caption or comment rather than mid-sentence, and pairs naturally with an emoji rather than punctuation." }
    ],
    caveat: null,
    related: ["lol-meaning-texting-vs-slack", "fyi-meaning"]
  },
  {
    slug: "gpt-meaning",
    cluster: "tech-terms",
    clusterLabel: "Meanings",
    title: "GPT Meaning",
    metaDescription: "What GPT stands for in AI, and what it actually refers to technically.",
    h1: "GPT Meaning",
    intro: "GPT stands for Generative Pre-trained Transformer — the architecture behind models like ChatGPT.",
    type: "info",
    content: [
      { type: "p", text: "Breaking down the three words: 'Generative' means it produces new text rather than just classifying or retrieving existing text. 'Pre-trained' means it was trained on a large body of text before being fine-tuned for a specific use. 'Transformer' is the specific neural network architecture (introduced in a 2017 paper) that made this style of language model possible." },
      { type: "h2", text: "Outside AI" },
      { type: "p", text: "GPT is also an older, unrelated acronym for 'GUID Partition Table,' a disk partitioning standard used by computers to organize hard drive storage — completely different field, same three letters." },
      { type: "p", text: "In everyday conversation now, 'GPT' almost always refers to the AI model family rather than the disk format, given how much more common the AI usage has become." }
    ],
    caveat: null,
    related: ["nft-meaning-for-beginners"]
  },
  {
    slug: "nft-meaning-for-beginners",
    cluster: "tech-terms",
    clusterLabel: "Meanings",
    title: "NFT Meaning for Beginners",
    metaDescription: "A jargon-free explanation of what NFT stands for and what it actually is.",
    h1: "NFT Meaning for Beginners",
    intro: "NFT stands for Non-Fungible Token — a way of recording on a blockchain that one specific person owns one specific digital item.",
    type: "info",
    content: [
      { type: "p", text: "\"Fungible\" means interchangeable — one dollar bill is worth exactly the same as any other dollar bill. \"Non-fungible\" means the opposite: each one is unique and not interchangeable with another, the way an original painting isn't interchangeable with a print of it." },
      { type: "p", text: "An NFT doesn't usually contain the actual image or file — it's a record on a blockchain (a shared, tamper-resistant public ledger) that points to a file and says who currently owns that specific token." },
      { type: "h2", text: "What people actually use them for" },
      { type: "p", text: "Mostly digital art and collectibles, but also event tickets, in-game items, and proof of membership — anything where 'exactly one specific instance of this exists, and here's who owns it' is the useful part." }
    ],
    caveat: null,
    related: ["gpt-meaning"]
  },
  {
    slug: "fyi-meaning",
    cluster: "acronyms",
    clusterLabel: "Meanings",
    title: "FYI Meaning",
    metaDescription: "What FYI stands for and how it's typically used in messages and email.",
    h1: "FYI Meaning",
    intro: "FYI stands for \"for your information\" — used to flag something the recipient should know, without requiring them to act on it.",
    type: "info",
    content: [
      { type: "p", text: "It signals \"no response needed\" more than most other acronyms — using FYI at the start of a message tells the reader upfront that this is background information, not a request." },
      { type: "h2", text: "Example" },
      { type: "p", text: "\"FYI, the meeting moved to 3pm\" — informs without asking anything of the reader, unlike \"can we move the meeting to 3pm?\" which needs a reply." }
    ],
    caveat: null,
    related: ["lol-meaning-texting-vs-slack", "iykyk-meaning"]
  }
];

if (typeof module !== "undefined") { module.exports = meaningsData; }
