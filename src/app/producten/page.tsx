import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { QuickAddButton } from "@/components/add-to-cart";
import { getAllProducts, searchProducts } from "@/lib/data";
import { formatPrice, partNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Producten" };

export default function ProductsPage({ searchParams }: PageProps<"/producten">) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <Suspense fallback={<Heading />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function Heading({ query, count }: { query?: string; count?: number }) {
  return (
    <div className="border-b-2 border-ink pb-4">
      <h1 className="font-wide text-4xl font-extrabold sm:text-5xl">
        {query ? `Zoekresultaten` : "Alle producten"}
      </h1>
      {count !== undefined && (
        <p className="mt-2 text-graphite">
          {query ? (
            <>
              {count} {count === 1 ? "product" : "producten"} voor “{query}”.{" "}
              <Link href="/producten" className="underline underline-offset-4 hover:text-signal">
                Toon alles
              </Link>
            </>
          ) : (
            `${count} producten in de catalogus`
          )}
        </p>
      )}
    </div>
  );
}

async function Results({
  searchParams,
}: {
  searchParams: PageProps<"/producten">["searchParams"];
}) {
  const { zoek } = await searchParams;
  const query = typeof zoek === "string" ? zoek.trim() : "";
  const products = query ? searchProducts(query) : getAllProducts();

  return (
    <>
      <Heading query={query} count={products.length} />

      {products.length === 0 ? (
        <div className="py-16">
          <h2 className="text-2xl font-semibold">Niets gevonden voor “{query}”</h2>
          <p className="mt-2 max-w-md text-graphite">
            Controleer de spelling of zoek op een kortere term, zoals
            “schip” of “EMP”.
          </p>
          <Link href="/producten" className="btn btn-primary mt-6">
            Bekijk alle producten
          </Link>
        </div>
      ) : (
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 border-b border-rule py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-x-8"
            >
              <Link
                href={`/producten/${product.id}`}
                className="relative row-span-2 aspect-square overflow-hidden bg-plate sm:row-span-1"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={product.imageUrl}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </Link>
              <div>
                <p className="text-sm text-graphite tabular">{partNumber(product.id)}</p>
                <h2 className="mt-1 text-xl font-semibold">
                  <Link href={`/producten/${product.id}`} className="hover:text-signal">
                    {product.name}
                  </Link>
                </h2>
                <p className="mt-2 max-w-prose text-graphite">{product.description}</p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <p className="font-wide text-xl font-bold tabular">
                  {formatPrice(product.price)}
                </p>
                <QuickAddButton productId={product.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
