"use client";

import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DeliveryPromise } from "@/components/shop/delivery-promise";
import { Price } from "@/components/shop/price";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { brand } from "@/brand.config";
import { shop } from "@/lib/store";
import type { Product } from "@/lib/types";

const promises = [
  "Altijd gratis verzending",
  `${brand.returnDays} dagen bedenktijd en gratis retourneren`,
  "Wettelijke garantie via Matrix Inc.",
];

/**
 * Koopblok op de productpagina. Op mobiel verschijnt een vaste balk met prijs
 * en koopknop zodra het blok uit beeld scrolt.
 */
export function BuyBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [addedCount, setAddedCount] = useState<number | null>(null);
  const [showBar, setShowBar] = useState(false);
  const [flash, setFlash] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const soldOut = product.stock <= 0;
  const max = Math.max(1, Math.min(product.stock, 50));

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      // Alleen tonen als het blok boven de viewport is verdwenen.
      setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function add(n: number) {
    shop.addToCart(product.id, n);
    setAddedCount(n);
    setFlash(true);
    setTimeout(() => setFlash(false), 1600);
  }

  return (
    <>
      <div ref={box} className="tile space-y-4 p-4 md:p-5">
        <Price value={product.price} oldValue={product.oldPrice} size="lg" />
        <DeliveryPromise stock={product.stock} text={product.deliveryText} size="md" />

        <div className="flex gap-2">
          <QuantityStepper value={quantity} onChange={setQuantity} label="Aantal" max={max} />
          <button
            type="button"
            disabled={soldOut}
            onClick={() => add(quantity)}
            className="btn btn-lg btn-primary h-10 flex-1 px-4 text-base"
          >
            <ShoppingCart aria-hidden="true" className="size-5" />
            In winkelwagen
          </button>
        </div>

        <div role="status">
          {addedCount !== null && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-success/30 bg-success/5 px-3 py-2 text-sm">
              <p className="flex items-center gap-2 font-medium text-success">
                <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                {addedCount} {addedCount === 1 ? "stuk" : "stuks"} toegevoegd
              </p>
              <Link href="/winkelwagen" className="link">
                Bekijk winkelwagen
              </Link>
            </div>
          )}
        </div>

        <ul className="space-y-1.5 border-t border-line pt-4 text-sm">
          {promises.map((text) => (
            <li key={text} className="flex gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3 shadow-[0_-4px_16px_rgb(0_0_0/0.08)] transition-transform duration-200 lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Price value={product.price} oldValue={product.oldPrice} size="md" />
        <button
          type="button"
          disabled={soldOut}
          onClick={() => add(1)}
          className={`btn btn-lg ${flash ? "bg-success text-white" : "btn-primary"}`}
        >
          {flash ? (
            <Check aria-hidden="true" className="size-5" strokeWidth={3} />
          ) : (
            <ShoppingCart aria-hidden="true" className="size-5" />
          )}
          {flash ? "Toegevoegd" : "In winkelwagen"}
        </button>
      </div>
    </>
  );
}
