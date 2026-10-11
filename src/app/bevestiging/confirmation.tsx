"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OrderLines } from "@/components/order-lines";
import { formatDate } from "@/lib/format";
import { findOrder, useHydrated, useShop } from "@/lib/store";

const deliveryText = {
  standard: "binnen 2–3 werkdagen",
  express: "morgen",
  evening: "tussen 18:00 en 22:00",
} as const;

export function Confirmation() {
  const hydrated = useHydrated();
  const shopState = useShop();
  const id = Number(useSearchParams().get("order"));

  if (!hydrated) return <p className="text-graphite">Bestelling laden…</p>;

  const order = findOrder(shopState, id);

  if (!order) {
    return (
      <div>
        <h1 className="font-wide text-3xl font-extrabold">Bestelling niet gevonden</h1>
        <p className="mt-2 text-graphite">
          Bekijk je bestellingen om de status van een bestelling te controleren.
        </p>
        <Link href="/bestellingen" className="btn btn-primary mt-6">
          Naar bestellingen
        </Link>
      </div>
    );
  }

  const a = order.address;

  return (
    <div>
      <p className="flex items-center gap-2 font-semibold text-go">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8.5l3 3 7-7" />
        </svg>
        Bestelling {order.id} geplaatst op {formatDate(order.orderDate)}
      </p>
      <h1 className="mt-4 font-wide text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] font-extrabold">
        Bedankt voor je bestelling.
      </h1>
      {a && order.delivery && (
        <p className="mt-6 max-w-prose text-lg text-graphite">
          We bezorgen {deliveryText[order.delivery]} bij {a.firstName} {a.lastName},{" "}
          {a.street} {a.houseNumber}, {a.postalCode.toUpperCase()} {a.city}.
        </p>
      )}

      <div className="mt-10 border-t-2 border-ink pt-2">
        <OrderLines order={order} />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/bestellingen" className="btn btn-primary">
          Bekijk bestellingen
        </Link>
        <Link href="/producten" className="btn btn-secondary">
          Verder winkelen
        </Link>
      </div>
    </div>
  );
}
