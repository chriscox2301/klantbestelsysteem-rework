import type { Metadata } from "next";
import { CartView } from "./cart-view";

export const metadata: Metadata = { title: "Winkelwagen" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <h1 className="border-b-2 border-ink pb-4 font-wide text-4xl font-extrabold sm:text-5xl">
        Winkelwagen
      </h1>
      <CartView />
    </div>
  );
}
