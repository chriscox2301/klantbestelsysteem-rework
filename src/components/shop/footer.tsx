import Link from "next/link";
import { brand } from "@/brand.config";
import { categories } from "@/lib/data";

const footerLink = "inline-flex min-h-8 items-center hover:text-brand hover:underline";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-surface text-sm text-muted">
      <div className="container-shop grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="mb-2 font-bold text-ink">Klantenservice</h2>
          <address className="space-y-1 not-italic">
            <p>{brand.contact.address}</p>
            <p>
              <a href={`tel:${brand.contact.phone.replace(/\s/g, "")}`} className={footerLink}>
                {brand.contact.phone}
              </a>
              <span className="block text-xs">{brand.contact.hours}</span>
            </p>
            <p>
              <a href={`mailto:${brand.contact.email}`} className={`${footerLink} break-all`}>
                {brand.contact.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-ink">Categorieën</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/producten?categorie=${c.slug}`} className={footerLink}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-ink">Mijn account</h2>
          <ul>
            <li><Link href="/account" className={footerLink}>Inloggen of wisselen</Link></li>
            <li><Link href="/bestellingen" className={footerLink}>Mijn bestellingen</Link></li>
            <li><Link href="/winkelwagen" className={footerLink}>Winkelwagen</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-ink">Zo werkt bestellen</h2>
          <ul className="space-y-1.5">
            <li>Altijd gratis verzonden</li>
            <li>{brand.returnDays} dagen bedenktijd, gratis retour</li>
            <li>Wettelijke garantie op alles wat we leveren</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line bg-page">
        <div className="container-shop flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Betaalmethodes">
            {brand.paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {method}
              </li>
            ))}
          </ul>
          <p className="text-xs">© 2026 {brand.name} Alle prijzen zijn inclusief btw.</p>
        </div>
      </div>
    </footer>
  );
}
