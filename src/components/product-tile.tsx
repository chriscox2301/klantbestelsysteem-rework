import Image from "next/image";
import Link from "next/link";
import { formatPrice, partNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

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
      <div className="flex items-baseline justify-between text-sm text-graphite">
        <span className="tabular">{partNumber(product.id)}</span>
        {rank !== undefined && (
          <span className="font-wide text-2xl font-extrabold text-ink tabular">
            <span className="sr-only">Plaats </span>
            {rank}
          </span>
        )}
      </div>
      <div className="relative mt-3 aspect-[4/3] overflow-hidden bg-plate">
        <Image
          src={product.imageUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 text-lg leading-snug font-semibold group-hover:text-signal">
        {product.name}
      </h3>
      <p className="mt-1 tabular text-graphite">{formatPrice(product.price)}</p>
    </Link>
  );
}
