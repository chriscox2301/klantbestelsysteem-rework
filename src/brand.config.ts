// Alles wat per klant verschilt. Componenten lezen hieruit, nooit hardcoden.

export type BrandConfig = {
  name: string;
  logo: { src: string; width: number; height: number; alt: string };
  colors: {
    /** Links, primaire koopknop, actieve states. De header is een donkere afgeleide. */
    primary: string;
    /** Tekst op primary. Wit voor donkere merkkleuren, #1f2328 voor lichte. */
    primaryContrast: string;
    /** Deal-labels, zoekknop en highlights: het rood uit het logo. */
    accent: string;
  };
  usps: string[];
  /** Gratis verzending vanaf dit bedrag in euro's (0 = altijd gratis, null = altijd betaald) */
  freeShippingFrom: number | null;
  shippingCost: number;
  /** Standaard bezorgbelofte bij producten op voorraad */
  deliveryPromise: string;
  /** Bedenktijd in dagen (minimaal 14) */
  returnDays: number;
  paymentMethods: string[];
  contact: { email: string; phone: string; address: string; hours: string };
};

export const brand: BrandConfig = {
  name: "Matrix Inc.",
  logo: { src: "/img/matrix-logo.png", width: 743, height: 98, alt: "Matrix Inc." },
  colors: {
    primary: "#0b5563",
    primaryContrast: "#ffffff",
    accent: "#d2121b",
  },
  usps: [
    "Altijd gratis verzending",
    "Voor 22:00 besteld, morgen in huis",
    "30 dagen bedenktijd",
    "Veilig betalen met iDEAL",
  ],
  freeShippingFrom: 0,
  shippingCost: 0,
  deliveryPromise: "Voor 22:00 besteld, morgen in huis",
  returnDays: 30,
  paymentMethods: ["iDEAL", "Creditcard", "PayPal", "Achteraf betalen"],
  contact: {
    email: "klantenservice@matrix-inc.example",
    phone: "020 123 45 67",
    address: "Zionweg 101, 1011 AB Amsterdam",
    hours: "ma–vr 9:00–17:00",
  },
};
