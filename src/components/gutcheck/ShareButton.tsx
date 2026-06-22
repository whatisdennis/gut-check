"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { NAME, TAGLINE } from "@/lib/content";

// Share Gut Check with a friend. Uses the native share sheet where the browser
// supports it (most phones), and falls back to copying the link on desktop.
export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: NAME, text: `${NAME} — ${TAGLINE}`, url });
      } catch {
        // user dismissed the native share sheet; nothing to do
      }
      return;
    }
    const flash = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    try {
      await navigator.clipboard.writeText(url);
      flash();
    } catch {
      // Clipboard API blocked (older browsers, no focus). Fall back to the
      // legacy execCommand copy via a throwaway textarea.
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        flash();
      } catch {
        // nothing more we can do
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={copied ? "Link copied" : `Share ${NAME} with a friend`}
      title={`Share ${NAME} with a friend`}
      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container-lowest px-3.5 text-[13px] font-medium text-on-surface-variant shadow-m3-1 transition-colors hover:bg-surface-container-high hover:text-on-surface"
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Share2 className="size-4" aria-hidden="true" />
      )}
      <span className="hidden sm:inline">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
