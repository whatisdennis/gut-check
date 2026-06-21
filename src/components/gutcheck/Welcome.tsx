"use client";

import { useState } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { TAGLINE, PRODUCT_TYPES, MODULES } from "@/lib/content";
import { detectType } from "@/lib/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type State } from "@/lib/useGutCheck";

export function Welcome({
  state,
  setIdea,
  setType,
  start,
}: {
  state: State;
  setIdea: (s: string) => void;
  setType: (t: (typeof PRODUCT_TYPES)[number]) => void;
  start: () => void;
}) {
  const [manual, setManual] = useState(false);

  function onIdea(v: string) {
    setIdea(v);
    if (!manual) setType(detectType(v));
  }

  return (
    <div>
      <div className="px-1 py-2 text-center">
        <div className="text-[13px] font-medium tracking-wide text-primary">Gut Check Your Product</div>
        <h1 className="mx-auto mt-2 max-w-xl text-[2rem] font-normal leading-tight tracking-tight text-on-surface text-balance">
          {TAGLINE}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
          A 15-minute Product Requirements Document (PRD) thinking exercise. Direct questions, your
          own words, and a downloadable markdown file in the end. No AI here. The struggle of
          thinking is the whole point, sorry not sorry.
        </p>
      </div>

      <div className="mt-6 rounded-m3-md border border-outline-variant bg-surface-container-low p-5 shadow-m3-1">
        <p className="text-base font-medium text-on-surface">Describe your idea in a sentence or two.</p>
        <Textarea
          className="mt-3"
          value={state.idea}
          onChange={(e) => onIdea(e.target.value)}
          placeholder="Start typing…"
        />
        <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant">
          <span className="font-medium text-on-surface">Example:</span> An app that helps busy home
          cooks decide dinner from a photo of their fridge.
        </p>

        <p className="mt-5 text-[13px] font-medium text-on-surface">What kind of product is it?</p>
        <p className="mb-2 mt-0.5 text-[13px] text-on-surface-variant">
          Pick the closest match and we’ll tailor the questions to it. The +number is how many extra
          questions that type adds.
        </p>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_TYPES.map((t) => {
            const count = MODULES[t]?.length;
            const on = state.ptype === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setManual(true);
                  setType(t);
                }}
                className={
                  "inline-flex items-center rounded-m3-sm border px-3 py-1.5 text-[13px] transition-colors duration-200 " +
                  (on
                    ? "border-transparent bg-primary text-on-primary"
                    : "border-outline bg-transparent text-on-surface hover:bg-surface-container-high")
                }
              >
                <span
                  className={
                    "flex items-center overflow-hidden transition-all duration-200 ease-out " +
                    (on ? "max-w-[1.25rem] scale-100 opacity-100" : "max-w-0 scale-50 opacity-0")
                  }
                >
                  <Check className="mr-1.5 size-3.5" />
                </span>
                {t}
                {count ? ` +${count}` : ""}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex justify-end">
          <Button size="lg" onClick={start}>
            Start the exercise <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-2xl justify-center text-center text-[13px] text-on-surface-variant">
        <p className="flex items-start justify-center gap-1.5">
          <Lock className="mt-[3px] size-3.5 shrink-0" aria-hidden="true" />
          Nothing you type is stored by us or sent anywhere. It never leaves your browser.
        </p>
      </div>
    </div>
  );
}
