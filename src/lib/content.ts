// Gut Check content library.
// The product is the questions. This file is the single source of truth for
// every question, tip, example, module, and reality-check risk. The UI renders
// from this data, so editing copy never touches component code.
// Mirrors workspaces/prd-builder/docs/question-set-and-risk-library.md.

export const NAME = "Gut Check";
export const TAGLINE = "Stress-test your idea before you build it.";
export const TOP_RISKS = 4;

export type Field = {
  q: string;
  tip: string;
  eg: string;
  input?: "text" | "textarea";
  optional?: boolean;
};

export type Risk = { h: string; t: string };

export const PRODUCT_TYPES = [
  "General",
  "AI chatbot",
  "Marketplace",
  "SaaS",
  "Financial",
  "Social",
  "Browser extension",
  "Content",
  "Productivity",
  "Educational",
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export const FIELDS: Record<string, Field> = {
  // Section 1 - The one-pager (spine)
  name: { q: "What is the working name?", tip: "A working name is fine. You can rename it later.", eg: "FridgePilot", input: "text" },
  oneliner: { q: "In one sentence, what is it?", tip: "If you cannot say it in one sentence, you do not understand it yet. This line becomes your pitch and your landing-page headline.", eg: "A mobile app that helps busy home cooks decide what to make for dinner from a photo of their fridge." },
  who: { q: "Who is it for? Be specific.", tip: "“Everyone” means no one. The narrower the person, the sharper every later decision.", eg: "Home cooks 25 to 40 who shop without a plan and freeze up at 6pm. Not chefs, not meal-preppers." },
  problem: { q: "What problem does it solve, and what do they do today?", tip: "What they do today is your real competitor. “Nothing” is a warning sign, not a green light.", eg: "The 6pm what-is-for-dinner stall. Today they scroll recipe apps and order takeout." },
  whynow: { q: "Why this, and why now?", tip: "Strong ideas have a reason they could not have worked two years ago, and a reason to act this year.", eg: "Cheap phone vision models can now name ingredients from one photo. Grocery prices are up." },
  success: { q: "What does success look like? One or two plain numbers.", tip: "If you cannot name the number, you will explain away bad results later. Pick something measurable in weeks.", eg: "200 people use it twice in week one, 30 percent return the next week. Not downloads." },
  mvp: { q: "What is the simplest first version?", tip: "The smallest thing that proves the core idea. If you cannot ship it in a few weeks, it is two ideas wearing a trench coat.", eg: "Photo in, three recipes out. No accounts, no history." },
  notv1: { q: "What is explicitly NOT in version one?", tip: "Naming what you skip protects your scope from the tempting extras that turn a 3-week build into a 3-month one.", eg: "No meal calendar, no grocery delivery, no Android at launch." },
  risk: { q: "Biggest risk, the one thing that sinks this if it is wrong?", tip: "Better written down than pretended away. This feeds your reality check, and it is usually the thing to test first.", eg: "That ingredient recognition is accurate enough to trust." },

  // Section 2 - The users
  primaryuser: { q: "Who is your primary user, and what does a normal day look like?", tip: "People do not want software. They want an outcome.", eg: "A working parent who gets home tired and feeds the family from whatever is in the fridge." },
  goal: { q: "What are they actually trying to accomplish?", tip: "The outcome, not the feature.", eg: "Get a good-enough dinner on the table fast, without another grocery run." },
  workaround: { q: "How do they handle this today?", tip: "Email, a spreadsheet, a competitor, or nothing? “Nothing” is a flag.", eg: "Googling recipes with chicken and rice, or defaulting to takeout." },
  secondary: { q: "Any secondary users?", tip: "Admins, approvers, viewers, partners.", eg: "None for v1.", optional: true },
  story: { q: "Walk through one real moment.", tip: "One paragraph often does more than a feature list.", eg: "Maria gets home at 6, snaps a photo, gets three recipes, and is cooking in two minutes.", optional: true },

  // Section 3 - What it needs to do
  musthave: { q: "Must have: what can v1 not ship without? (one per line)", tip: "If this list is over 5 to 7, a v2 is hiding in your v1.", eg: "As a user, I can photograph my fridge and get 3 cookable recipes." },
  shouldhave: { q: "Should have: important, but v1 survives without it.", tip: "Real, but not launch-blocking.", eg: "Filter by cuisine. Save a recipe." },
  later: { q: "Later / nice to have: parked on purpose.", tip: "Park them so they stop haunting your scope.", eg: "Shopping list for missing items. A meal calendar." },
  outofscope: { q: "Out of scope: deliberately not building.", tip: "Saying no on purpose is a feature.", eg: "Grocery delivery. A social feed. Calorie tracking." },

  // Section 4 - How it should feel and work
  flow: { q: "Walk the main path, start to finish. (numbered steps)", tip: "The happy path in plain steps.", eg: "1. Open app. 2. Snap photo. 3. Confirm ingredients. 4. See 3 recipes. 5. Cook." },
  feel: { q: "Look and feel: three or four words for the vibe.", tip: "Reference a product you admire. Linear, not SAP.", eg: "Warm, fast, effortless, a little playful." },
  platform: { q: "Must work on what? Phone, desktop, offline?", tip: "Pick what matters, ignore the rest.", eg: "iPhone first. Must work one-handed in a kitchen." },
  connect: { q: "Anything it must connect to? (Unconfirmed is fine)", tip: "Payment, a database, an inbox, an API.", eg: "A vision model API. Unconfirmed: recipe database vs generated." },

  // Section 5 - Success and measurement
  signs: { q: "Other supporting signs it is working?", tip: "The quieter signals that back up your main success number.", eg: "Repeat photos per user. Recipes saved." },
  notworking: { q: "What would tell you it is NOT working?", tip: "Name the warning signs before the data comes in.", eg: "Users take one photo and never return." },
  checkwhen: { q: "How and when will you check, honestly?", tip: "Name a real moment to review.", eg: "After 50 users and 2 weeks." },

  // AI chatbot module
  a_can: { q: "What can the model actually do, and what can it not do yet?", tip: "Founders promise magic and ship disappointment. Naming the edges now sets honest scope.", eg: "It can name common ingredients from a clear photo and match recipes. It cannot read expiry dates or see inside closed containers." },
  a_wrong: { q: "What happens when it gets it wrong?", tip: "It will get things wrong, guaranteed. The product is defined by how gracefully it fails, not by its best-case demo.", eg: "Show detected ingredients as editable chips before suggesting anything, so a mistake is a one-tap fix." },
  a_eval: { q: "How will you know it is good enough? (your eval)", tip: "“It feels good” is not a bar. Decide the test that says it is ready before real users hit the rough edges.", eg: "Collect 50 real fridge photos, label them by hand, require correct top-5 ingredients in 8 of 10 before launch." },
  a_cost: { q: "What does each use cost you, and does the math work?", tip: "With AI, every tap can cost real money. A free tool that costs you per use and never converts is a slow leak.", eg: "Each photo is about 1 cent. At 1,000 daily users doing 2 photos, roughly $600 a month. Free tier capped at 5 a day." },
  a_harm: { q: "Where could it give harmful or embarrassing advice?", tip: "Even a friendly tool has failure modes that matter. Decide your lines before a bad screenshot goes around.", eg: "Caveat that it does not detect allergens or spoilage, and never build a recipe around an unsure ingredient." },

  // Marketplace module
  m_sides: { q: "Supply or demand, which side is harder to get?", tip: "Marketplaces die from an empty side, not a missing feature. Know which one is the bottleneck.", eg: "Supply. Getting enough quality listings in a city before buyers show up and bounce." },
  m_take: { q: "How do you make money, and how much per transaction?", tip: "Decide the take rate now. Too high and a side leaves, too low and you never cover costs.", eg: "15 percent on each booking, charged to the supply side." },
  m_trust: { q: "What makes two strangers trust each other enough to transact?", tip: "Trust and safety is the product in a marketplace, not a nice-to-have.", eg: "Verified profiles, reviews both ways, and payment held until the job is done." },
  m_discovery: { q: "How does someone find the right match fast?", tip: "Listings nobody can find are the same as no listings.", eg: "Search by location and category, with a few curated picks on the home screen." },
  m_coldstart: { q: "Which side do you seed first, and how?", tip: "The classic chicken-and-egg. Name the side you will hand-build before launch.", eg: "Seed supply by personally onboarding 50 providers in one neighborhood before opening to buyers." },

  // SaaS module
  s_pricing: { q: "How do you charge, and per what? Seat, usage, or flat?", tip: "Your pricing model shapes who buys and how you grow. Decide the unit before you argue about the number.", eg: "$5 a month flat, unlimited use. Single-user, so no per-seat pricing." },
  s_activation: { q: "What is the first real moment of value, and how fast can a new user reach it?", tip: "If people do not feel value in the first session, no feature list saves you. Time-to-value is the metric.", eg: "The first recipe cooked from a fridge photo, in under two minutes from sign-up." },
  s_buyer: { q: "Who approves the purchase, and are they the same person who uses it?", tip: "In SaaS the buyer and the user are often different people who need different things. Know both.", eg: "Same person for the consumer app. For a future family plan, one household lead pays for everyone." },
  s_retention: { q: "Why would they still be paying in six months?", tip: "New SaaS lives or dies on retention, not signups. Name the reason the habit sticks.", eg: "It saves a real decision every weeknight, and saved recipes plus history make switching annoying." },
  s_integrations: { q: "What must it plug into to fit their existing workflow?", tip: "Software that does not fit the tools people already use gets abandoned, however good it is.", eg: "The phone camera roll and a grocery app. Calendar sync later." },

  // Financial module
  f_money: { q: "Whose money moves, and where does it sit at each step?", tip: "In anything touching money, the flow of funds is the product. Map every hop before you build.", eg: "User card to a payment processor to the merchant, settled next day. You never hold balances in v1." },
  f_compliance: { q: "What rules apply, and have you confirmed them? (KYC, licensing, PCI)", tip: "Financial products carry legal weight consumer apps do not. Naming the rules now avoids a rebuild or a shutdown later.", eg: "Payments run through a licensed processor so you inherit PCI scope. Unconfirmed: whether holding funds triggers money-transmitter licensing." },
  f_trust: { q: "Why would a stranger trust you with their money or data?", tip: "Trust is the whole funnel in fintech. One scare and they are gone for good.", eg: "Bank-grade encryption, a recognized processor on the checkout, and clear refund terms shown up front." },
  f_unit: { q: "What does each transaction cost you, and what is your cut?", tip: "Thin margins and processor fees can eat a fintech alive. Know the take and the cost per transaction.", eg: "2.9 percent plus 30 cents to the processor. Your margin is a 1 percent platform fee on top." },
  f_failure: { q: "What happens when a payment fails, disputes, or is fraudulent?", tip: "Edge cases are not edge cases with money, they are daily. Decide how failures and chargebacks are handled.", eg: "Auto-retry once, clear failure messaging, and a manual review queue for disputes and flagged transactions." },

  // Social module
  so_single: { q: "Single-player value: is it useful for the very first user, before anyone else shows up?", tip: "The empty-room problem kills most social apps. If it is worthless until populated, person one has no reason to stay.", eg: "A solo cook can save and organize their own recipes from day one, so it is useful before any friends join." },
  so_loop: { q: "What brings people back, and what makes them invite others?", tip: "A social product without a loop is a ghost town. Name the habit and the share trigger.", eg: "A weekly what-did-you-cook prompt brings them back, and sharing a recipe card pulls friends in." },
  so_seed: { q: "How do you fill the empty room at launch?", tip: "Nobody joins an empty party. Decide how you seed early activity before opening the doors.", eg: "Seed 200 recipes and run month one as an invite-only group of 50 active cooks." },
  so_mod: { q: "What happens the first time someone posts something awful?", tip: "Moderation is not a v2 feature. The first bad post sets the tone of the whole community.", eg: "A report button, a small human review queue, and clear rules pinned from day one." },
  so_density: { q: "How few users in one place still feels alive?", tip: "Social products work locally before globally. Critical mass in one niche beats thin coverage everywhere.", eg: "One city or one cuisine community that feels busy, not a global app that feels dead." },

  // Browser extension module
  x_platform: { q: "Which platform are you a guest on, and what happens if it changes the rules or builds your feature?", tip: "Extensions live on rented land. Name your landlord and your exposure before you build a business on it.", eg: "A Chrome extension. Risk: Google tightens manifest rules, or ships a native version of this." },
  x_discovery: { q: "How do people find it, the store or you?", tip: "Store search is brutal. If you cannot drive your own installs, the store will not save you.", eg: "Mostly direct from a landing page and demos, not store search." },
  x_permissions: { q: "What permissions does it need, and will that scare people off?", tip: "Every scary permission prompt costs installs. Ask for the minimum and explain why.", eg: "Read-only access to the current tab. No browsing history, and the prompt says so plainly." },
  x_value: { q: "What is the in-page job it does that a standalone app could not?", tip: "If it does not need to live in the browser, it should not be an extension. Name the in-context magic.", eg: "It reads the recipe on whatever page you are on and reformats it to your fridge, in place." },
  x_lockin: { q: "If the platform killed extensions tomorrow, what would you have left?", tip: "Plan your escape hatch now. The best extensions are a wedge into something you own.", eg: "An email list and a web app the extension feeds, so the audience survives the platform." },

  // Content module
  c_distribution: { q: "How does anyone find this without you paying for every single user?", tip: "For content, distribution is the product. A great post nobody sees is a diary entry.", eg: "SEO on long-tail recipe queries plus a weekly newsletter, not paid ads." },
  c_supply: { q: "Who makes the content, you or them, and does the well run dry?", tip: "Content businesses starve when the source dries up. Name the engine that keeps it fed.", eg: "AI drafts recipes from trending ingredients, a human edits, so supply scales without burning me out." },
  c_format: { q: "What is the one format you win at?", tip: "Trying every channel at once means winning none. Pick the format and own it.", eg: "Short recipe cards built for saving and sharing, not long blog posts." },
  c_money: { q: "How does content turn into money, and at what scale does that work?", tip: "Audience is not revenue. Name the path from eyeballs to dollars and the size it needs.", eg: "Free recipes drive a $5 a month premium tier. Needs roughly 2,000 paying subscribers to matter." },
  c_moat: { q: "What stops someone copying your content the day after you post it?", tip: "Content is easy to clone. Your moat is voice, audience, or speed, not the words themselves.", eg: "A trusted voice and a loyal email list a copycat cannot lift." },

  // Productivity module
  p_switch: { q: "What is the switching cost from what they use now, and why is it worth it?", tip: "People do not leave a tool they have set up unless staying hurts. Name what they give up.", eg: "They leave a messy notes app and a scattered camera roll. The cost is re-entering a few favorite recipes." },
  p_wedge: { q: "What is the one thing yours does that the incumbent cannot?", tip: "Beating Notion or a spreadsheet at its own game is a losing fight. Win on one sharp wedge.", eg: "It builds dinner from what you physically have, which a blank doc never will." },
  p_blank: { q: "How do you get past the blank-canvas problem on first use?", tip: "Flexible tools intimidate new users. Give them a running start, not an empty page.", eg: "Open to a sample fridge and three recipes, not an empty screen." },
  p_habit: { q: "What makes it a daily or weekly habit, not a tool they forget?", tip: "Productivity tools die from neglect, not competition. Name the recurring trigger.", eg: "The 6pm dinner decision is a daily trigger that pulls them back without a notification." },
  p_data: { q: "What happens to their data if they leave, and does that build or break trust?", tip: "Lock-in by hostage rarely works. Easy export can paradoxically increase trust and retention.", eg: "One-tap export of all saved recipes to markdown, so they trust putting data in." },

  // Educational module
  e_payer: { q: "Who actually pays, the learner, a parent, or a school?", tip: "In education the user and the buyer are often different, with different motives. Serve the payer without losing the learner.", eg: "The home cook learns and the home cook pays. No parent or institution in the loop for v1." },
  e_outcome: { q: "Are you measuring time-in-app or actual learning?", tip: "Engagement metrics flatter edtech and hide whether anyone learned anything. Decide the real outcome.", eg: "Can they cook three new dishes from memory after a month, not minutes spent in the app." },
  e_motivation: { q: "What keeps a learner going after the motivation honeymoon ends?", tip: "Most learners quit. Streaks, wins, and stakes matter more than content quality.", eg: "Small weekly wins, a visible skill tree, and a real dinner on the table as the reward." },
  e_credibility: { q: "Why should anyone trust your content is correct and worth their time?", tip: "Bad educational content is worse than none. Name the source of authority.", eg: "Recipes tested by a real chef, with sources, not AI guesses presented as fact." },
  e_completion: { q: "What does done look like, and what share of people get there?", tip: "Completion rates in online learning are brutally low. Design for the dropout, not the ideal student.", eg: "Most will not finish a full course, so each single lesson must stand alone and be useful." },
};

export const MODULES: Partial<Record<ProductType, string[]>> = {
  "AI chatbot": ["a_can", "a_wrong", "a_eval", "a_cost", "a_harm"],
  Marketplace: ["m_sides", "m_take", "m_trust", "m_discovery", "m_coldstart"],
  SaaS: ["s_pricing", "s_activation", "s_buyer", "s_retention", "s_integrations"],
  Financial: ["f_money", "f_compliance", "f_trust", "f_unit", "f_failure"],
  Social: ["so_single", "so_loop", "so_seed", "so_mod", "so_density"],
  "Browser extension": ["x_platform", "x_discovery", "x_permissions", "x_value", "x_lockin"],
  Content: ["c_distribution", "c_supply", "c_format", "c_money", "c_moat"],
  Productivity: ["p_switch", "p_wedge", "p_blank", "p_habit", "p_data"],
  Educational: ["e_payer", "e_outcome", "e_motivation", "e_credibility", "e_completion"],
};

export const TYPE_RISKS: Partial<Record<ProductType, Risk[]>> = {
  "AI chatbot": [
    { h: "The accuracy trust cliff", t: "Your product rests on the model being right often enough. One bad answer early and the user is gone. Run your eval set of 50 real inputs this week before writing more code." },
    { h: "Cost per use vs willingness to pay", t: "Every interaction costs you money. If usage grows faster than revenue, success is what bankrupts you. Work out cost per active user at three usage levels and confirm a price people would pay covers it." },
    { h: "“ChatGPT already does this”", t: "If a user gets 80 percent of your value by pasting into ChatGPT for free, why install your app? Do your core task in ChatGPT yourself this week and write down exactly what is better in yours." },
    { h: "Messy real-world input", t: "Real inputs are never as clean as your demo. Gather 20 deliberately messy real inputs and see how it holds up." },
  ],
  Marketplace: [
    { h: "The cold-start problem", t: "An empty marketplace is a ghost town, and ghost towns do not fill themselves. Pick one side and one niche and hand-recruit 25 of them this week. If you cannot, the model is the risk." },
    { h: "Take rate vs value added", t: "If your cut is bigger than the value you add, both sides will route around you. Ask five people on each side what they would actually pay you to handle, and compare to your planned take rate." },
  ],
  SaaS: [
    { h: "Signups are not the business", t: "It is easy to win free signups and starve on paid retention. Track week-4 retention from day one, not installs, and treat it as the number that matters." },
    { h: "The activation cliff", t: "Most users decide in the first session. If time-to-value is slow, the funnel leaks before anyone pays. Time your own first-value moment and cut every step before it." },
  ],
  Financial: [
    { h: "Regulatory surface", t: "Touching money invites rules that can stop you cold. Confirm licensing and compliance scope with a real expert before you scale, not after the first complaint." },
    { h: "Trust is the funnel", t: "In fintech a single security scare ends the relationship for good. Decide your trust signals and your incident plan before launch, not during the first one." },
  ],
  Social: [
    { h: "The empty room", t: "A social app with nobody in it is a lonely UI. Prove single-player value and seed one dense niche before you scale, or the cold-start spiral kills you." },
    { h: "Moderation debt", t: "The first awful post will come, and it will define you. Decide your rules and review process before launch, not after a screenshot goes around." },
  ],
  "Browser extension": [
    { h: "Building on rented land", t: "The platform can deprecate, reject, or clone you overnight. Confirm your store-policy exposure and build an owned channel, like email or a web app, from day one." },
    { h: "The store discovery trap", t: "Most extensions die unseen in store search. If you have no plan to drive your own installs, that is the whole risk." },
  ],
  Content: [
    { h: "Distribution is the product", t: "Great content nobody sees is a diary. If you have no repeatable, unpaid way to be found, that is the business risk, not the content quality." },
    { h: "The content treadmill", t: "Audiences forget you the week you stop posting. Make sure your supply engine can run for a year before you bet on it." },
  ],
  Productivity: [
    { h: "Better is not enough", t: "Nobody switches tools for 10 percent better. If you cannot name a 10x wedge or a real switching trigger, the incumbent wins by default." },
    { h: "The blank-canvas cliff", t: "Flexible tools lose new users in the first session. If first-run is an empty page, that is your retention problem in disguise." },
  ],
  Educational: [
    { h: "Engagement is not learning", t: "Time-in-app flatters edtech and hides whether anyone got better. Pick an outcome metric you would stake the product on, and measure it early." },
    { h: "The completion cliff", t: "Most learners quit in the first week. If your value only lands at the finish line, almost no one will feel it. Make lesson one worth it on its own." },
  ],
};

// Keyword detection for the product-type picker (no AI). First match wins,
// in PRODUCT_TYPES order. General is the fallback.
export const DETECT: Partial<Record<ProductType, string[]>> = {
  "AI chatbot": ["ai ", " ai", "chatbot", "gpt", "llm", "machine learning", "assistant", "agent", "copilot"],
  Marketplace: ["marketplace", "buyers and sellers", "two-sided", "two sided", "listings", "vendors", "gig"],
  Financial: ["payment", "fintech", "banking", "invoice", "wallet", "crypto", "lending", "payroll", "budgeting"],
  Social: ["social", "community", "network", "feed", "followers", "friends"],
  "Browser extension": ["extension", "chrome", "browser plugin", "add-on", "addon"],
  Content: ["newsletter", "blog", "creator", "podcast", "media site"],
  Productivity: ["productivity", "notion", "to-do", "todo", "tasks", "tracker", "organize"],
  Educational: ["learn", "education", "course", "teach", "tutor", "students", "lesson", "edtech"],
  SaaS: ["saas", "subscription", "dashboard", "b2b", "workflow"],
};

export const SPINE_SECTIONS: { sec: string; rows: string[][] }[] = [
  { sec: "Section 1 · The one-pager", rows: [["name", "oneliner", "who"], ["problem", "whynow", "success"], ["mvp", "notv1", "risk"]] },
  { sec: "Section 2 · The users", rows: [["primaryuser", "goal", "workaround"], ["secondary", "story"]] },
  { sec: "Section 3 · What it needs to do", rows: [["musthave", "shouldhave", "later"], ["outofscope"]] },
  { sec: "Section 4 · How it should feel and work", rows: [["flow", "feel", "platform"], ["connect"]] },
  { sec: "Section 5 · Success and measurement", rows: [["signs", "notworking", "checkwhen"]] },
];
