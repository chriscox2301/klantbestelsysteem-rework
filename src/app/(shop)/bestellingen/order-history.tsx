"use client";

import { ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { OrderLines } from "@/components/order-lines";
import { getCustomerById } from "@/lib/data";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { getOrdersFor, orderTotals, useHydrated, useShop } from "@/lib/store";
import type { OrderStatus } from "@/lib/types";

const statusStyle: Record<OrderStatus, string> = {
  Verwerkt: "bg-brand-soft text-brand",
  Onderweg: "bg-accent-soft text-accent-hover",
  Bezorgd: "bg-success/10 text-success",
  Geannuleerd: "bg-page text-muted line-through decoration-1",
};

export function OrderHistory() {
  const hydrated = useHydrated();
  const shopState = useShop();

  if (!hydrated) {
    return <p className="py-16 text-center text-muted">Bestellingen laden…</p>;
  }

  const customer = shopState.customerId !== null ? getCustomerById(shopState.customerId) : null;

  if (!customer) {
    return (
      <EmptyState title="Log in om je bestellingen te zien">
        <p>Je bestellingen zijn gekoppeld aan je account.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/account" className="btn btn-primary">Inloggen</Link>
          <Link href="/producten" className="btn btn-secondary">Bekijk alle producten</Link>
        </div>
      </EmptyState>
    );
  }

  const orders = getOrdersFor(shopState, customer.id);

  if (orders.length === 0) {
    return (
      <EmptyState title={`${customer.name} heeft nog niets besteld`}>
        <p>Je bestellingen verschijnen hier zodra je er een plaatst.</p>
        <Link href="/producten" className="btn btn-primary mt-6">Bekijk alle producten</Link>
      </EmptyState>
    );
  }

  return (
    <>
      <p className="mt-0.5 text-sm text-muted">
        {orders.length} {orders.length === 1 ? "bestelling" : "bestellingen"} van{" "}
        <strong className="text-ink">{customer.name}</strong>
      </p>
      <ul className="mt-4 space-y-3">
        {orders.map((order, i) => (
          <li key={order.id} className="tile">
            <details open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center gap-4 rounded p-4 hover:bg-page/60 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold">Bestelling {order.id}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[order.status]}`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    {formatDate(order.orderDate)} om {formatTime(order.orderDate)}
                  </p>
                </div>
                <span className="font-wide font-bold whitespace-nowrap tabular">{formatPrice(orderTotals(order).total)}</span>
                <ChevronDown aria-hidden="true" className="size-5 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-line px-4 pb-4">
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
    <div className="tile mt-4 flex flex-col items-center px-6 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Package aria-hidden="true" className="size-6" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-balance">{title}</h2>
      <div className="mt-1 max-w-md text-muted">{children}</div>
    </div>
  );
}
