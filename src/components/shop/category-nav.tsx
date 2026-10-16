import Link from "next/link";
import { categories } from "@/lib/data";

const item =
  "flex min-h-10 shrink-0 items-center whitespace-nowrap px-3 text-sm font-medium text-ink hover:text-brand hover:underline underline-offset-4 first:pl-0";

export function CategoryNav() {
  return (
    <nav aria-label="Categorieën" className="border-b border-line bg-surface">
      <ul className="container-shop flex overflow-x-auto [scrollbar-width:none]">
        <li>
          <Link href="/producten" className={`${item} font-semibold`}>
            Alle producten
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/producten?categorie=${c.slug}`} className={item}>
              {c.name}
            </Link>
          </li>
        ))}
        <li className="md:ml-auto">
          <Link href="/producten?aanbieding=1" className={`${item} text-danger hover:text-danger`}>
            Aanbiedingen
          </Link>
        </li>
      </ul>
    </nav>
  );
}
