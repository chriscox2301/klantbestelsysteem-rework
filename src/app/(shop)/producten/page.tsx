import { X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { type CatalogParams, FilterDrawer, FilterSidebar, SortSelect } from "@/components/catalog/filters";
import { Breadcrumbs } from "@/components/shop/breadcrumbs";
import { ProductCard } from "@/components/shop/product-card";
import { countByCategory, findProducts, getCategory, type SortKey, sortOptions } from "@/lib/data";

export const metadata: Metadata = { title: "Producten" };

export default function ProductsPage({ searchParams }: PageProps<"/producten">) {
  return (
    <div className="container-shop py-4 md:py-6">
      <Suspense fallback={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Producten" }]} />}>
        <Catalog searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const str = (v: string | string[] | undefined) => (typeof v === "string" ? v.trim() : "");

function hrefWith(params: CatalogParams, change: Partial<CatalogParams>) {
  const next = { ...params, ...change };
  const q = new URLSearchParams();
  if (next.zoek) q.set("zoek", next.zoek);
  if (next.categorie) q.set("categorie", next.categorie);
  if (next.voorraad) q.set("voorraad", "1");
  if (next.aanbieding) q.set("aanbieding", "1");
  if (next.sort && next.sort !== "relevantie") q.set("sort", next.sort);
  const s = q.toString();
  return s ? `/producten?${s}` : "/producten";
}

async function Catalog({ searchParams }: { searchParams: PageProps<"/producten">["searchParams"] }) {
  const raw = await searchParams;
  const category = getCategory(str(raw.categorie));
  const sort = sortOptions.find((o) => o.value === str(raw.sort))?.value ?? "relevantie";
  const params: CatalogParams = {
    zoek: str(raw.zoek),
    categorie: category?.slug ?? "",
    voorraad: str(raw.voorraad) === "1",
    aanbieding: str(raw.aanbieding) === "1",
    sort,
  };

  const results = findProducts({
    query: params.zoek,
    category: category?.slug,
    inStock: params.voorraad,
    onSale: params.aanbieding,
    sort: sort as SortKey,
  });
  const counts = countByCategory(params.zoek);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const chips: { label: string; href: string }[] = [];
  if (params.zoek) chips.push({ label: `“${params.zoek}”`, href: hrefWith(params, { zoek: "" }) });
  if (category) chips.push({ label: category.name, href: hrefWith(params, { categorie: "" }) });
  if (params.voorraad) chips.push({ label: "Op voorraad", href: hrefWith(params, { voorraad: false }) });
  if (params.aanbieding) chips.push({ label: "In de aanbieding", href: hrefWith(params, { aanbieding: false }) });
  const activeFilters = chips.length - (params.zoek ? 1 : 0);

  const title = params.zoek
    ? `Resultaten voor “${params.zoek}”`
    : params.aanbieding && !category
      ? "Aanbiedingen"
      : (category?.name ?? "Alle producten");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(category || params.zoek
            ? [{ label: "Producten", href: "/producten" }, { label: params.zoek ? "Zoeken" : category!.name }]
            : [{ label: "Producten" }]),
        ]}
      />

      <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
          <p className="mt-0.5 text-sm text-muted tabular">
            {results.length} {results.length === 1 ? "resultaat" : "resultaten"}
          </p>
        </div>
        <SortSelect params={params} className="hidden md:flex" />
      </div>

      {/* Mobiel: filters en sorteren naast elkaar, sticky onder de header. */}
      <div className="sticky top-[112px] z-30 -mx-4 mt-3 flex gap-2 border-b border-line bg-page/95 px-4 py-2 backdrop-blur md:hidden">
        <FilterDrawer params={params} counts={counts} total={total} activeCount={activeFilters} />
        <SortSelect params={params} className="flex-1 [&_label]:sr-only" />
      </div>

      {chips.length > 0 && (
        <ul className="mt-3 flex flex-wrap items-center gap-2" aria-label="Actieve filters">
          {chips.map((chip) => (
            <li key={chip.label}>
              <Link
                href={chip.href}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-brand-soft py-1 pr-2 pl-3 text-xs font-semibold text-brand hover:bg-brand hover:text-brand-contrast"
              >
                {chip.label}
                <X aria-hidden="true" className="size-3.5" />
                <span className="sr-only">verwijderen</span>
              </Link>
            </li>
          ))}
          {chips.length > 1 && (
            <li>
              <Link href="/producten" className="link px-1 text-xs">
                Wis alle filters
              </Link>
            </li>
          )}
        </ul>
      )}

      <div className="mt-4 grid items-start gap-4 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <FilterSidebar params={params} counts={counts} total={total} />
        </aside>

        {results.length === 0 ? (
          <div className="tile p-8">
            <h2 className="text-lg font-bold">
              {params.zoek ? `Niets gevonden voor “${params.zoek}”` : "Geen producten met deze filters"}
            </h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
              {params.zoek && <li>Controleer de spelling of zoek op een kortere term, zoals “schip” of “EMP”.</li>}
              {activeFilters > 0 && <li>Haal een of meer filters weg.</li>}
            </ul>
            <Link href="/producten" className="btn btn-primary mt-6">
              Bekijk alle producten
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product, i) => (
              <li key={product.id}>
                <ProductCard product={product} preload={i < 2} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
