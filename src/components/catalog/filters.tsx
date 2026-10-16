"use client";

import { SlidersHorizontal, X } from "lucide-react";
import Form from "next/form";
import { useRef } from "react";
import { categories, sortOptions } from "@/lib/data";
import type { CategorySlug } from "@/lib/types";

export type CatalogParams = {
  zoek: string;
  categorie: CategorySlug | "";
  voorraad: boolean;
  aanbieding: boolean;
  sort: string;
};

type FilterProps = {
  params: CatalogParams;
  counts: Record<CategorySlug, number>;
  total: number;
};

/** Verborgen velden zodat zoekterm en sortering bewaard blijven bij filteren. */
function Keep({ params, except }: { params: CatalogParams; except: (keyof CatalogParams)[] }) {
  return (
    <>
      {params.zoek && !except.includes("zoek") && <input type="hidden" name="zoek" value={params.zoek} />}
      {params.sort && params.sort !== "relevantie" && !except.includes("sort") && (
        <input type="hidden" name="sort" value={params.sort} />
      )}
    </>
  );
}

function FilterFields({ params, counts, total, idPrefix }: FilterProps & { idPrefix: string }) {
  const option =
    "flex min-h-9 cursor-pointer items-center gap-2.5 rounded px-1 text-sm hover:bg-page has-[:checked]:font-semibold";
  return (
    <>
      <fieldset className="border-b border-line p-4">
        <legend className="float-left mb-2 w-full text-sm font-bold">Categorie</legend>
        <label className={option}>
          <input type="radio" name="categorie" value="" defaultChecked={!params.categorie} className="size-4 accent-brand" />
          <span className="flex-1">Alle categorieën</span>
          <span className="text-xs text-muted tabular">{total}</span>
        </label>
        {categories.map((c) => (
          <label key={c.slug} className={option}>
            <input
              type="radio"
              name="categorie"
              value={c.slug}
              defaultChecked={params.categorie === c.slug}
              className="size-4 accent-brand"
            />
            <span className="flex-1">{c.name}</span>
            <span className="text-xs text-muted tabular">{counts[c.slug]}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="p-4">
        <legend className="float-left mb-2 w-full text-sm font-bold">Beschikbaarheid</legend>
        <label className={option} htmlFor={`${idPrefix}-voorraad`}>
          <input id={`${idPrefix}-voorraad`} type="checkbox" name="voorraad" value="1" defaultChecked={params.voorraad} className="size-4 accent-brand" />
          Op voorraad
        </label>
        <label className={option} htmlFor={`${idPrefix}-aanbieding`}>
          <input id={`${idPrefix}-aanbieding`} type="checkbox" name="aanbieding" value="1" defaultChecked={params.aanbieding} className="size-4 accent-brand" />
          In de aanbieding
        </label>
      </fieldset>
    </>
  );
}

/** Filters in de zijbalk (desktop): elke wijziging werkt de resultaten direct bij. */
export function FilterSidebar(props: FilterProps) {
  // key: bij navigatie opnieuw opbouwen, zodat defaultChecked de URL volgt.
  const key = JSON.stringify(props.params);
  return (
    <Form
      key={key}
      action="/producten"
      scroll={false}
      onChange={(e) => e.currentTarget.requestSubmit()}
      aria-label="Filters"
      className="tile"
    >
      <h2 className="border-b border-line px-4 py-3 font-bold">Filters</h2>
      <Keep params={props.params} except={[]} />
      <FilterFields {...props} idPrefix="side" />
      <noscript>
        <div className="p-4 pt-0">
          <button type="submit" className="btn btn-primary w-full">Filters toepassen</button>
        </div>
      </noscript>
    </Form>
  );
}

/** Mobiel: knop "Filters (n)" opent een volledig scherm met de filters. */
export function FilterDrawer({ activeCount, ...props }: FilterProps & { activeCount: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const key = JSON.stringify(props.params);
  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className="btn btn-secondary flex-1">
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        Filters{activeCount > 0 && ` (${activeCount})`}
      </button>
      <dialog
        ref={dialog}
        aria-label="Filters"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-page p-0 backdrop:bg-black/40"
      >
        <Form key={key} action="/producten" onSubmit={() => dialog.current?.close()} className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2">
            <h2 className="font-bold">Filters</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="flex size-11 items-center justify-center rounded-md hover:bg-page"
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Sluiten</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-surface">
            <Keep params={props.params} except={[]} />
            <FilterFields {...props} idPrefix="drawer" />
          </div>
          <div className="border-t border-line bg-surface p-3">
            <button type="submit" className="btn btn-lg btn-primary w-full">
              Toon resultaten
            </button>
          </div>
        </Form>
      </dialog>
    </>
  );
}

export function SortSelect({ params, className = "" }: { params: CatalogParams; className?: string }) {
  return (
    <Form
      key={params.sort}
      action="/producten"
      scroll={false}
      onChange={(e) => e.currentTarget.requestSubmit()}
      className={`flex items-center gap-2 ${className}`}
    >
      {params.zoek && <input type="hidden" name="zoek" value={params.zoek} />}
      {params.categorie && <input type="hidden" name="categorie" value={params.categorie} />}
      {params.voorraad && <input type="hidden" name="voorraad" value="1" />}
      {params.aanbieding && <input type="hidden" name="aanbieding" value="1" />}
      <label htmlFor="sort" className="text-sm whitespace-nowrap text-muted">
        Sorteer op
      </label>
      <select
        id="sort"
        name="sort"
        defaultValue={params.sort || "relevantie"}
        className="field h-10 w-auto min-w-0 flex-1 pr-8 text-sm"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="btn btn-secondary">Sorteren</button>
      </noscript>
    </Form>
  );
}
