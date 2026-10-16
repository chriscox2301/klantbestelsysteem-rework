import { formatPrice } from "@/lib/format";

/** Subtotaal, korting, verzending en totaal; gelijk in winkelwagen en checkout. */
export function SummaryRows({
  subtotal,
  discount,
  total,
  discountCode,
}: {
  subtotal: number;
  discount: number;
  total: number;
  discountCode: string | null;
}) {
  return (
    <dl className="space-y-2 text-sm tabular">
      <div className="flex justify-between">
        <dt>Subtotaal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      {discountCode && (
        <div className="flex justify-between text-success">
          <dt>Korting {discountCode}</dt>
          <dd>−{formatPrice(discount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt>Verzendkosten</dt>
        <dd className="font-semibold text-success">Gratis</dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-line pt-3">
        <dt className="font-bold">Totaal</dt>
        <dd className="font-wide text-xl font-bold">{formatPrice(total)}</dd>
      </div>
      <p className="text-right text-xs text-muted">Inclusief btw</p>
    </dl>
  );
}
