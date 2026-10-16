import type { Metadata } from "next";
import { CartView } from "./cart-view";

export const metadata: Metadata = { title: "Winkelwagen" };

export default function CartPage() {
  return (
    <div className="container-shop py-4 md:py-6">
      <CartView />
    </div>
  );
}
