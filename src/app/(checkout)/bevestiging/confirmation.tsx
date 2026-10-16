"use client";

import { CircleCheck, Mail, Truck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OrderLines } from "@/components/order-lines";
import { formatDeliveryDate, workdaysFrom } from "@/lib/format";
import { findOrder, useHydrated, useShop } from "@/lib/store";
import type { DeliveryMoment } from "@/lib/types";

const workdays: Record<DeliveryMoment, number> = { standard: 3, express: 1, evening: 2 };

export function Confirmation() {
  const hydrated = useHydrated();
  const shopState = useShop();
  const id = Number(useSearchParams().get("order"));

  if (!hydrated) return <p className="text-muted">Bestelling laden…</p>;

  const order = findOrder(shopState, id);

  if (!order) {
    return (
      <div className="tile p-8 text-center">
        <h1 className="text-xl font-bold">Bestelling niet gevonden</h1>
        <p className="mt-1 text-muted">
          Bekijk je bestellingen om de status van een bestelling te controleren.
        </p>
        <Link href="/bestellingen" className="btn btn-primary mt-6">
          Naar mijn bestellingen
        </Link>
      </div>
    );
  }

  const a = order.address;
  const deliveryDate = order.delivery
    ? formatDeliveryDate(workdaysFrom(new Date(order.orderDate), workdays[order.delivery]))
    : null;

  return (
    <div className="space-y-4">
      <div className="tile p-6 md:p-8">
        <CircleCheck aria-hidden="true" className="size-10 text-success" strokeWidth={1.75} />
        <h1 className="mt-3 text-2xl font-bold">Bedankt voor je bestelling</h1>
        <p className="mt-1 text-muted">
          Bestelnummer <strong className="text-ink tabular">{order.id}</strong>
        </p>

        <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
          {deliveryDate && (
            <div className="flex gap-3">
              <Truck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
              <div>
                <p className="font-semibold">Verwacht op {deliveryDate}</p>
                {a && (
                  <p className="text-sm text-muted">
                    {a.firstName} {a.lastName}, {a.street} {a.houseNumber},{" "}
                    {a.postalCode.toUpperCase()} {a.city}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
            <p className="text-sm text-muted">
              <span className="block font-semibold text-ink">Bevestiging volgt per e-mail</span>
              Daarin staat ook de link om je pakket te volgen.
            </p>
          </div>
        </div>
      </div>

      <section className="tile p-4 md:p-6" aria-labelledby="overview-title">
        <h2 id="overview-title" className="text-lg font-bold">Overzicht</h2>
        <OrderLines order={order} />
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/bestellingen" className="btn btn-primary">
          Naar mijn bestellingen
        </Link>
        <Link href="/producten" className="btn btn-secondary">
          Verder winkelen
        </Link>
      </div>
    </div>
  );
}
