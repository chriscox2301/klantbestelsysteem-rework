"use client";

import { Minus, Plus } from "lucide-react";

const MIN = 1;

export function QuantityStepper({
  value,
  onChange,
  label,
  max = 50,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  max?: number;
}) {
  const set = (n: number) => onChange(Math.max(MIN, Math.min(max, n)));
  const button =
    "flex w-10 items-center justify-center text-ink hover:bg-page disabled:text-line disabled:hover:bg-transparent";

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-10 items-stretch overflow-hidden rounded border border-[#b9c2c3] bg-surface"
    >
      <button
        type="button"
        onClick={() => set(value - 1)}
        disabled={value <= MIN}
        aria-label="Minder"
        className={button}
      >
        <Minus aria-hidden="true" className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={MIN}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n) && n > 0) set(n);
        }}
        aria-label={label}
        className="w-11 border-x border-line text-center font-semibold tabular [appearance:textfield] focus-visible:outline-offset-[-2px] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label="Meer"
        className={button}
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
