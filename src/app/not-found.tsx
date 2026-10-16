import Link from "next/link";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/shop/footer";
import { Header } from "@/components/shop/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <CategoryNav />
      <main className="container-shop flex-1 py-16">
        <div className="tile mx-auto max-w-xl p-8 text-center">
          <h1 className="text-2xl font-bold">Deze pagina bestaat niet</h1>
          <p className="mt-2 text-muted">
            De link is mogelijk verouderd of verkeerd overgenomen. Zoek hierboven
            naar een product of bekijk de hele catalogus.
          </p>
          <Link href="/producten" className="btn btn-primary mt-6">
            Bekijk alle producten
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
