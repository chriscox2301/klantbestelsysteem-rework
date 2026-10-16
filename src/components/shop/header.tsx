"use client";

import { Package, Search, ShoppingCart, User } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/brand.config";
import { getCustomerById } from "@/lib/data";
import { useShop } from "@/lib/store";

const iconLink =
  "relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-md px-2 text-brand-contrast/90 hover:bg-white/10 hover:text-brand-contrast focus-visible:outline-white";

export function Header() {
  const { cart, customerId } = useShop();
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const customer = customerId !== null ? getCustomerById(customerId) : null;

  return (
    <header className="sticky top-0 z-40 bg-brand-deep text-brand-contrast">
      <div className="container-shop grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-2 md:grid-cols-[auto_1fr_auto] md:gap-x-8 md:py-3">
        <Link
          href="/"
          className="flex min-h-11 items-center justify-self-start focus-visible:outline-white"
        >
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            preload
            className="h-4 w-auto md:h-5"
          />
        </Link>

        <nav aria-label="Account en winkelwagen" className="flex items-center gap-1 md:order-3">
          <Link href="/account" className={iconLink}>
            <User aria-hidden="true" className="size-5" />
            <span className="hidden max-w-24 truncate text-xs md:block">
              {customer ? customer.name : "Inloggen"}
            </span>
            <span className="sr-only md:hidden">
              {customer ? `Account van ${customer.name}` : "Inloggen"}
            </span>
          </Link>
          <Link href="/bestellingen" className={`${iconLink} hidden sm:flex`}>
            <Package aria-hidden="true" className="size-5" />
            <span className="text-xs">Bestellingen</span>
          </Link>
          <Link href="/winkelwagen" className={iconLink}>
            <span className="relative">
              <ShoppingCart aria-hidden="true" className="size-5" />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-2.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white tabular"
                >
                  {count}
                </span>
              )}
            </span>
            <span className="hidden text-xs md:block">Winkelwagen</span>
            <span className="sr-only">
              {count === 0
                ? "Winkelwagen, leeg"
                : `Winkelwagen, ${count} ${count === 1 ? "product" : "producten"}`}
            </span>
          </Link>
        </nav>

        <Form
          action="/producten"
          role="search"
          className="col-span-2 flex h-11 w-full overflow-hidden rounded-md bg-surface md:order-2 md:col-span-1 md:max-w-2xl md:justify-self-center"
        >
          <label htmlFor="site-search" className="sr-only">
            Zoeken
          </label>
          <input
            id="site-search"
            type="search"
            name="zoek"
            placeholder="Waar ben je naar op zoek?"
            className="min-w-0 flex-1 px-4 text-ink placeholder:text-muted focus-visible:outline-none"
          />
          <button
            type="submit"
            className="flex w-14 items-center justify-center bg-accent text-white hover:bg-accent-hover focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            <Search aria-hidden="true" className="size-5" strokeWidth={2.5} />
            <span className="sr-only">Zoeken</span>
          </button>
        </Form>
      </div>
    </header>
  );
}
