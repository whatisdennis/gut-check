"use client";

import { FIELDS } from "@/lib/content";
import { type Answers } from "@/lib/engine";

const PREVIEW_KEYS = [
  "name",
  "oneliner",
  "problem",
  "success",
  "risk",
  "primaryuser",
  "musthave",
  "outofscope",
];

export function BriefPreview({ answers }: { answers: Answers }) {
  return (
    <div className="rounded-m3-md border border-outline-variant bg-surface-container-low p-3">
      <div className="mb-2 text-[11px] font-medium tracking-wide text-on-surface-variant">
        YOUR BRIEF SO FAR
      </div>
      <div className="space-y-2">
        {PREVIEW_KEYS.map((k) => {
          const label = FIELDS[k].q.replace(/[?:,].*$/, "").slice(0, 36);
          const v = (answers[k] || "").trim();
          return (
            <div key={k}>
              <div className="text-[11px] text-on-surface-variant">{label}</div>
              {v ? (
                <div className="text-[12px] leading-snug text-on-surface">
                  {v.length > 88 ? v.slice(0, 88) + "…" : v}
                </div>
              ) : (
                <div className="text-[12px] italic text-on-surface-variant/60">—</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
