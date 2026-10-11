"use client";

import Link from "next/link";
import { useState } from "react";
import { shop } from "@/lib/store";
import { QuantityStepper } from "./quantity-stepper";

/** Snelle knop in de productlijst: voegt één stuk toe. */
export function QuickAddButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-secondary text-sm"
      onClick={() => {
        shop.addToCart(productId, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }}
      aria-live="polite"
    >
      {added ? "Toegevoegd" : "In winkelwagen"}
    </button>
  );
}

/** Aantal kiezen en toevoegen, voor de productdetailpagina. */
export function AddToCartForm({ productId }: { productId: number }) {
  const [quantity, setQuantity] = useState(1);
  const [addedCount, setAddedCount] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label="Aantal" />
        <button
          type="button"
          className="btn btn-primary flex-1 sm:flex-none"
          onClick={() => {
            shop.addToCart(productId, quantity);
            setAddedCount(quantity);
          }}
        >
          In winkelwagen
        </button>
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm">
        {addedCount !== null && (
          <>
            {addedCount} {addedCount === 1 ? "stuk" : "stuks"} toegevoegd.{" "}
            <Link
              href="/winkelwagen"
              className="font-semibold underline underline-offset-4 hover:text-signal"
            >
              Naar winkelwagen
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
