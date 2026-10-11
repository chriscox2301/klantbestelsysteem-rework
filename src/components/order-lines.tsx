import { getProductById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { orderTotals } from "@/lib/store";
import type { Order } from "@/lib/types";
import { ProductImage } from "./product-image";

export function OrderLines({ order }: { order: Order }) {
  const totals = orderTotals(order);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] text-left tabular">
        <thead className="text-sm text-graphite">
          <tr className="border-b border-rule">
            <th scope="col" className="py-2 font-medium">Product</th>
            <th scope="col" className="py-2 text-right font-medium">Aantal</th>
            <th scope="col" className="py-2 text-right font-medium">Per stuk</th>
            <th scope="col" className="py-2 text-right font-medium">Totaal</th>
          </tr>
        </thead>
        <tbody>
          {order.lines.map((line) => {
            const product = getProductById(line.productId);
            const name = product?.name ?? "Onbekend product";
            return (
              <tr key={line.productId} className="border-b border-rule">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <ProductImage
                      product={{ name, imageUrl: product?.imageUrl ?? "" }}
                      sizes="64px"
                      className="w-16 shrink-0"
                    />
                    {name}
                  </div>
                </td>
                <td className="py-3 text-right">{line.quantity}</td>
                <td className="py-3 text-right">{formatPrice(line.unitPrice)}</td>
                <td className="py-3 text-right">{formatPrice(line.unitPrice * line.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {totals.discount > 0 && (
            <tr className="text-go">
              <th scope="row" colSpan={3} className="pt-3 text-right font-normal">
                Korting {order.discountCode}
              </th>
              <td className="pt-3 text-right">−{formatPrice(totals.discount)}</td>
            </tr>
          )}
          <tr className="font-bold">
            <th scope="row" colSpan={3} className="pt-3 text-right">
              Totaal
            </th>
            <td className="pt-3 text-right">{formatPrice(totals.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
