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
      <section className="relative isolate overflow-hidden bg-ink text-plate">
        <div className="absolute inset-0 -z-10 md:left-auto md:w-[62%]">
          <Image
            src={featured.imageUrl}
            alt=""
            fill
            preload
            sizes="(min-width: 768px) 62vw, 100vw"
            className="object-cover object-[65%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/75 md:bg-transparent md:bg-linear-to-r md:from-ink md:via-ink/40 md:via-30% md:to-transparent"
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <h1 className="font-wide text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-extrabold text-balance">
              Uitrusting voor de echte wereld.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-plate/85">
              Schepen, jack-in chairs en wapentuig voor de bemanningen van Zion.
              Gratis verzonden, met 30 dagen bedenktijd.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/producten" className="btn btn-primary focus-visible:outline-plate">
                Bekijk alle producten
              </Link>
              <Link
                href={`/producten/${featured.id}`}
                className="btn border border-plate/70 text-plate hover:bg-plate hover:text-ink focus-visible:outline-plate"
              >
                Bekijk de {featured.name}
              </Link>
            </div>
          </div>
        </div>

        <p className="absolute inset-x-0 bottom-5 mx-auto hidden max-w-6xl px-6 text-right text-sm text-plate/75 md:block">
          Op de foto: {featured.name}, het schip van Morpheus ·{" "}
          <span className="tabular">{formatPrice(featured.price)}</span>
        </p>
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
