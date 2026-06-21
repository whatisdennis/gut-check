# Gut Check

Stress-test your idea before you build it. A guided thinking exercise that walks a
first-time founder or vibe coder through the sharp questions they should answer before
building, then hands back an LLM-ready build brief. No AI at runtime. Deterministic,
$0 per user.

## Stack

- Next.js 14 (App Router, static export) + TypeScript
- Tailwind CSS + shadcn-style primitives (hand-rolled, no CLI dependency)
- Framer Motion for transitions (timing/easing from the interaction-design skill)
- localStorage for save/resume. No database.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Deploy `./out` to Vercel (or any static host).

## Architecture

The product is the questions, so the content is fully data-driven and separated from UI:

- `src/lib/content.ts` — every question, tip, example, the 9 product-type modules, and the
  reality-check risk library. Single source of truth, mirrors the docs in `../../docs/`.
- `src/lib/engine.ts` — deterministic logic: screen assembly, keyword type-detection, the
  rules-based reality check, and the markdown brief builder.
- `src/lib/useGutCheck.ts` — reducer + localStorage persistence (save/resume, partial-run safe).
- `src/components/gutcheck/` — the four screens: Welcome, Interview, RealityCheck, ExportScreen.
- `src/components/ui/` — shadcn-style button, input, textarea, badge, progress.

To edit questions or risks, change `content.ts` only. The form re-renders from data.

## Wiring left for go-live

`src/lib/config.ts` holds two blanks that degrade gracefully until filled:

- `BOOKING_URL` — Calendly link for the paid teardown CTA.
- `FORM_ENDPOINT` — a form endpoint (e.g. Formspree) for email capture at export.

## Theming (Material 3)

Material Design 3 theme generated from seed color `#ff3c00`. The full set of
`--md-sys-color-*` tokens (light + dark) lives in `src/app/globals.css`, mapped to
Tailwind color roles in `tailwind.config.ts` (`bg-primary`, `text-on-surface`,
`bg-surface-container-*`, `border-outline-variant`, etc.) and the M3 shape scale
(`rounded-m3-xs/sm/md/lg/xl`). Buttons are full-pill with state layers, cards use tonal
surface containers, fields are M3 outlined. Roboto is loaded in `layout.tsx`.

The page sits on a white dot-grid canvas (matches dennisdelgado.com) defined on `body`
in `globals.css`. The app currently runs light-only to keep that white canvas; the
`.dark` tokens are generated and ready if a dark toggle is added later.
`prefers-reduced-motion` is respected globally.

### Regenerating the palette

To change the seed color, edit `SEED` in `scripts/gen-theme.mjs` and run:

```bash
node --loader ./scripts/loader.mjs scripts/gen-theme.mjs
```

Paste the printed `:root` and `.dark` blocks into `src/app/globals.css`. (The loader
shim works around extensionless ESM imports in `@material/material-color-utilities`
under Node's strict resolver.) The default scheme is tonal-spot, which deepens a bright
seed for contrast; swap to a vibrant/expressive scheme in the script for a punchier hue.
