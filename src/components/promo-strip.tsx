"use client";

import { useState } from "react";

export function PromoStrip() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText("MECH10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Klembord niet beschikbaar; de code staat zichtbaar in beeld.
    }
  }

  return (
    <section
      aria-label="Aanbieding"
      className="bg-signal text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-lg">
          10% korting op je hele bestelling met code{" "}
          <strong className="font-wide font-extrabold tracking-wide">MECH10</strong>
        </p>
        <button
          type="button"
          onClick={copy}
          className="btn self-start border border-white/70 text-white hover:bg-white hover:text-signal sm:self-auto"
          aria-live="polite"
        >
          {copied ? "Code gekopieerd" : "Kopieer code"}
        </button>
      </div>
    </section>
  );
}
