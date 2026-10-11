import type { Metadata } from "next";
import { AccountPicker } from "./account-picker";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6">
      <h1 className="border-b-2 border-ink pb-4 font-wide text-4xl font-extrabold sm:text-5xl">
        Account
      </h1>
      <p className="mt-4 text-graphite">
        Kies met welk account je wilt winkelen. Je bestellingen worden aan dit
        account gekoppeld.
      </p>
      <AccountPicker />
    </div>
  );
}
