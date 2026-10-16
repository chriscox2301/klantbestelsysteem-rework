"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SummaryRows } from "@/components/cart/summary-rows";
import { useCartLines } from "@/components/cart/use-cart-lines";
import { brand } from "@/brand.config";
import { DeliveryPromise } from "@/components/shop/delivery-promise";
import { ProductImage } from "@/components/shop/product-image";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { getCustomerById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { shop, useHydrated } from "@/lib/store";

export function CartView() {
  const hydrated = useHydrated();
  const { lines, totals, count, customerId, discountCode } = useCartLines();

  if (!hydrated) {
    return <p className="py-16 text-center text-muted">Winkelwagen laden…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="tile mx-auto max-w-xl px-6 py-12 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <ShoppingCart aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-4 text-xl font-bold">Je winkelwagen is leeg</h1>
        <p className="mt-1 text-muted">
          Zoek een product of bekijk de catalogus. Alles wordt gratis verzonden.
        </p>
        <Link href="/producten" className="btn btn-primary mt-6">
          Verder winkelen
        </Link>
      </div>
    );
  }

  const customer = customerId !== null ? getCustomerById(customerId) : null;
  const checkout = customer ? (
    <Link href="/bestellen" className="btn btn-lg btn-primary w-full">
      Verder naar bestellen
    </Link>
  ) : (
    <Link href="/account" className="btn btn-lg btn-primary w-full">
      Inloggen en bestellen
    </Link>
  );

  return (
    <>
      <h1 className="text-xl font-bold md:text-2xl">
        Winkelwagen <span className="font-normal text-muted tabular">({count} {count === 1 ? "artikel" : "artikelen"})</span>
      </h1>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_360px]">
        <ul aria-label="Producten in je winkelwagen" className="tile divide-y divide-line">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 p-4 sm:grid-cols-[120px_1fr_auto]">
              <Link href={`/producten/${product.id}`} tabIndex={-1} aria-hidden="true" className="row-span-2 self-start sm:row-span-1">
                <ProductImage product={product} sizes="120px" />
              </Link>
              <div className="min-w-0 space-y-1">
                <Link href={`/producten/${product.id}`} className="link line-clamp-2 font-medium">
                  {product.name}
                </Link>
                <p className="text-xs text-muted tabular">{formatPrice(product.price)} per stuk</p>
                <DeliveryPromise stock={product.stock} text={product.deliveryText} />
              </div>
              <div className="col-start-2 flex flex-wrap items-center justify-between gap-3 sm:col-start-3 sm:row-start-1 sm:flex-col sm:items-end sm:justify-start">
                <p className="font-wide text-lg font-bold tabular sm:order-first">
                  {formatPrice(product.price * quantity)}
                </p>
                <div className="flex items-center gap-1">
                  <QuantityStepper
                    value={quantity}
                    onChange={(q) => shop.setQuantity(product.id, q)}
                    label={`Aantal ${product.name}`}
                    max={Math.max(1, Math.min(product.stock, 50))}
                  />
                  <button
                    type="button"
                    onClick={() => shop.removeFromCart(product.id)}
                    className="flex size-10 items-center justify-center rounded-md text-muted hover:bg-page hover:text-danger"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    <span className="sr-only">Verwijder {product.name}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside aria-label="Overzicht" className="space-y-4 lg:sticky lg:top-24">
          <div className="tile space-y-4 p-4 md:p-5">
            <h2 className="text-lg font-bold">Overzicht</h2>
            <SummaryRows {...totals} discountCode={discountCode} />
            <DiscountForm appliedCode={discountCode} />
            <div className="hidden lg:block">{checkout}</div>
            {customer ? (
              <p className="text-center text-xs text-muted">
                Je bestelt als <strong className="text-ink">{customer.name}</strong>.{" "}
                <Link href="/account" className="link">Wissel van account</Link>
              </p>
            ) : (
              <p className="text-center text-xs text-muted">
                Log in om af te rekenen. Je winkelwagen blijft bewaard.
              </p>
            )}
          </div>
          <ul className="flex flex-wrap justify-center gap-1.5" aria-label="Betaalmethodes">
            {brand.paymentMethods.map((m) => (
              <li key={m} className="rounded border border-line bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted">
                {m}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Mobiel: totaal en knop blijven onderaan in beeld. */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-line bg-surface px-4 py-3 shadow-[0_-4px_16px_rgb(0_0_0/0.08)] lg:hidden">
        <p className="shrink-0 tabular">
          <span className="block text-xs text-muted">Totaal</span>
          <span className="font-wide text-lg font-bold">{formatPrice(totals.total)}</span>
        </p>
        <div className="flex-1">{checkout}</div>
      </div>
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}

function DiscountForm({ appliedCode }: { appliedCode: string | null }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (appliedCode) {
    return (
      <p className="flex items-center justify-between rounded bg-success/5 px-3 py-2 text-sm">
        <span>
          Code <strong>{appliedCode}</strong> toegepast
        </span>
        <button type="button" onClick={() => shop.removeDiscount()} className="link text-sm">
          Verwijderen
        </button>
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!code.trim()) return;
        if (shop.applyDiscount(code)) {
          setCode("");
          setError(null);
        } else {
          setError(`“${code.trim()}” is geen geldige kortingscode.`);
        }
      }}
    >
      <label htmlFor="discount" className="mb-1 block text-sm font-medium">
        Kortingscode
      </label>
      <div className="flex gap-2">
        <input
          id="discount"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "discount-error" : undefined}
          className="field h-10 uppercase"
        />
        <button type="submit" className="btn btn-secondary">
          Toepassen
        </button>
      </div>
      {error && (
        <p id="discount-error" className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
}
