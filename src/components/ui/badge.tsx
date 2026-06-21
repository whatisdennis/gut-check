import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-m3-sm bg-surface-container-highest px-2.5 py-0.5 text-xs font-medium text-on-surface-variant",
        className
      )}
      {...props}
    />
  );
}
