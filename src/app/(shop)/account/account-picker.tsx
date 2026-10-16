"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { customers } from "@/lib/data";
import { shop, useShop } from "@/lib/store";

export function AccountPicker() {
  const { customerId, cart } = useShop();

  return (
    <>
      <ul className="tile mt-4 divide-y divide-line">
        {customers.map((c) => {
          const active = c.id === customerId;
          return (
            <li key={c.id} className={`flex items-center gap-4 p-4 ${active ? "bg-brand-soft" : ""}`}>
              <span
                aria-hidden="true"
                className={`flex size-11 shrink-0 items-center justify-center rounded-full font-wide font-bold ${
                  active ? "bg-brand text-brand-contrast" : "bg-page text-ink"
                }`}
              >
                {c.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted">{c.address}</p>
              </div>
              {active ? (
                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-1 text-sm font-semibold text-success sm:flex">
                    <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                    Ingelogd
                  </span>
                  <button type="button" onClick={() => shop.logOut()} className="btn btn-secondary">
                    Uitloggen
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => shop.logIn(c.id)} className="btn btn-primary">
                  Inloggen
                  <span className="sr-only"> als {c.name}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {customerId !== null && (
        <div className="mt-4 flex flex-wrap gap-3">
          {cart.length > 0 && (
            <Link href="/bestellen" className="btn btn-primary">
              Verder naar bestellen
            </Link>
          )}
          <Link href="/bestellingen" className="btn btn-secondary">
            Mijn bestellingen
          </Link>
        </div>
      )}
    </>
  );
}
