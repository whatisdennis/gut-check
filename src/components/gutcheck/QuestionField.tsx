"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FIELDS } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EASE_OUT } from "@/lib/motion";

export function QuestionField({
  fieldKey,
  number,
  value,
  onChange,
}: {
  fieldKey: string;
  number: number;
  value: string;
  onChange: (v: string) => void;
}) {
  const field = FIELDS[fieldKey];
  const [showTip, setShowTip] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div>
      <span className="mb-2 inline-block rounded-m3-sm bg-surface-container-highest px-2.5 py-0.5 text-[11px] font-medium text-primary">
        Question {number}
        {field.optional ? " · optional" : ""}
      </span>
      <p className="text-base font-medium leading-snug text-on-surface">{field.q}</p>

      <button
        type="button"
        onClick={() => setShowTip((v) => !v)}
        className="mt-1 inline-flex items-center gap-1 text-[13px] text-primary transition-colors hover:opacity-80"
        aria-expanded={showTip}
      >
        Why this matters
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${showTip ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {showTip && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="mt-2 rounded-m3-sm bg-surface-container-high px-3 py-2.5 text-[13px] leading-relaxed text-on-surface-variant"
          >
            {field.tip}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-3">
        {field.input === "text" ? (
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Your answer…" />
        ) : (
          <Textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Your answer…" />
        )}
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant">
        <span className="font-medium text-on-surface">Example:</span> {field.eg}
      </p>
    </div>
  );
}
