import type { Product } from "@/lib/types";

type BadgeType = NonNullable<Product["badge"]>;

const styles: Record<BadgeType, string> = {
  deal: "bg-accent text-white",
  nieuw: "bg-brand text-brand-contrast",
  bestseller: "bg-ink text-white",
};
const labels: Record<BadgeType, string> = {
  deal: "Deal",
  nieuw: "Nieuw",
  bestseller: "Bestseller",
};

export function Badge({ type }: { type: BadgeType }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] leading-4 font-bold ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}
