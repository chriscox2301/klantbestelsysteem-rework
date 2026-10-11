import type { Metadata } from "next";
import { Suspense } from "react";
import { Confirmation } from "./confirmation";

export const metadata: Metadata = { title: "Bestelling geplaatst" };

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <Suspense fallback={<p className="text-graphite">Bestelling laden…</p>}>
        <Confirmation />
      </Suspense>
    </div>
  );
}
