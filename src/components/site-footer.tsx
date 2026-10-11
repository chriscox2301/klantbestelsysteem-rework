import Link from "next/link";

const paymentMethods = ["iDEAL", "Creditcard", "PayPal", "Achteraf betalen"];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-plate text-sm text-graphite">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <p className="font-wide text-base font-bold text-ink">Matrix Inc.</p>
          <p className="mt-1">
            Gratis verzending, 30 dagen bedenktijd en wettelijke garantie op
            alles wat we leveren.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6">
          <Link href="/producten" className="flex min-h-11 items-center hover:text-ink">
            Producten
          </Link>
          <Link href="/account" className="flex min-h-11 items-center hover:text-ink">
            Account
          </Link>
          <Link href="/bestellingen" className="flex min-h-11 items-center hover:text-ink">
            Bestellingen
          </Link>
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto_auto] md:items-start md:gap-12">
          <div>
            <h2 className="font-semibold text-ink">Klantenservice</h2>
            <address className="mt-2 not-italic">
              Zionweg 101, 1011 AB Amsterdam
              <br />
              <a href="tel:+31201234567" className="underline-offset-4 hover:text-ink hover:underline">
                020 123 45 67
              </a>{" "}
              · ma–vr 9:00–17:00
              <br />
              <a
                href="mailto:klantenservice@matrix-inc.example"
                className="underline-offset-4 hover:text-ink hover:underline"
              >
                klantenservice@matrix-inc.example
              </a>
            </address>
          </div>

          <div>
            <h2 className="font-semibold text-ink">Veilig betalen</h2>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Ondersteunde betaalmethodes">
              {paymentMethods.map((method) => (
                <li
                  key={method}
                  className="border border-rule bg-white px-2.5 py-1 text-xs font-semibold text-ink"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>

          <p className="md:self-end md:text-right">© 2026 Matrix Inc.</p>
        </div>
      </div>
    </footer>
  );
}
