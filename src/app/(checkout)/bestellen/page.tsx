import type { Metadata } from "next";
import { CheckoutSteps } from "@/components/checkout/steps";
import { CheckoutView } from "./checkout-view";

export const metadata: Metadata = { title: "Bestellen" };

export default function CheckoutPage() {
  return (
    <div className="container-shop py-4 md:py-6">
      <CheckoutSteps current={1} />
      <CheckoutView />
    </div>
  );
}
