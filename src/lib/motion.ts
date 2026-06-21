// Motion tokens from the interaction-design skill. Transform/opacity only for
// 60fps; prefers-reduced-motion is handled globally in globals.css and via
// Framer's useReducedMotion in the screen wrapper.

import { type Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // entering
export const EASE_IN = [0.55, 0, 1, 0.45] as const; // exiting
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const; // state change
export const SPRING_PLAYFUL = [0.34, 1.56, 0.64, 1] as const;

// Page/screen level (300-500ms medium transition).
export const screenVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_IN } },
};

// Small staggered reveal for stacked items (questions, risks).
export const listVariants: Variants = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};
