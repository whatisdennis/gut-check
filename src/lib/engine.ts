// Deterministic engine: screen assembly, keyword type-detection, the
// rules-based reality check, and the markdown brief. No AI, $0 per user.

import {
  FIELDS,
  MODULES,
  TYPE_RISKS,
  DETECT,
  SPINE_SECTIONS,
  PRODUCT_TYPES,
  TOP_RISKS,
  NAME,
  type ProductType,
  type Risk,
} from "./content";

export type Answers = Record<string, string>;

export type Screen = {
  sec: string;
  fields: string[];
  module?: boolean;
};

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// Build the screen list for a product type. The module snaps in right after
// Section 1 (the one-pager), chunked into screens of up to 3 questions.
export function buildScreens(ptype: ProductType): Screen[] {
  const screens: Screen[] = [];
  SPINE_SECTIONS.forEach((section, idx) => {
    section.rows.forEach((fields) => screens.push({ sec: section.sec, fields }));
    if (idx === 0) {
      const mod = MODULES[ptype];
      if (mod) {
        chunk(mod, 3).forEach((fields) =>
          screens.push({ sec: `Module · ${ptype}`, fields, module: true })
        );
      }
    }
  });
  return screens;
}

export function totalQuestions(screens: Screen[]): number {
  return screens.reduce((acc, s) => acc + s.fields.length, 0);
}

export function questionsBefore(screens: Screen[], step: number): number {
  let n = 0;
  for (let i = 0; i < step && i < screens.length; i++) n += screens[i].fields.length;
  return n;
}

// Auto-detect product type from the one-liner. First keyword match wins,
// in PRODUCT_TYPES order. Falls back to General.
export function detectType(text: string): ProductType {
  const t = ` ${text.toLowerCase()} `;
  for (const type of PRODUCT_TYPES) {
    const keywords = DETECT[type];
    if (keywords && keywords.some((k) => t.includes(k))) return type;
  }
  return "General";
}

const VANITY = /(download|sign[- ]?up|signup|go viral|viral|install)/i;

// Reality check: answer-based rules first (most specific to the user), then
// the chosen type's canonical risks, capped at TOP_RISKS.
export function runReality(answers: Answers, ptype: ProductType): Risk[] {
  const out: Risk[] = [];
  const a = (k: string) => (answers[k] || "").trim();

  if (!a("outofscope"))
    out.push({ h: "You have not named anything to cut from v1.", t: "Everything-in-v1 is the top reason small projects never ship. Move three tempting features into Later this week." });
  if (/\beveryone\b/i.test(a("primaryuser")))
    out.push({ h: "“Everyone” is not a user.", t: "Narrow to the one person who feels this most, and build the next ten decisions around them." });
  if (VANITY.test(a("success")))
    out.push({ h: "That measures curiosity, not value.", t: "Swap your success number for a repeat-behavior number you can watch in weeks." });
  const wk = a("workaround").toLowerCase();
  if (!wk || wk === "nothing" || wk === "none")
    out.push({ h: "The problem may not hurt enough.", t: "If nobody does anything today, go find five people actively hacking a workaround before you build." });
  if (a("musthave").split(/\n/).filter((x) => x.trim()).length > 6)
    out.push({ h: "Your must-have list is a v2 in disguise.", t: "Cut to five or fewer. The rest is your roadmap, not your launch." });
  if (!a("risk"))
    out.push({ h: "You did not name your biggest risk.", t: "Write the one thing that sinks this, then test it first, before writing more code." });

  (TYPE_RISKS[ptype] || []).forEach((r) => out.push(r));

  if (out.length === 0)
    out.push({ h: "Sharp run.", t: "Nothing obvious tripped the checks. The real test is putting this brief in front of five target users this week." });

  return out.slice(0, TOP_RISKS);
}

// Assemble the LLM-ready markdown brief.
export function buildMarkdown(answers: Answers, ptype: ProductType): string {
  const a = (k: string) => answers[k] || "_TBD_";
  const L: string[] = [];
  L.push(`# ${answers.name || "Untitled"} — build brief`);
  L.push("");
  L.push(`> Product type: ${ptype}  ·  Drafted with ${NAME}`);

  L.push("", "## The one-pager");
  (
    [
      ["What it is", "oneliner"],
      ["Who it is for", "primaryuser"],
      ["The problem", "problem"],
      ["Why now", "whynow"],
      ["Success", "success"],
      ["Simplest v1", "musthave"],
      ["Not in v1", "outofscope"],
      ["Biggest risk", "risk"],
    ] as [string, string][]
  ).forEach(([label, key]) => L.push("", `**${label}:** ${a(key)}`));

  const mod = MODULES[ptype];
  if (mod) {
    L.push("", `## ${ptype} specifics`);
    mod.forEach((key) => L.push("", `**${FIELDS[key].q}** ${a(key)}`));
  }

  L.push("", "## The users");
  (
    [
      ["Primary user", "primaryuser"],
      ["Their goal", "goal"],
      ["Today's workaround", "workaround"],
    ] as [string, string][]
  ).forEach(([label, key]) => L.push("", `**${label}:** ${a(key)}`));

  L.push("", "## Scope");
  L.push("", `**Must have:** ${a("musthave")}`);
  L.push(`**Should have:** ${a("shouldhave")}`);
  L.push(`**Later:** ${a("later")}`);
  L.push(`**Out of scope:** ${a("outofscope")}`);

  L.push("", "## How it should feel and work");
  L.push("", `**Main flow:** ${a("flow")}`);
  L.push(`**Look and feel:** ${a("feel")}`);
  L.push(`**Platforms:** ${a("platform")}`);
  L.push(`**Connects to:** ${a("connect")}`);

  L.push("", "## Riskiest assumptions to test first");
  runReality(answers, ptype).forEach((r, i) => L.push(`${i + 1}. ${r.h} — ${r.t}`));

  L.push("", "---", "_Paste this into Claude, ChatGPT, Cursor, or Lovable to refine or start building._");
  return L.join("\n");
}
