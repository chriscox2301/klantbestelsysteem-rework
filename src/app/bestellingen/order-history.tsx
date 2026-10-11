"use client";

import Link from "next/link";
import type { ReactNode } from "react";
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
      <EmptyState title="Log in om je bestellingen te zien">
        <p>
          Je bestellingen zijn gekoppeld aan je account. Nog niets besteld?
          Neem een kijkje in de catalogus.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/account" className="btn btn-primary">
            Inloggen
          </Link>
          <Link href="/producten" className="btn btn-secondary">
            Bekijk alle producten
          </Link>
        </div>
      </EmptyState>
    );
  }

  const orders = getOrdersFor(shopState, customer.id);

  if (orders.length === 0) {
    return (
      <EmptyState title={`${customer.name} heeft nog niets besteld`}>
        <p>Je bestellingen verschijnen hier zodra je er een plaatst.</p>
        <Link href="/producten" className="btn btn-primary mt-6">
          Bekijk alle producten
        </Link>
      </EmptyState>
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

function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-col items-center border border-dashed border-rule px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-steel">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        >
          <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
          <path d="M3 7.5 12 12l9-4.5M12 12v9" />
        </svg>
      </span>
      <h2 className="mt-5 text-2xl font-semibold text-balance">{title}</h2>
      <div className="mt-2 max-w-md text-graphite">{children}</div>
    </div>
  );
}
