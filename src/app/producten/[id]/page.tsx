import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart";
import { ProductTile } from "@/components/product-tile";
import { getAllProducts, getProductById } from "@/lib/data";
import { formatPrice, partNumber } from "@/lib/format";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/producten/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  return { title: product?.name ?? "Product niet gevonden" };
}

const promises = [
  "Gratis verzending",
  "30 dagen bedenktijd en gratis retourneren",
  "Wettelijke garantie via Matrix Inc.",
];

export default async function ProductPage({
  params,
}: PageProps<"/producten/[id]">) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const others = getAllProducts().filter((p) => p.id !== product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <nav aria-label="Kruimelpad" className="text-sm text-graphite">
        <Link href="/producten" className="hover:text-ink">
          Producten
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page" className="text-ink">{product.name}</span>
      </nav>

      <article className="mt-6 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-graphite tabular">
            Productnummer {partNumber(product.id)}
          </p>
          <h1 className="mt-2 font-wide text-[clamp(2rem,4.5vw,3.25rem)] leading-[1] font-extrabold text-balance">
            {product.name}
          </h1>
          <p className="mt-5 max-w-prose text-lg text-graphite">
            {product.description}
          </p>

          <p className="mt-8 border-t-2 border-ink pt-5 font-wide text-4xl font-bold tabular">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-sm text-graphite">Inclusief btw en verzending</p>

          <div className="mt-6">
            <AddToCartForm productId={product.id} />
          </div>

          <ul className="mt-6 space-y-2 border-t border-rule pt-5 text-sm">
            {promises.map((text) => (
              <li key={text} className="flex gap-3">
                <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-go" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </article>

      {others.length > 0 && (
        <section className="mt-20">
          <h2 className="font-wide text-2xl font-bold">Bekijk ook</h2>
          <ul className="mt-6 grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {others.map((p) => (
              <li key={p.id}>
                <ProductTile product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
