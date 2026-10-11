import Image from "next/image";
import Link from "next/link";
import { ProductTile } from "@/components/product-tile";
import { PromoStrip } from "@/components/promo-strip";
import { getBestSellingProducts, getProductById } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default function HomePage() {
  const bestSellers = getBestSellingProducts(3);
  // De Nebuchadnezzar is het vlaggenschip van de catalogus.
  const featured = getProductById(1)!;

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-end md:pt-20">
        <div>
          <h1 className="font-wide text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-extrabold">
            Uitrusting voor de echte wereld.
          </h1>
          <p className="mt-6 max-w-md text-lg text-graphite">
            Schepen, jack-in chairs en wapentuig voor de bemanningen van Zion.
            Gratis verzonden, met 30 dagen bedenktijd.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/producten" className="btn btn-primary">
              Bekijk alle producten
            </Link>
            <Link href={`/producten/${featured.id}`} className="btn btn-secondary">
              Bekijk de {featured.name}
            </Link>
          </div>
        </div>

        <figure>
          <div className="relative aspect-[16/10] overflow-hidden bg-ink">
            <Image
              src={featured.imageUrl}
              alt={featured.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 flex justify-between text-sm text-graphite">
            <span>{featured.name}, het schip van Morpheus</span>
            <span className="tabular">{formatPrice(featured.price)}</span>
          </figcaption>
        </figure>
      </section>

      <PromoStrip />

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-wide text-3xl font-bold">Meest verkocht</h2>
          <Link href="/producten" className="text-sm font-medium whitespace-nowrap underline underline-offset-4 hover:text-signal">
            Alle producten
          </Link>
        </div>
        <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-6">
          {bestSellers.map((product, i) => (
            <li key={product.id}>
              <ProductTile product={product} rank={i + 1} />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
