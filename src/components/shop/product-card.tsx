import Link from "next/link";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./add-to-cart-button";
import { Badge } from "./badge";
import { DeliveryPromise } from "./delivery-promise";
import { Price } from "./price";
import { ProductImage } from "./product-image";
import { Rating } from "./rating";

export function ProductCard({ product: p, preload }: { product: Product; preload?: boolean }) {
  return (
    <article className="group tile relative flex h-full flex-col gap-2 p-3 transition-colors hover:border-[#b9c2c3]">
      {p.badge && (
        <div className="absolute top-5 left-5 z-10">
          <Badge type={p.badge} />
        </div>
      )}
      <ProductImage
        product={p}
        preload={preload}
        sizes="(min-width: 1280px) 240px, (min-width: 768px) 30vw, 50vw"
      />
      <h3 className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 font-medium text-brand group-hover:underline">
        {/* after:absolute maakt de hele kaart klikbaar */}
        <Link href={`/producten/${p.id}`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded focus-visible:after:outline-2 focus-visible:after:outline-brand">
          {p.name}
        </Link>
      </h3>
      {p.rating !== undefined && <Rating value={p.rating} count={p.reviewCount} />}
      <div className="flex items-end justify-between gap-2 pt-1">
        <Price value={p.price} oldValue={p.oldPrice} />
        <div className="relative z-10">
          <AddToCartButton productId={p.id} productName={p.name} disabled={p.stock <= 0} />
        </div>
      </div>
      <DeliveryPromise stock={p.stock} text={p.deliveryText} />
    </article>
  );
}

/** Horizontaal scrollbare productrij voor de homepage en "Bekijk ook". */
export function ProductRow({
  title,
  products,
  href,
}: {
  title: string;
  products: Product[];
  href?: string;
}) {
  return (
    <section aria-labelledby={`row-${title}`}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id={`row-${title}`} className="text-lg font-bold md:text-xl">
          {title}
        </h2>
        {href && (
          <Link href={href} className="link text-sm whitespace-nowrap">
            Bekijk alles
          </Link>
        )}
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 xl:grid-cols-5">
        {products.map((p) => (
          <li key={p.id} className="w-44 shrink-0 snap-start md:w-auto">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
