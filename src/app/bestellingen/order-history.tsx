"use client";

import Link from "next/link";
import { OrderLines } from "@/components/order-lines";
import { getCustomerById } from "@/lib/data";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { getOrdersFor, orderTotals, useHydrated, useShop } from "@/lib/store";
import type { OrderStatus } from "@/lib/types";

const statusStyle: Record<OrderStatus, string> = {
  Verwerkt: "bg-ink text-plate",
  Onderweg: "bg-signal text-white",
  Bezorgd: "bg-go text-white",
  Geannuleerd: "border border-rule text-graphite line-through decoration-1",
};

export function OrderHistory() {
  const hydrated = useHydrated();
  const shopState = useShop();

  if (!hydrated) {
    return <p className="py-16 text-graphite">Bestellingen laden…</p>;
  }

  const customer =
    shopState.customerId !== null ? getCustomerById(shopState.customerId) : null;

  if (!customer) {
    return (
      <div className="py-16">
        <h2 className="text-2xl font-semibold">Log in om je bestellingen te zien</h2>
        <p className="mt-2 text-graphite">
          Je bestellingen zijn gekoppeld aan je account.
        </p>
        <Link href="/account" className="btn btn-primary mt-6">
          Inloggen
        </Link>
      </div>
    );
  }

  const orders = getOrdersFor(shopState, customer.id);

  if (orders.length === 0) {
    return (
      <div className="py-16">
        <h2 className="text-2xl font-semibold">{customer.name} heeft nog niets besteld</h2>
        <p className="mt-2 text-graphite">Je bestellingen verschijnen hier zodra je er een plaatst.</p>
        <Link href="/producten" className="btn btn-primary mt-6">
          Bekijk alle producten
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-4 text-graphite">
        {orders.length} {orders.length === 1 ? "bestelling" : "bestellingen"} van{" "}
        <strong className="text-ink">{customer.name}</strong>
      </p>
      <ul className="mt-8 border-t border-rule">
        {orders.map((order, i) => (
          <li key={order.id} className="border-b border-rule">
            <details open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-2 py-5 [&::-webkit-details-marker]:hidden">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 shrink-0 transition-transform group-open:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
                <span className="font-semibold">
                  Bestelling {order.id}
                </span>
                <span className="text-graphite">
                  {formatDate(order.orderDate)}, {formatTime(order.orderDate)}
                </span>
                <span className="ml-auto flex items-center gap-4">
                  <span className="tabular font-semibold">
                    {formatPrice(orderTotals(order).total)}
                  </span>
                  <span className={`rounded-sm px-2 py-0.5 text-sm ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </span>
              </summary>
              <div className="pb-6 pl-10">
                <OrderLines order={order} />
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
