"use client";

import { Type } from "lucide-react";

export type TextSize = "base" | "large" | "xl";

const OPTIONS: { key: TextSize; label: string; px: number }[] = [
  { key: "base", label: "Normal text size", px: 12 },
  { key: "large", label: "Large text size", px: 15 },
  { key: "xl", label: "Larger text size", px: 18 },
];

export function TextSizeToggle({
  value,
  onChange,
}: {
  value: TextSize;
  onChange: (s: TextSize) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Text size"
      className="fixed right-3 top-3 z-50 flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-lowest p-1 shadow-m3-1"
    >
      <Type className="ml-1 size-4 text-on-surface-variant" aria-hidden="true" />
      {OPTIONS.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            aria-label={o.label}
            aria-pressed={active}
            title={o.label}
            className={
              "flex h-8 w-8 items-center justify-center rounded-full font-medium leading-none transition-colors " +
              (active
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container-high")
            }
          >
            <span style={{ fontSize: o.px }}>A</span>
          </button>
        );
      })}
    </div>
  );
}
