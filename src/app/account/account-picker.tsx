"use client";

import Link from "next/link";
import { customers } from "@/lib/data";
import { shop, useShop } from "@/lib/store";

export function AccountPicker() {
  const { customerId, cart } = useShop();

  return (
    <>
      <ul className="mt-8 border-t border-rule">
        {customers.map((c) => {
          const active = c.id === customerId;
          return (
            <li
              key={c.id}
              className="flex items-center justify-between gap-4 border-b border-rule py-5"
            >
              <div>
                <p className="font-wide text-xl font-bold">{c.name}</p>
                <p className="text-sm text-graphite">{c.address}</p>
              </div>
              {active ? (
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-go">
                    <span aria-hidden="true" className="size-2 rounded-full bg-go" />
                    Ingelogd
                  </span>
                  <button
                    type="button"
                    onClick={() => shop.logOut()}
                    className="text-sm text-graphite underline underline-offset-4 hover:text-signal"
                  >
                    Uitloggen
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => shop.logIn(c.id)}
                  className="btn btn-secondary text-sm"
                >
                  Inloggen
                  <span className="sr-only"> als {c.name}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {customerId !== null && (
        <div className="mt-8 flex flex-wrap gap-3">
          {cart.length > 0 && (
            <Link href="/winkelwagen" className="btn btn-primary">
              Verder naar winkelwagen
            </Link>
          )}
          <Link href="/bestellingen" className="btn btn-secondary">
            Bekijk bestellingen
          </Link>
        </div>
      )}
    </>
  );
}
