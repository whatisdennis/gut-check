"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Download, ArrowRight, CalendarClock } from "lucide-react";
import { buildMarkdown, type Answers } from "@/lib/engine";
import { type ProductType } from "@/lib/content";
import { BOOKING_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function ExportScreen({
  ptype,
  answers,
  onRestart,
}: {
  ptype: ProductType;
  answers: Answers;
  onRestart: () => void;
}) {
  const md = buildMarkdown(answers, ptype);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function download() {
    const slug = (answers.name || "gut-check-brief").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "brief"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Progress value={100} className="mb-4" />
      <div className="rounded-m3-md border border-outline-variant bg-surface-container-low p-6 shadow-m3-1">
        <h2 className="text-[22px] font-normal text-on-surface">Your brief is ready</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Clean, LLM-ready, in your own words. Paste it into Claude, ChatGPT, Cursor, or Lovable to
          refine or start building.
        </p>

        <pre className="mt-3 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-m3-md bg-surface-container-high p-3.5 font-mono text-[12px] leading-relaxed text-on-surface">
          {md}
        </pre>

        <div className="mt-3 flex flex-wrap gap-2.5">
          <Button onClick={copy}>
            {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy markdown"}
          </Button>
          <Button variant="outline" onClick={download}>
            <Download /> Download .md
          </Button>
          <Button variant="outline" onClick={onRestart}>
            <RefreshCw /> Start over
          </Button>
        </div>
      </div>

      {/* Paid teardown CTA */}
      <div className="mt-5 overflow-hidden rounded-m3-lg bg-inverse-surface p-6 text-inverse-on-surface shadow-m3-2">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-[15px] font-medium text-on-primary">
            DD
          </div>
          <div>
            <div className="text-[15px] font-medium leading-tight">Dennis Delgado</div>
            <div className="text-[13px] opacity-75">Product strategist</div>
          </div>
        </div>

        <h3 className="mt-4 text-[20px] font-medium leading-snug">
          Want to pressure-test this live?
        </h3>
        <p className="mt-1.5 text-[14px] leading-relaxed opacity-90">
          Book a 45-minute call with me. We’ll go through your PRD together and pressure-test your
          product strategy, so you walk away knowing the riskiest assumptions to test first.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[30px] font-medium leading-none">$99</span>
            <span className="inline-flex items-center gap-1 text-[13px] opacity-80">
              <CalendarClock className="size-4" aria-hidden="true" /> 45-minute call
            </span>
          </div>
          <a href={BOOKING_URL || "#"} target={BOOKING_URL ? "_blank" : undefined} rel="noreferrer">
            <Button size="lg">
              Book your call <ArrowRight />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
