import { Cable, type LucideIcon, Radar, RotateCcw, Ship, Shirt, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/brand.config";
import { PromoCode } from "@/components/home/promo-code";
import { Price } from "@/components/shop/price";
import { ProductRow } from "@/components/shop/product-card";
import { categories, getBestSellingProducts, getDeals, getProductById } from "@/lib/data";
import type { CategorySlug } from "@/lib/types";

const categoryIcons: Record<CategorySlug, LucideIcon> = {
  schepen: Ship,
  "jack-in": Cable,
  verdediging: Radar,
  uitrusting: Shirt,
};

const promises = [
  { icon: Truck, title: "Altijd gratis verzonden", text: brand.deliveryPromise },
  { icon: RotateCcw, title: `${brand.returnDays} dagen bedenktijd`, text: "Retourneren is gratis" },
  { icon: ShieldCheck, title: "Veilig betalen", text: "Met iDEAL, creditcard of achteraf" },
];

export default function HomePage() {
  // De Nebuchadnezzar is het vlaggenschip van de catalogus.
  const featured = getProductById(1)!;
  const bestSellers = getBestSellingProducts(5);
  const deals = getDeals().slice(0, 5);

  return (
    <div className="container-shop space-y-8 py-4 md:space-y-10 md:py-6">
      <section className="grid gap-3 lg:grid-cols-[1fr_320px] lg:gap-4">
        <div className="relative isolate overflow-hidden rounded bg-brand-deep text-white">
          <Image
            src={featured.imageUrl}
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 900px, 100vw"
            className="-z-10 object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-t from-brand-deep via-brand-deep/70 to-brand-deep/10 md:bg-linear-to-r md:from-brand-deep md:via-brand-deep/60 md:via-40% md:to-transparent"
          />
          <div className="flex min-h-[340px] flex-col justify-end p-6 md:min-h-[400px] md:max-w-2xl md:justify-center md:p-10">
            <p className="text-sm font-semibold text-white/80">Vlaggenschip van de catalogus</p>
            <h1 className="mt-2 font-wide text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.05] font-extrabold text-balance">
              De Nebuchadnezzar, klaar voor vertrek
            </h1>
            <p className="mt-3 max-w-md text-white/85">
              Het schip van Morpheus, met jack-in chairs, operatorpost en
              EMP aan boord. Levering in overleg.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href={`/producten/${featured.id}`} className="btn btn-lg bg-white text-brand-deep hover:bg-white/90 focus-visible:outline-white">
                Bekijk het schip
              </Link>
              <Price value={featured.price} size="md" inverted />
            </div>
          </div>
        </div>

        <aside
          aria-label="Kortingscode"
          className="flex flex-col justify-center gap-6 rounded bg-accent p-6 text-white"
        >
          <div>
            <p className="font-wide text-5xl leading-none font-extrabold">10%</p>
            <p className="mt-2 text-lg font-semibold">korting op je hele bestelling</p>
            <p className="mt-1 text-sm text-white/85">
              Vul de code in bij je winkelwagen. Geldt ook op aanbiedingen.
            </p>
          </div>
          <PromoCode code="MECH10" />
        </aside>
      </section>

      <section aria-labelledby="categories-title">
        <h2 id="categories-title" className="mb-3 text-lg font-bold md:text-xl">
          Shop per categorie
        </h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug];
            return (
              <li key={c.slug}>
                <Link
                  href={`/producten?categorie=${c.slug}`}
                  className="tile group flex h-full items-start gap-3 p-4 hover:border-brand"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink group-hover:text-brand group-hover:underline">
                      {c.name}
                    </span>
                    <span className="mt-0.5 hidden text-sm text-muted sm:block">{c.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ProductRow title="Meest verkocht" products={bestSellers} href="/producten" />
      <ProductRow title="Aanbiedingen" products={deals} href="/producten?aanbieding=1" />

      <section aria-label="Onze beloftes" className="tile grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {promises.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4 p-5">
            <Icon aria-hidden="true" className="size-8 shrink-0 text-success" strokeWidth={1.5} />
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
