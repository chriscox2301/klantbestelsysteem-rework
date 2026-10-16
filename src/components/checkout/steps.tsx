import { Check } from "lucide-react";

const steps = ["Winkelwagen", "Gegevens en betalen", "Bevestiging"];

/** Waar de klant is in het bestelproces; `current` is 0-gebaseerd. */
export function CheckoutSteps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label="Bestelstappen">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className={`h-px w-4 sm:w-10 ${done || active ? "bg-brand" : "bg-line"}`} />}
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done ? "bg-brand text-brand-contrast" : active ? "border-2 border-brand text-brand" : "border border-line bg-surface text-muted"
              }`}
              aria-hidden="true"
            >
              {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
            </span>
            <span
              aria-current={active ? "step" : undefined}
              className={`${active ? "font-bold text-brand" : done ? "text-ink" : "text-muted"} ${active ? "" : "hidden sm:inline"}`}
            >
              {label}
              {done && <span className="sr-only"> (afgerond)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
