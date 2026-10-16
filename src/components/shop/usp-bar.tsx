import { Check } from "lucide-react";
import { brand } from "@/brand.config";

export function UspBar() {
  return (
    <div className="border-b border-line bg-surface">
      <ul className="container-shop flex gap-6 overflow-x-auto py-1.5 text-xs text-muted [scrollbar-width:none] md:justify-between">
        {brand.usps.map((u, i) => (
          <li key={u} className={`shrink-0 items-center gap-1.5 ${i === 0 ? "flex" : "hidden sm:flex"}`}>
            <Check aria-hidden="true" className="size-3.5 text-success" strokeWidth={3} />
            {u}
          </li>
        ))}
      </ul>
    </div>
  );
}
