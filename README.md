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

| Route                    | Was (Razor)    | Wat                                                        |
| ------------------------ | -------------- | ---------------------------------------------------------- |
| `/`                      | `Index`        | Campagnebanner, kortingscode, categorieën en productrijen  |
| `/producten?zoek=…`      | `Products`     | Catalogus met zoeken, filters (categorie, voorraad, aanbieding) en sorteren |
| `/producten/[id]`        | `Product`      | Productdetail met sticky koopblok, specificaties en "Bekijk ook" |
| `/winkelwagen`           | `Cart`         | Winkelwagen, kortingscode en overzicht                     |
| `/bestellen`             | `Cart`         | Afrekenen: bezorgadres, bezorgmoment en betaalmethode      |
| `/account`               | `Account`      | Account kiezen, in- en uitloggen                           |
| `/bestellingen`          | `Orderhistory` | Bestelgeschiedenis van het ingelogde account               |
| `/bevestiging?order=`    | `Confirmation` | Bevestiging na het plaatsen van een bestelling             |

## Structuur

- `src/brand.config.ts`: alles wat merkgebonden is (naam, logo, merk- en
  accentkleur, USP's, bezorgbelofte, betaalmethodes, contactgegevens).
  Componenten lezen hieruit; er staan geen merkkleuren hardcoded in de UI.
- `src/app/globals.css`: designtokens (`bg-brand`, `bg-accent`, `bg-page`,
  `text-success`, …) via Tailwind v4 `@theme`, plus kleine utilities
  (`btn`, `field`, `tile`, `container-shop`). Tinten worden met `color-mix()`
  afgeleid van de merk- en accentkleur.
- `src/app/(shop)/`: winkelpagina's met header, categoriebalk, USP-balk en footer.
- `src/app/(checkout)/`: afrekenen en bevestiging zonder afleiding (alleen logo
  en "Veilig betalen").
- `src/components/shop/`: vaste bouwstenen zoals `Header`, `ProductCard`,
  `Price`, `Rating`, `DeliveryPromise`, `Badge`, `Breadcrumbs`, `QuantityStepper`.
- `src/lib/data.ts`: mockdata en "repository"-functies, overgenomen uit
  `MatrixIncDbInitializer.cs` en aangevuld met categorieën, voorraad,
  beoordelingen en specificaties. Vervang deze functies later door
  `fetch`-calls naar een API; de pagina's hoeven daarvoor niet te veranderen.
- `src/lib/store.ts`: winkelwagen, ingelogde klant, kortingscode en geplaatste
  bestellingen. Dit vervangt de ASP.NET-session en wordt bewaard in `localStorage`.

## Wat er nieuw is ten opzichte van de Razor-versie

- Kortingscode **MECH10** werkt echt (10% korting).
- Zoeken, filteren en sorteren staan in de URL, dus resultaten zijn deelbaar.
- Aantallen aanpassen in de winkelwagen, met de voorraad als maximum.
- Bezorgbelofte en voorraad op elke productkaart en productpagina.
- Aparte checkout met inline adresvalidatie, inclusief Nederlandse postcode.
- Bestelstatus, verwachte bezorgdatum en gekozen bezorging/betaling worden per
  bestelling bewaard.
- Op mobiel blijven prijs en koopknop onderaan in beeld.
