"use client";

const MIN = 1;
const MAX = 50;

export function QuantityStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) {
  const set = (n: number) => onChange(Math.max(MIN, Math.min(MAX, n)));

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-11 items-stretch border border-rule bg-white"
    >
      <button
        type="button"
        onClick={() => set(value - 1)}
        disabled={value <= MIN}
        aria-label="Eén minder"
        className="w-10 text-lg hover:bg-steel disabled:opacity-30"
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={MIN}
        max={MAX}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n) && n > 0) set(n);
        }}
        aria-label={label}
        className="tabular w-12 border-x border-rule text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => set(value + 1)}
        disabled={value >= MAX}
        aria-label="Eén meer"
        className="w-10 text-lg hover:bg-steel disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
