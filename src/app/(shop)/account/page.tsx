import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shop/breadcrumbs";
import { AccountPicker } from "./account-picker";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="container-shop max-w-2xl py-4 md:py-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <h1 className="mt-3 text-xl font-bold md:text-2xl">Inloggen</h1>
      <p className="mt-0.5 text-muted">
        Kies met welk account je wilt winkelen. Je bestellingen worden aan dit account gekoppeld.
      </p>
      <AccountPicker />
    </div>
  );
}
