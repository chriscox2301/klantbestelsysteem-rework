import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { brand } from "@/brand.config";

/** Afrekenen zonder afleiding: alleen het logo en de belofte van veilig betalen. */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="bg-brand-deep text-brand-contrast">
        <div className="container-shop flex h-14 items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center focus-visible:outline-white">
            <Image
              src={brand.logo.src}
              alt={`${brand.logo.alt}, terug naar de winkel`}
              width={brand.logo.width}
              height={brand.logo.height}
              preload
              className="h-4 w-auto md:h-5"
            />
          </Link>
          <p className="flex items-center gap-2 text-sm">
            <Lock aria-hidden="true" className="size-4" />
            Veilig betalen
          </p>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-12 border-t border-line bg-surface">
        <div className="container-shop flex flex-col gap-1 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            Vragen over je bestelling? Bel {brand.contact.phone} ({brand.contact.hours})
          </p>
          <p>© 2026 {brand.name}</p>
        </div>
      </footer>
    </>
  );
}
