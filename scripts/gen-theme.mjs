// Generates Material 3 color tokens from the seed color and prints them as CSS
// custom properties. Run: node --loader ./scripts/loader.mjs scripts/gen-theme.mjs
//
// Design choices for this project (see README):
// - Accents (primary/secondary/tertiary) keep the seed's chroma for a vivid hue
//   rather than the muted tonal-spot default.
// - Neutral surfaces use ZERO chroma so cards read clean white/gray, not pink.
import {
  argbFromHex,
  hexFromArgb,
  Hct,
  TonalPalette,
} from "@material/material-color-utilities";

const SEED = "#ff3c00";
const seedArgb = argbFromHex(SEED);
const hue = Hct.fromInt(seedArgb).hue;

const primary = TonalPalette.fromInt(seedArgb); // vivid, preserves seed chroma
const secondary = TonalPalette.fromHueAndChroma(hue, 18);
const tertiary = TonalPalette.fromHueAndChroma(hue + 48, 22);
const error = TonalPalette.fromHueAndChroma(25, 84);
const neutral = TonalPalette.fromHueAndChroma(hue, 0); // pure gray -> no pink cards
const neutralVariant = TonalPalette.fromHueAndChroma(hue, 0);

const h = (p, t) => hexFromArgb(p.tone(t));

// token: [ [lightPalette, lightTone], [darkPalette, darkTone] ]
const T = {
  primary: [[primary, 50], [primary, 80]],
  "on-primary": [[primary, 100], [primary, 20]],
  "primary-container": [[primary, 90], [primary, 30]],
  "on-primary-container": [[primary, 10], [primary, 90]],
  secondary: [[secondary, 40], [secondary, 80]],
  "on-secondary": [[secondary, 100], [secondary, 20]],
  "secondary-container": [[secondary, 90], [secondary, 30]],
  "on-secondary-container": [[secondary, 10], [secondary, 90]],
  tertiary: [[tertiary, 40], [tertiary, 80]],
  "on-tertiary": [[tertiary, 100], [tertiary, 20]],
  "tertiary-container": [[tertiary, 90], [tertiary, 30]],
  "on-tertiary-container": [[tertiary, 10], [tertiary, 90]],
  error: [[error, 40], [error, 80]],
  "on-error": [[error, 100], [error, 20]],
  "error-container": [[error, 90], [error, 30]],
  "on-error-container": [[error, 10], [error, 90]],
  background: [[neutral, 99], [neutral, 6]],
  "on-background": [[neutral, 10], [neutral, 90]],
  surface: [[neutral, 99], [neutral, 6]],
  "on-surface": [[neutral, 10], [neutral, 90]],
  "surface-variant": [[neutralVariant, 90], [neutralVariant, 30]],
  "on-surface-variant": [[neutralVariant, 30], [neutralVariant, 80]],
  "surface-dim": [[neutral, 87], [neutral, 6]],
  "surface-bright": [[neutral, 99], [neutral, 24]],
  "surface-container-lowest": [[neutral, 100], [neutral, 4]],
  "surface-container-low": [[neutral, 96], [neutral, 10]],
  "surface-container": [[neutral, 94], [neutral, 12]],
  "surface-container-high": [[neutral, 92], [neutral, 17]],
  "surface-container-highest": [[neutral, 90], [neutral, 22]],
  outline: [[neutralVariant, 50], [neutralVariant, 60]],
  "outline-variant": [[neutralVariant, 80], [neutralVariant, 30]],
  "inverse-surface": [[neutral, 20], [neutral, 90]],
  "inverse-on-surface": [[neutral, 95], [neutral, 20]],
  "inverse-primary": [[primary, 80], [primary, 42]],
  scrim: [[neutral, 0], [neutral, 0]],
};

function block(idx) {
  return Object.entries(T)
    .map(([name, src]) => `    --md-sys-color-${name}: ${h(src[idx][0], src[idx][1])};`)
    .join("\n");
}

console.log(`/* Material 3 tokens generated from seed ${SEED} (vivid accents, neutral surfaces) */`);
console.log(":root {\n" + block(0) + "\n}\n");
console.log(".dark {\n" + block(1) + "\n}");
