"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { buildScreens, questionsBefore, totalQuestions, type Answers } from "@/lib/engine";
import { type ProductType } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { listVariants, itemVariants } from "@/lib/motion";
import { ProgressHeader } from "./ProgressHeader";
import { QuestionField } from "./QuestionField";
import { BriefPreview } from "./BriefPreview";

export function Interview({
  ptype,
  step,
  answers,
  onAnswer,
  onNext,
  onBack,
}: {
  ptype: ProductType;
  step: number;
  answers: Answers;
  onAnswer: (key: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const screens = buildScreens(ptype);
  const screen = screens[Math.min(step, screens.length - 1)];
  const total = totalQuestions(screens);
  const start = questionsBefore(screens, step);
  const n = screen.fields.length;
  const isLast = step === screens.length - 1;
  const left = total - start;
  const pct = Math.round((start / total) * 100);
  const range = n === 1 ? `Question ${start + 1}` : `Questions ${start + 1}–${start + n}`;

  return (
    <div>
      <ProgressHeader
        pct={pct}
        eyebrow={screen.sec}
        rightText={`${range} of ${total} · ${left} left`}
        moduleFor={screen.module ? ptype : undefined}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="min-w-0 flex-1 md:basis-[62%]">
          <div className="rounded-m3-md border border-outline-variant bg-surface-container-low p-5 shadow-m3-1">
            <motion.div variants={listVariants} initial="initial" animate="animate">
              {screen.fields.map((k, i) => (
                <motion.div
                  key={k}
                  variants={itemVariants}
                  className="mt-6 border-t border-outline-variant pt-6 first:mt-0 first:border-t-0 first:pt-0"
                >
                  <QuestionField
                    fieldKey={k}
                    number={start + i + 1}
                    value={answers[k] || ""}
                    onChange={(v) => onAnswer(k, v)}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-5 flex items-center justify-between border-t border-outline-variant pt-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft /> Back
              </Button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onNext}
                  className="text-[13px] text-on-surface-variant underline-offset-2 hover:underline"
                >
                  Skip
                </button>
                <Button onClick={onNext}>
                  {isLast ? "See reality check" : "Next"} <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:basis-[34%] md:self-stretch">
          <div className="md:sticky md:top-4">
            <BriefPreview answers={answers} />
          </div>
        </div>
      </div>
    </div>
  );
}
