import Link from "next/link";
import { getProductById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { orderTotals } from "@/lib/store";
import type { Order } from "@/lib/types";
import { ProductImage } from "./shop/product-image";

export function OrderLines({ order }: { order: Order }) {
  const totals = orderTotals(order);

  return (
    <div>
      <ul className="divide-y divide-line">
        {order.lines.map((line) => {
          const product = getProductById(line.productId);
          const name = product?.name ?? "Onbekend product";
          return (
            <li key={line.productId} className="flex items-center gap-3 py-3 text-sm">
              <ProductImage
                product={{ name, imageUrl: product?.imageUrl ?? "" }}
                sizes="72px"
                className="w-[72px] shrink-0"
              />
              <div className="min-w-0 flex-1">
                {product ? (
                  <Link href={`/producten/${product.id}`} className="link line-clamp-2">
                    {name}
                  </Link>
                ) : (
                  <p>{name}</p>
                )}
                <p className="text-xs text-muted tabular">
                  {line.quantity} × {formatPrice(line.unitPrice)}
                </p>
              </div>
              <p className="font-semibold tabular">{formatPrice(line.unitPrice * line.quantity)}</p>
            </li>
          );
        })}
      </ul>
      <dl className="ml-auto max-w-xs space-y-1 border-t border-line pt-3 text-sm tabular">
        {totals.discount > 0 && (
          <div className="flex justify-between text-success">
            <dt>Korting {order.discountCode}</dt>
            <dd>−{formatPrice(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>Verzendkosten</dt>
          <dd>Gratis</dd>
        </div>
        <div className="flex items-baseline justify-between font-bold">
          <dt>Totaal</dt>
          <dd className="font-wide text-lg">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
