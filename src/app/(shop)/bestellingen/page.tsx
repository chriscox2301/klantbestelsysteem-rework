import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shop/breadcrumbs";
import { OrderHistory } from "./order-history";

export const metadata: Metadata = { title: "Mijn bestellingen" };

export default function OrdersPage() {
  return (
    <div className="container-shop max-w-4xl py-4 md:py-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mijn bestellingen" }]} />
      <h1 className="mt-3 text-xl font-bold md:text-2xl">Mijn bestellingen</h1>
      <OrderHistory />
    </div>
  );
}
