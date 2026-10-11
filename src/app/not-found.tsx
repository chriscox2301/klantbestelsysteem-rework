import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <h1 className="font-wide text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-extrabold">
        Deze pagina bestaat niet.
      </h1>
      <p className="mt-6 max-w-md text-lg text-graphite">
        De link is mogelijk verouderd of verkeerd overgenomen. Zoek in de
        catalogus naar wat je nodig hebt.
      </p>
      <Link href="/producten" className="btn btn-primary mt-8">
        Bekijk alle producten
      </Link>
    </div>
  );
}
