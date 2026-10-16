import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/product/buy-box";
import { Badge } from "@/components/shop/badge";
import { Breadcrumbs } from "@/components/shop/breadcrumbs";
import { ProductRow } from "@/components/shop/product-card";
import { ProductImage } from "@/components/shop/product-image";
import { Rating } from "@/components/shop/rating";
import { getAllProducts, getCategory, getProductById } from "@/lib/data";
import { partNumber } from "@/lib/format";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps<"/producten/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: "Product niet gevonden" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/producten/[id]">) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();
  const category = getCategory(product.category)!;

  // Eerst uit dezelfde categorie, daarna aangevuld met de rest.
  const others = getAllProducts().filter((p) => p.id !== product.id);
  const related = [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, 5);

  const specs = { Productnummer: partNumber(product.id), Categorie: category.name, ...product.specs };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: partNumber(product.id),
    ...(product.imageUrl && { image: product.imageUrl }),
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-shop space-y-8 py-4 pb-24 md:space-y-10 md:py-6 lg:pb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category.name, href: `/producten?categorie=${category.slug}` },
            { label: product.name },
          ]}
        />

        <article className="mt-3 grid items-start gap-4 lg:grid-cols-[1fr_400px] lg:gap-8">
          <div className="space-y-4">
            <div className="tile relative p-3">
              {product.badge && (
                <div className="absolute top-6 left-6 z-10">
                  <Badge type={product.badge} />
                </div>
              )}
              <ProductImage product={product} alt={product.name} preload sizes="(min-width: 1024px) 800px, 100vw" />
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:row-span-2">
            <div>
              <Link href={`/producten?categorie=${category.slug}`} className="link text-sm">
                {category.name}
              </Link>
              <h1 className="mt-1 text-xl font-bold text-balance md:text-2xl">{product.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                {product.rating !== undefined && (
                  <a href="#reviews" className="hover:underline">
                    <Rating value={product.rating} count={product.reviewCount} size="md" />
                  </a>
                )}
                <span className="text-sm text-muted tabular">{partNumber(product.id)}</span>
              </div>
              {product.highlights && (
                <ul className="mt-4 space-y-1.5 text-sm">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <BuyBox product={product} />
          </div>

          <div className="space-y-4">
            <section className="tile p-4 md:p-6" aria-labelledby="desc-title">
              <h2 id="desc-title" className="text-lg font-bold">Beschrijving</h2>
              <p className="mt-2 max-w-prose leading-relaxed">{product.description}</p>
            </section>

            <section className="tile p-4 md:p-6" aria-labelledby="specs-title">
              <h2 id="specs-title" className="text-lg font-bold">Specificaties</h2>
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key} className="odd:bg-page">
                      <th scope="row" className="w-2/5 px-3 py-2 text-left font-normal text-muted sm:w-1/3">
                        {key}
                      </th>
                      <td className="px-3 py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {product.rating !== undefined && product.reviewCount !== undefined && (
              <section id="reviews" className="tile scroll-mt-28 p-4 md:p-6" aria-labelledby="reviews-title">
                <h2 id="reviews-title" className="text-lg font-bold">Beoordelingen</h2>
                <div className="mt-3 flex items-center gap-4">
                  <p className="font-wide text-4xl font-bold tabular">
                    {product.rating.toFixed(1).replace(".", ",")}
                  </p>
                  <div>
                    <Rating value={product.rating} size="md" />
                    <p className="mt-0.5 text-sm text-muted">
                      Gemiddelde van {product.reviewCount} beoordelingen
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </article>
      </div>

      <ProductRow title="Bekijk ook" products={related} />
    </div>
  );
}
