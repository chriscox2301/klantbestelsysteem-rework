"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { shop } from "@/lib/store";

/** Compacte koopknop op productkaarten: voegt één stuk toe. */
export function AddToCartButton({
  productId,
  productName,
  disabled,
}: {
  productId: number;
  productName: string;
  disabled?: boolean;
}) {
  const [added, setAdded] = useState(false);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          shop.addToCart(productId, 1);
          setAdded(true);
          setTimeout(() => setAdded(false), 1600);
        }}
        className={`btn size-10 shrink-0 p-0 ${added ? "bg-success text-white" : "btn-primary"}`}
      >
        {added ? (
          <Check aria-hidden="true" className="size-5" strokeWidth={2.5} />
        ) : (
          <ShoppingCart aria-hidden="true" className="size-5" />
        )}
        <span className="sr-only">{productName} in winkelwagen</span>
      </button>
      <span role="status" className="sr-only">
        {added ? `${productName} toegevoegd aan je winkelwagen` : ""}
      </span>
    </>
  );
}
