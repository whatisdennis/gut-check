"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useGutCheck } from "@/lib/useGutCheck";
import { screenVariants } from "@/lib/motion";
import { Welcome } from "./Welcome";
import { Interview } from "./Interview";
import { RealityCheck } from "./RealityCheck";
import { ExportScreen } from "./ExportScreen";
import { ShareButton } from "./ShareButton";
import { TextSizeToggle, type TextSize } from "./TextSizeToggle";

const ZOOM: Record<TextSize, number> = { base: 1, large: 1.15, xl: 1.3 };
const TEXT_SIZE_KEY = "gutcheck:textsize";

export function GutCheck() {
  const { state, dispatch } = useGutCheck();
  const reduce = useReducedMotion();

  // App-wide text-size preference, persisted separately from the run state.
  const [textSize, setTextSize] = useState<TextSize>("base");
  const tsReady = useRef(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem(TEXT_SIZE_KEY);
      if (v === "base" || v === "large" || v === "xl") setTextSize(v);
    } catch {
      // ignore
    }
    const id = setTimeout(() => {
      tsReady.current = true;
    }, 0);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    if (!tsReady.current) return;
    try {
      localStorage.setItem(TEXT_SIZE_KEY, textSize);
    } catch {
      // ignore
    }
  }, [textSize]);

  const key =
    state.phase === "interview" ? `interview-${state.step}` : state.phase;

  // The interview is a two-column layout (question + live brief), so it gets a
  // wider canvas. Single-card screens stay narrower for comfortable reading.
  const maxWidth = state.phase === "interview" ? "max-w-5xl" : "max-w-3xl";
  const mainStyle = { zoom: ZOOM[textSize] } as CSSProperties;

  const welcomeScreen = (
    <Welcome
      state={state}
      setIdea={(idea) => dispatch({ type: "setIdea", idea })}
      setType={(ptype) => dispatch({ type: "setType", ptype })}
      start={() => dispatch({ type: "start" })}
    />
  );

  return (
    <>
      <div className="fixed left-3 top-3 z-50 flex items-center gap-2">
        <a
          href="https://dennisdelgado.com"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container-lowest px-3.5 text-[13px] font-medium text-on-surface-variant shadow-m3-1 transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">dennisdelgado.com</span>
        </a>
        <ShareButton />
      </div>
      <TextSizeToggle value={textSize} onChange={setTextSize} />
      <main
        style={mainStyle}
        className={`mx-auto w-full px-4 pb-10 pt-16 sm:pb-14 ${maxWidth} transition-[max-width] duration-300`}
      >
        {/* AnimatePresence renders its children during SSR / static export, so
            the welcome screen's content is in the HTML for SEO and first paint. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            variants={reduce ? undefined : screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {state.phase === "welcome" && welcomeScreen}

            {state.phase === "interview" && (
              <Interview
                ptype={state.ptype}
                step={state.step}
                answers={state.answers}
                onAnswer={(k, value) => dispatch({ type: "answer", key: k, value })}
                onNext={() => dispatch({ type: "next" })}
                onBack={() => dispatch({ type: "back" })}
              />
            )}

            {state.phase === "reality" && (
              <RealityCheck
                ptype={state.ptype}
                answers={state.answers}
                onBack={() => dispatch({ type: "back" })}
                onExport={() => dispatch({ type: "toExport" })}
              />
            )}

            {state.phase === "export" && (
              <ExportScreen
                ptype={state.ptype}
                answers={state.answers}
                onRestart={() => dispatch({ type: "reset" })}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
