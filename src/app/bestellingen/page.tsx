import type { Metadata } from "next";
import { OrderHistory } from "./order-history";

export const metadata: Metadata = { title: "Bestellingen" };

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6">
      <h1 className="border-b-2 border-ink pb-4 font-wide text-4xl font-extrabold sm:text-5xl">
        Bestellingen
      </h1>
      <OrderHistory />
    </div>
  );
}
