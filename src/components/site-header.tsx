"use client";

import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCustomerById } from "@/lib/data";
import { useShop } from "@/lib/store";

const navLink =
  "flex min-h-11 items-center justify-center px-3 text-plate/85 hover:bg-white/10 hover:text-white focus-visible:outline-plate focus-visible:-outline-offset-2 [&[aria-current]]:text-white [&[aria-current]]:shadow-[inset_0_-2px_0_var(--signal)] md:rounded-sm";

export function SiteHeader() {
  const { cart, customerId } = useShop();
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const customer = customerId !== null ? getCustomerById(customerId) : null;
  const pathname = usePathname();
  // "page" op de pagina zelf, "true" op onderliggende pagina's zoals /producten/1.
  const current = (href: string) =>
    pathname === href ? ("page" as const) : pathname.startsWith(href) ? true : undefined;

  return (
    <header className="bg-ink text-plate">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 px-4 pt-4 sm:px-6 md:grid-cols-[auto_1fr_auto_auto] md:pb-4">
        <Link
          href="/"
          className="flex min-h-11 items-center justify-self-start focus-visible:outline-plate"
          aria-label="Matrix Inc. home"
        >
          <Image
            src="/img/matrix-logo.png"
            alt="Matrix"
            width={743}
            height={98}
            preload
            className="h-4 w-auto sm:h-5"
          />
        </Link>

        <Link
          href="/winkelwagen"
          className="btn btn-primary px-3 text-sm focus-visible:outline-plate md:order-3"
        >
          <CartIcon />
          <span className="tabular">{count}</span>
          <span className="sr-only">
            {count === 1 ? "product" : "producten"} in winkelwagen
          </span>
        </Link>

        <Form
          action="/producten"
          role="search"
          className="col-span-2 flex md:order-1 md:col-span-1 md:w-full md:max-w-md md:justify-self-center"
        >
          <label htmlFor="site-search" className="sr-only">
            Zoek in producten
          </label>
          <input
            id="site-search"
            type="search"
            name="zoek"
            placeholder="Zoek op naam of omschrijving"
            className="field rounded-r-none border-0 text-sm text-ink"
          />
          <button
            type="submit"
            className="btn rounded-l-none bg-steel px-4 text-sm text-ink hover:bg-white focus-visible:outline-plate"
          >
            Zoeken
          </button>
        </Form>

        {/* Op mobiel een eigen rij onder de zoekbalk, zodat alle links passen. */}
        <nav
          aria-label="Hoofdmenu"
          className="col-span-2 -mx-4 grid grid-cols-3 border-t border-white/10 text-sm font-medium sm:-mx-6 md:order-2 md:col-span-1 md:mx-0 md:flex md:gap-1 md:border-0"
        >
          <Link href="/producten" className={navLink} aria-current={current("/producten")}>
            Producten
          </Link>
          <Link href="/bestellingen" className={navLink} aria-current={current("/bestellingen")}>
            Bestellingen
          </Link>
          <Link href="/account" className={navLink} aria-current={current("/account")}>
            {customer ? customer.name : "Inloggen"}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M3 4h2.5l2.2 11h10.6L20.5 7H7" />
      <circle cx="9" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}
