"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FocusEvent, type FormEvent, type ReactNode, useState } from "react";
import { SummaryRows } from "@/components/cart/summary-rows";
import { useCartLines } from "@/components/cart/use-cart-lines";
import { ProductImage } from "@/components/shop/product-image";
import { getCustomerById } from "@/lib/data";
import { formatDeliveryDate, formatPrice, workdaysFrom } from "@/lib/format";
import { shop, useHydrated } from "@/lib/store";
import type { DeliveryMoment, PaymentMethod, ShippingAddress } from "@/lib/types";

const payments: { value: PaymentMethod; label: string; note: string }[] = [
  { value: "ideal", label: "iDEAL", note: "Direct betalen via je eigen bank" },
  { value: "creditcard", label: "Creditcard", note: "Visa of Mastercard" },
  { value: "paypal", label: "PayPal", note: "Inloggen bij PayPal" },
  { value: "afterpay", label: "Achteraf betalen", note: "Binnen 14 dagen na levering" },
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

const rules: Record<keyof ShippingAddress, (v: string) => string | undefined> = {
  postalCode: (v) => (/^\d{4}\s?[a-zA-Z]{2}$/.test(v.trim()) ? undefined : "Gebruik een postcode zoals 1234 AB."),
  houseNumber: (v) => (v.trim() ? undefined : "Vul je huisnummer in."),
  street: (v) => (v.trim() ? undefined : "Vul je straatnaam in."),
  city: (v) => (v.trim() ? undefined : "Vul je woonplaats in."),
  firstName: (v) => (v.trim() ? undefined : "Vul je voornaam in."),
  lastName: (v) => (v.trim() ? undefined : "Vul je achternaam in."),
};

function validate(a: ShippingAddress): Errors {
  const errors: Errors = {};
  for (const key of Object.keys(rules) as (keyof ShippingAddress)[]) {
    const error = rules[key](a[key]);
    if (error) errors[key] = error;
  }
  return errors;
}

export function CheckoutView() {
  const hydrated = useHydrated();
  const { lines, totals, customerId, discountCode } = useCartLines();
  const router = useRouter();

  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [errors, setErrors] = useState<Errors>({});
  const [payment, setPayment] = useState<PaymentMethod>("ideal");
  const [delivery, setDelivery] = useState<DeliveryMoment>("standard");
  const [placing, setPlacing] = useState(false);

  if (!hydrated) return <p className="py-16 text-center text-muted">Bestelling laden…</p>;

  const customer = customerId !== null ? getCustomerById(customerId) : null;

  if (lines.length === 0 && !placing) {
    return (
      <Notice title="Je winkelwagen is leeg">
        <p>Voeg eerst producten toe voordat je gaat bestellen.</p>
        <Link href="/producten" className="btn btn-primary mt-5">Verder winkelen</Link>
      </Notice>
    );
  }

  if (!customer) {
    return (
      <Notice title="Log in om je bestelling af te ronden">
        <p>Je winkelwagen blijft bewaard.</p>
        <Link href="/account" className="btn btn-primary mt-5">Inloggen</Link>
      </Notice>
    );
  }

  const today = new Date();
  const deliveries: { value: DeliveryMoment; label: string; note: string }[] = [
    { value: "standard", label: "Standaard", note: `Uiterlijk ${formatDeliveryDate(workdaysFrom(today, 3))}` },
    { value: "express", label: "Morgen in huis", note: `${formatDeliveryDate(workdaysFrom(today, 1))}, voor 22:00 besteld` },
    { value: "evening", label: "'s Avonds", note: `${formatDeliveryDate(workdaysFrom(today, 2))}, 18:00–22:00` },
  ];

  function field(name: keyof ShippingAddress) {
    return {
      id: name,
      name,
      value: address[name],
      onChange: (e: { target: { value: string } }) => {
        setAddress((a) => ({ ...a, [name]: e.target.value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: rules[name](e.target.value) }));
      },
      // Inline valideren zodra je een ingevuld veld verlaat.
      onBlur: (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value) setErrors((er) => ({ ...er, [name]: rules[name](e.target.value) }));
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
    setPlacing(true);
    const order = shop.placeOrder({ payment, delivery, address });
    if (order) router.push(`/bevestiging?order=${order.id}`);
    else setPlacing(false);
  }

  return (
    <form onSubmit={submit} noValidate className="mt-5 grid items-start gap-4 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        <Block number={1} title="Bezorgadres">
          <div className="grid grid-cols-6 gap-x-3 gap-y-4">
            <Field label="Postcode" error={errors.postalCode} name="postalCode" className="col-span-3 sm:col-span-2">
              <input {...field("postalCode")} autoComplete="postal-code" className="field uppercase" />
            </Field>
            <Field label="Huisnummer" error={errors.houseNumber} name="houseNumber" className="col-span-3 sm:col-span-2">
              <input {...field("houseNumber")} inputMode="text" className="field" />
            </Field>
            <Field label="Straatnaam" error={errors.street} name="street" className="col-span-6 sm:col-span-3">
              <input {...field("street")} autoComplete="address-line1" className="field" />
            </Field>
            <Field label="Woonplaats" error={errors.city} name="city" className="col-span-6 sm:col-span-3">
              <input {...field("city")} autoComplete="address-level2" className="field" />
            </Field>
            <Field label="Voornaam" error={errors.firstName} name="firstName" className="col-span-6 sm:col-span-3">
              <input {...field("firstName")} autoComplete="given-name" className="field" />
            </Field>
            <Field label="Achternaam" error={errors.lastName} name="lastName" className="col-span-6 sm:col-span-3">
              <input {...field("lastName")} autoComplete="family-name" className="field" />
            </Field>
          </div>
        </Block>

        <Block number={2} title="Bezorgmoment">
          <div className="grid gap-2 sm:grid-cols-3">
            {deliveries.map((d) => (
              <Choice key={d.value} name="delivery" checked={delivery === d.value} onChange={() => setDelivery(d.value)}>
                <span className="block font-semibold">{d.label}</span>
                <span className="block text-sm text-muted">{d.note}</span>
                <span className="mt-1 block text-sm font-semibold text-success">Gratis</span>
              </Choice>
            ))}
          </div>
        </Block>

        <Block number={3} title="Betaalmethode">
          <div className="grid gap-2 sm:grid-cols-2">
            {payments.map((p) => (
              <Choice key={p.value} name="payment" checked={payment === p.value} onChange={() => setPayment(p.value)}>
                <span className="block font-semibold">{p.label}</span>
                <span className="block text-sm text-muted">{p.note}</span>
              </Choice>
            ))}
          </div>
        </Block>
      </div>

      <aside aria-label="Je bestelling" className="tile space-y-4 p-4 md:p-5 lg:sticky lg:top-6">
        <h2 className="text-lg font-bold">Je bestelling</h2>
        <ul className="space-y-3">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-3 text-sm">
              <ProductImage product={product} sizes="64px" className="w-16 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2">{product.name}</span>
                <span className="text-xs text-muted tabular">Aantal: {quantity}</span>
              </span>
              <span className="font-semibold tabular">{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-4">
          <SummaryRows {...totals} discountCode={discountCode} />
        </div>
        <button type="submit" disabled={placing} className="btn btn-lg btn-primary w-full">
          <Lock aria-hidden="true" className="size-4" />
          Bestellen en betalen
        </button>
        <p className="text-center text-xs text-muted">
          Je bestelt als <strong className="text-ink">{customer.name}</strong>.{" "}
          <Link href="/winkelwagen" className="link">Terug naar winkelwagen</Link>
        </p>
      </aside>
    </form>
  );
}

function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="tile mx-auto mt-8 max-w-xl px-6 py-10 text-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="mt-1 text-muted">{children}</div>
    </div>
  );
}

function Block({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="tile p-4 md:p-6">
      <legend className="float-left mb-4 flex w-full items-center gap-3 text-lg font-bold">
        <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-brand text-sm text-brand-contrast tabular">
          {number}
        </span>
        {title}
      </legend>
      <div className="clear-both">{children}</div>
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
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-danger">
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
      className={`flex cursor-pointer items-start gap-3 rounded border p-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
        checked ? "border-brand bg-brand-soft shadow-[inset_0_0_0_1px_var(--brand)]" : "border-line hover:border-[#b9c2c3]"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 size-4 accent-brand" />
      <span>{children}</span>
    </label>
  );
}
