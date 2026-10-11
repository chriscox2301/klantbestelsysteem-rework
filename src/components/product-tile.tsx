import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { ProductImage } from "./product-image";

/** Compacte producttegel voor overzichten zoals "Meest verkocht". */
export function ProductTile({
  product,
  rank,
}: {
  product: Product;
  rank?: number;
}) {
  return (
    <Link
      href={`/producten/${product.id}`}
      className="group flex flex-col border-t-2 border-ink pt-3"
    >
      {rank !== undefined && (
        <span className="mb-3 self-end font-wide text-2xl font-extrabold tabular">
          <span className="sr-only">Plaats </span>
          {rank}
        </span>
      )}
      <ProductImage
        product={product}
        sizes="(min-width: 768px) 33vw, 100vw"
        imageClassName="transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <h3 className="mt-4 text-lg leading-snug font-semibold group-hover:text-signal">
        {product.name}
      </h3>
      <p className="mt-1 tabular text-graphite">{formatPrice(product.price)}</p>
    </Link>
  );
}
