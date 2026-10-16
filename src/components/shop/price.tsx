import { discountPercent, formatPrice, splitPrice } from "@/lib/format";

type Props = {
  value: number;
  oldValue?: number;
  size?: "sm" | "md" | "lg";
  /** Witte tekst, voor op een donkere achtergrond. */
  inverted?: boolean;
};

const euroSize = { sm: "text-xl", md: "text-2xl", lg: "text-4xl" };
const centSize = { sm: "text-xs", md: "text-sm", lg: "text-lg" };

/** Euro's groot, centen klein en verhoogd; hele bedragen als "24,-". */
export function Price({ value, oldValue, size = "sm", inverted = false }: Props) {
  const { euros, cents } = splitPrice(value);
  const onSale = oldValue !== undefined && oldValue > value;
  return (
    <div className="flex flex-col gap-0.5">
      {onSale && (
        <p className="flex items-center gap-2 text-xs" aria-hidden="true">
          <span className="text-muted line-through">{formatPrice(oldValue)}</span>
          <span className="font-bold text-danger">-{discountPercent(value, oldValue)}%</span>
        </p>
      )}
      <p className={`font-wide leading-none font-bold tabular ${inverted ? "text-white" : "text-ink"}`} aria-hidden="true">
        <span className={euroSize[size]}>{euros},</span>
        {cents === "00" ? (
          <span className={euroSize[size]}>-</span>
        ) : (
          <sup className={`${centSize[size]} ml-px align-super`}>{cents}</sup>
        )}
      </p>
      <span className="sr-only">
        {formatPrice(value)}
        {onSale && `, was ${formatPrice(oldValue)}`}
      </span>
    </div>
  );
}
