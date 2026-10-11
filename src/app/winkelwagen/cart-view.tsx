"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { QuantityStepper } from "@/components/quantity-stepper";
import { discountCodes, getCustomerById, getProductById } from "@/lib/data";
import { formatPrice, partNumber } from "@/lib/format";
import { orderTotals, shop, useHydrated, useShop } from "@/lib/store";
import type { DeliveryMoment, PaymentMethod, ShippingAddress } from "@/lib/types";

const payments: { value: PaymentMethod; label: string }[] = [
  { value: "ideal", label: "iDEAL" },
  { value: "creditcard", label: "Creditcard" },
  { value: "paypal", label: "PayPal" },
  { value: "afterpay", label: "Achteraf betalen" },
];

const deliveries: { value: DeliveryMoment; label: string; note: string }[] = [
  { value: "standard", label: "Standaard", note: "Binnen 2–3 werkdagen" },
  { value: "express", label: "Express", note: "Morgen in huis" },
  { value: "evening", label: "Avond", note: "Tussen 18:00 en 22:00" },
];

const emptyAddress: ShippingAddress = {
  firstName: "",
  lastName: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  city: "",
};

type Errors = Partial<Record<keyof ShippingAddress, string>>;

function validate(a: ShippingAddress): Errors {
  const errors: Errors = {};
  if (!a.firstName.trim()) errors.firstName = "Vul je voornaam in.";
  if (!a.lastName.trim()) errors.lastName = "Vul je achternaam in.";
  if (!a.street.trim()) errors.street = "Vul je straatnaam in.";
  if (!a.houseNumber.trim()) errors.houseNumber = "Vul je huisnummer in.";
  if (!/^\d{4}\s?[a-zA-Z]{2}$/.test(a.postalCode.trim()))
    errors.postalCode = "Gebruik een postcode zoals 1234 AB.";
  if (!a.city.trim()) errors.city = "Vul je woonplaats in.";
  return errors;
}

export function CartView() {
  const hydrated = useHydrated();
  const { cart, customerId, discountCode } = useShop();
  const router = useRouter();

  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [errors, setErrors] = useState<Errors>({});
  const [payment, setPayment] = useState<PaymentMethod>("ideal");
  const [delivery, setDelivery] = useState<DeliveryMoment>("standard");

  if (!hydrated) {
    return <p className="py-16 text-graphite">Winkelwagen laden…</p>;
  }

  const lines = cart.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  if (lines.length === 0) {
    return (
      <div className="py-16">
        <h2 className="text-2xl font-semibold">Je winkelwagen is leeg</h2>
        <p className="mt-2 text-graphite">
          Voeg producten toe vanuit de catalogus om een bestelling te plaatsen.
        </p>
        <Link href="/producten" className="btn btn-primary mt-6">
          Bekijk alle producten
        </Link>
      </div>
    );
  }

  const customer = customerId !== null ? getCustomerById(customerId) : null;
  const totals = orderTotals({
    lines: lines.map((l) => ({
      productId: l.product.id,
      quantity: l.quantity,
      unitPrice: l.product.price,
    })),
    discountRate: discountCode ? discountCodes[discountCode] : undefined,
  });

  function field(name: keyof ShippingAddress) {
    return {
      id: name,
      name,
      value: address[name],
      onChange: (e: { target: { value: string } }) => {
        setAddress((a) => ({ ...a, [name]: e.target.value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
      },
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const found = validate(address);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    const order = shop.placeOrder({ payment, delivery, address });
    if (order) router.push(`/bevestiging?order=${order.id}`);
  }

  return (
    <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_22rem]">
      <div>
        <ul aria-label="Producten in je winkelwagen">
          {lines.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="grid grid-cols-[5rem_1fr] gap-4 border-b border-rule py-5 sm:grid-cols-[6rem_1fr_auto]"
            >
              <div className="relative aspect-square overflow-hidden bg-plate">
                <Image src={product.imageUrl} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm text-graphite tabular">{partNumber(product.id)}</p>
                <Link href={`/producten/${product.id}`} className="font-semibold hover:text-signal">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-graphite tabular">
                  {formatPrice(product.price)} per stuk
                </p>
              </div>
              <div className="col-start-2 flex flex-wrap items-center gap-4 sm:col-start-3 sm:flex-col sm:items-end">
                <p className="font-semibold tabular">
                  {formatPrice(product.price * quantity)}
                </p>
                <div className="flex items-center gap-3">
                  <QuantityStepper
                    value={quantity}
                    onChange={(q) => shop.setQuantity(product.id, q)}
                    label={`Aantal ${product.name}`}
                  />
                  <button
                    type="button"
                    onClick={() => shop.removeFromCart(product.id)}
                    className="text-sm text-graphite underline underline-offset-4 hover:text-signal"
                  >
                    Verwijderen
                    <span className="sr-only"> {product.name}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form id="checkout" onSubmit={submit} noValidate className="mt-14 space-y-12">
          <Step number={1} title="Bezorgadres">
            <div className="grid gap-4 sm:grid-cols-6">
              <Field label="Voornaam" error={errors.firstName} name="firstName" className="sm:col-span-3">
                <input {...field("firstName")} autoComplete="given-name" className="field" />
              </Field>
              <Field label="Achternaam" error={errors.lastName} name="lastName" className="sm:col-span-3">
                <input {...field("lastName")} autoComplete="family-name" className="field" />
              </Field>
              <Field label="Straatnaam" error={errors.street} name="street" className="sm:col-span-4">
                <input {...field("street")} autoComplete="address-line1" className="field" />
              </Field>
              <Field label="Huisnummer" error={errors.houseNumber} name="houseNumber" className="sm:col-span-2">
                <input {...field("houseNumber")} className="field" />
              </Field>
              <Field label="Postcode" error={errors.postalCode} name="postalCode" className="sm:col-span-2">
                <input {...field("postalCode")} autoComplete="postal-code" placeholder="1234 AB" className="field" />
              </Field>
              <Field label="Woonplaats" error={errors.city} name="city" className="sm:col-span-4">
                <input {...field("city")} autoComplete="address-level2" className="field" />
              </Field>
            </div>
          </Step>

          <Step number={2} title="Bezorgmoment">
            <div className="grid gap-3 sm:grid-cols-3">
              {deliveries.map((d) => (
                <Choice
                  key={d.value}
                  name="delivery"
                  checked={delivery === d.value}
                  onChange={() => setDelivery(d.value)}
                >
                  <span className="font-semibold">{d.label}</span>
                  <span className="block text-sm text-graphite">{d.note}</span>
                </Choice>
              ))}
            </div>
          </Step>

          <Step number={3} title="Betaalmethode">
            <div className="grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <Choice
                  key={p.value}
                  name="payment"
                  checked={payment === p.value}
                  onChange={() => setPayment(p.value)}
                >
                  <span className="font-semibold">{p.label}</span>
                </Choice>
              ))}
            </div>
          </Step>
        </form>
      </div>

      <aside
        aria-label="Overzicht"
        className="bg-plate p-6 lg:sticky lg:top-6"
      >
        <h2 className="font-wide text-xl font-bold">Overzicht</h2>

        <dl className="mt-5 space-y-2 tabular">
          <Row label="Subtotaal" value={formatPrice(totals.subtotal)} />
          {discountCode && (
            <Row
              label={`Korting ${discountCode}`}
              value={`−${formatPrice(totals.discount)}`}
              className="text-go"
            />
          )}
          <Row label="Verzending" value="Gratis" />
          <div className="flex justify-between border-t-2 border-ink pt-3 text-lg font-bold">
            <dt>Totaal</dt>
            <dd>{formatPrice(totals.total)}</dd>
          </div>
        </dl>

        <DiscountForm appliedCode={discountCode} />

        <div className="mt-6 border-t border-rule pt-6">
          {customer ? (
            <>
              <p className="text-sm text-graphite">
                Je bestelt als <strong className="text-ink">{customer.name}</strong>.{" "}
                <Link href="/account" className="underline underline-offset-4 hover:text-signal">
                  Wissel
                </Link>
              </p>
              <button type="submit" form="checkout" className="btn btn-primary mt-4 w-full">
                Bestelling plaatsen
              </button>
            </>
          ) : (
            <>
              <p className="text-sm">
                Log in om je bestelling te plaatsen. Je winkelwagen blijft bewaard.
              </p>
              <Link href="/account" className="btn btn-primary mt-4 w-full">
                Inloggen
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-5 flex items-baseline gap-3">
        <span className="font-wide text-2xl font-extrabold text-signal tabular">{number}</span>
        <span className="font-wide text-2xl font-bold">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  error,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 border bg-white p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
        checked ? "border-ink shadow-[inset_0_0_0_1px_var(--ink)]" : "border-rule hover:border-graphite"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-signal"
      />
      <span>{children}</span>
    </label>
  );
}

function Row({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function DiscountForm({ appliedCode }: { appliedCode: string | null }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (appliedCode) {
    return (
      <p className="mt-5 flex items-center justify-between text-sm">
        <span>
          Code <strong>{appliedCode}</strong> toegepast
        </span>
        <button
          type="button"
          onClick={() => shop.removeDiscount()}
          className="text-graphite underline underline-offset-4 hover:text-signal"
        >
          Verwijderen
        </button>
      </p>
    );
  }

  return (
    <form
      className="mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!code.trim()) return;
        if (shop.applyDiscount(code)) {
          setCode("");
          setError(null);
        } else {
          setError(`“${code.trim()}” is geen geldige kortingscode.`);
        }
      }}
    >
      <label htmlFor="discount" className="mb-1.5 block text-sm font-medium">
        Kortingscode
      </label>
      <div className="flex">
        <input
          id="discount"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "discount-error" : undefined}
          className="field rounded-r-none border-r-0 uppercase"
        />
        <button type="submit" className="btn rounded-l-none bg-ink text-plate hover:bg-signal">
          Toepassen
        </button>
      </div>
      {error && (
        <p id="discount-error" className="mt-1.5 text-sm text-signal">
          {error}
        </p>
      )}
    </form>
  );
}
