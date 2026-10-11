# Matrix Inc. — frontend rework

Een herbouw van de frontend van [KlantBestelSysteem](https://github.com/chriscox2301/KlantBestelSysteem)
(ASP.NET Razor Pages) in Next.js, React en Tailwind CSS.

## Starten

```bash
npm install
npm run dev
```

Open daarna http://localhost:3000.

## Pagina's

| Route                 | Was (Razor)          | Wat                                               |
| --------------------- | -------------------- | ------------------------------------------------- |
| `/`                   | `Index`              | Hero, kortingscode en de meest verkochte producten |
| `/producten?zoek=…`   | `Products`           | Catalogus met zoeken                              |
| `/producten/[id]`     | `Product`            | Productdetail, aantal kiezen, "Bekijk ook"        |
| `/winkelwagen`        | `Cart`               | Winkelwagen en afrekenen (adres, bezorging, betaling) |
| `/account`            | `Account`            | Account kiezen, in- en uitloggen                  |
| `/bestellingen`       | `Orderhistory`       | Bestelgeschiedenis van het ingelogde account      |
| `/bevestiging?order=` | `Confirmation`       | Bevestiging na het plaatsen van een bestelling    |

## Structuur

- `src/lib/data.ts`: mockdata en "repository"-functies, overgenomen uit
  `MatrixIncDbInitializer.cs`. Vervang deze functies later door `fetch`-calls
  naar een API; de pagina's hoeven daarvoor niet te veranderen.
- `src/lib/store.ts`: winkelwagen, ingelogde klant, kortingscode en geplaatste
  bestellingen. Dit vervangt de ASP.NET-session en wordt bewaard in `localStorage`.
- `src/components/`: gedeelde UI (header, producttegel, aantal-kiezer, …).
- `src/app/globals.css`: designtokens (kleuren) en kleine utilities (`btn`, `field`, `font-wide`).

## Wat er nieuw is ten opzichte van de Razor-versie

- Kortingscode **MECH10** werkt echt (10% korting).
- Aantallen aanpassen in de winkelwagen.
- Adresvalidatie bij het afrekenen, inclusief Nederlandse postcode.
- Bestelstatus en gekozen bezorging/betaling worden per bestelling bewaard.
- "In winkelwagen" in de productlijst voegt ook echt toe.
