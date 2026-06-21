"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function ProgressHeader({
  pct,
  eyebrow,
  rightText,
  moduleFor,
}: {
  pct: number;
  eyebrow: string;
  rightText: string;
  moduleFor?: string;
}) {
  return (
    <div className="mb-5">
      <Progress value={pct} className="mb-2" />
      <div className="flex items-baseline justify-between gap-3">
        <p className="m-0 text-xs font-medium tracking-wide text-primary">
          {eyebrow}
          {moduleFor ? <Badge className="ml-2">snaps in for {moduleFor}</Badge> : null}
        </p>
        <span className="shrink-0 text-xs text-on-surface-variant">{rightText}</span>
      </div>
    </div>
  );
}
