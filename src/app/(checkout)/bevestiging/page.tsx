import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSteps } from "@/components/checkout/steps";
import { Confirmation } from "./confirmation";

export const metadata: Metadata = { title: "Bestelling geplaatst" };

export default function ConfirmationPage() {
  return (
    <div className="container-shop py-4 md:py-6">
      <CheckoutSteps current={2} />
      <div className="mx-auto mt-6 max-w-3xl">
        <Suspense fallback={<p className="text-muted">Bestelling laden…</p>}>
          <Confirmation />
        </Suspense>
      </div>
    </div>
  );
}
