import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const c = (token: string) => `var(--md-sys-color-${token})`;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: c("primary"),
        "on-primary": c("on-primary"),
        "primary-container": c("primary-container"),
        "on-primary-container": c("on-primary-container"),
        secondary: c("secondary"),
        "on-secondary": c("on-secondary"),
        "secondary-container": c("secondary-container"),
        "on-secondary-container": c("on-secondary-container"),
        tertiary: c("tertiary"),
        "on-tertiary": c("on-tertiary"),
        "tertiary-container": c("tertiary-container"),
        "on-tertiary-container": c("on-tertiary-container"),
        error: c("error"),
        "on-error": c("on-error"),
        "error-container": c("error-container"),
        "on-error-container": c("on-error-container"),
        background: c("background"),
        "on-background": c("on-background"),
        surface: c("surface"),
        "on-surface": c("on-surface"),
        "surface-variant": c("surface-variant"),
        "on-surface-variant": c("on-surface-variant"),
        "surface-dim": c("surface-dim"),
        "surface-bright": c("surface-bright"),
        "surface-container-lowest": c("surface-container-lowest"),
        "surface-container-low": c("surface-container-low"),
        "surface-container": c("surface-container"),
        "surface-container-high": c("surface-container-high"),
        "surface-container-highest": c("surface-container-highest"),
        outline: c("outline"),
        "outline-variant": c("outline-variant"),
        "inverse-surface": c("inverse-surface"),
        "inverse-on-surface": c("inverse-on-surface"),
        "inverse-primary": c("inverse-primary"),
      },
      borderRadius: {
        "m3-xs": "var(--md-shape-xs)",
        "m3-sm": "var(--md-shape-sm)",
        "m3-md": "var(--md-shape-md)",
        "m3-lg": "var(--md-shape-lg)",
        "m3-xl": "var(--md-shape-xl)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "m3-1": "0 1px 2px 0 rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15)",
        "m3-2": "0 1px 2px 0 rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [animate],
};
export default config;
