"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function PromoCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Klembord niet beschikbaar; de code staat zichtbaar in beeld.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex h-11 items-center gap-3 rounded-md border border-dashed border-white/50 bg-white/5 pr-3 pl-4 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white"
    >
      <span className="font-wide text-lg font-extrabold tracking-wide">{code}</span>
      <span className="flex items-center gap-1.5 text-sm text-white/80 group-hover:text-white" aria-live="polite">
        {copied ? (
          <>
            <Check aria-hidden="true" className="size-4" /> Gekopieerd
          </>
        ) : (
          <>
            <Copy aria-hidden="true" className="size-4" /> Kopieer
          </>
        )}
      </span>
    </button>
  );
}
