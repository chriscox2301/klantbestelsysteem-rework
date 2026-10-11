"use client";

import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { getCustomerById } from "@/lib/data";
import { useShop } from "@/lib/store";

const navLink =
  "flex min-h-11 items-center rounded-sm px-3 text-plate/85 hover:bg-white/10 hover:text-white focus-visible:outline-plate";

export function SiteHeader() {
  const { cart, customerId } = useShop();
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const customer = customerId !== null ? getCustomerById(customerId) : null;

  return (
    <header className="bg-ink text-plate">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 md:grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          className="flex min-h-11 items-center focus-visible:outline-plate"
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

        <nav
          aria-label="Hoofdmenu"
          className="flex items-center justify-end gap-1 text-sm font-medium md:order-last"
        >
          <Link href="/producten" className={navLink}>
            Producten
          </Link>
          <Link
            href="/bestellingen"
            className={`${navLink} hidden sm:flex`}
          >
            Bestellingen
          </Link>
          <Link href="/account" className={navLink}>
            {customer ? customer.name : "Inloggen"}
          </Link>
          <Link
            href="/winkelwagen"
            className="btn btn-primary ml-1 px-3 focus-visible:outline-plate"
          >
            <CartIcon />
            <span className="tabular">{count}</span>
            <span className="sr-only">
              {count === 1 ? "product" : "producten"} in winkelwagen
            </span>
          </Link>
        </nav>

        <Form
          action="/producten"
          role="search"
          className="col-span-2 flex md:col-span-1 md:max-w-md md:justify-self-center md:w-full"
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
