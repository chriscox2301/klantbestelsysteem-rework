import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-graphite sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <p className="font-wide text-base font-bold text-ink">Matrix Inc.</p>
          <p className="mt-1">
            Gratis verzending, 30 dagen bedenktijd en wettelijke garantie op
            alles wat we leveren.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/producten" className="hover:text-ink">
            Producten
          </Link>
          <Link href="/account" className="hover:text-ink">
            Account
          </Link>
          <Link href="/bestellingen" className="hover:text-ink">
            Bestellingen
          </Link>
        </nav>
      </div>
    </footer>
  );
}
