import type { Category, CategorySlug, Customer, Order, Product } from "./types";

/*
 * Mockdata, overgenomen uit MatrixIncDbInitializer.cs en aangevuld met
 * categorieën, voorraad, beoordelingen en specificaties.
 * Zodra er een backend is, kunnen de functies onderaan dit bestand
 * vervangen worden door fetch-calls; de pagina's hoeven dan niet te veranderen.
 */

export const categories: Category[] = [
  {
    slug: "schepen",
    name: "Schepen & aandrijving",
    description: "Hovercrafts, motoren en onderdelen voor de Zion-vloot.",
  },
  {
    slug: "jack-in",
    name: "Jack-in & operator",
    description: "Alles om veilig in en uit de Matrix te gaan.",
  },
  {
    slug: "verdediging",
    name: "Verdediging",
    description: "Detectie en bescherming tegen Sentinels.",
  },
  {
    slug: "uitrusting",
    name: "Kleding & uitrusting",
    description: "Voor binnen en buiten de Matrix.",
  },
];

const largeItem = "Levering in overleg";

export const products: Product[] = [
  {
    id: 1,
    name: "Nebuchadnezzar",
    description:
      "Het schip waarop Neo voor het eerst de echte wereld leert kennen.",
    price: 10000,
    imageUrl: "/img/products/nebuchadnezzar.jpg",
    category: "schepen",
    rating: 4.8,
    reviewCount: 37,
    stock: 1,
    deliveryText: largeItem,
    badge: "bestseller",
    highlights: [
      "Hovercraft van de Mark III-klasse",
      "Ruimte voor negen bemanningsleden",
      "Inclusief vier jack-in chairs en operatorpost",
    ],
    specs: {
      Klasse: "Mark III nr. 11",
      Bemanning: "9 personen",
      Aandrijving: "Elektromagnetisch, 6 pads",
      Bewapening: "EMP-apparaat",
      Gebouwd: "2069, Zion",
    },
  },
  {
    id: 2,
    name: "Jack-in Chair",
    description:
      "Stoel met een rugsteun en metalen armen waarin mensen zitten om ingeplugd te worden in de Matrix via een kabel in de nekpoort.",
    price: 500.5,
    imageUrl: "/img/products/jack-in-chair.jpg",
    category: "jack-in",
    rating: 4.4,
    reviewCount: 112,
    stock: 14,
    highlights: [
      "Verstelbare hoofdsteun met nekpoortgeleider",
      "Armleuningen met fixatiebanden",
      "Geschikt voor de neurale kabel van Matrix Inc.",
    ],
    specs: {
      Materiaal: "Staal en leer",
      Gewicht: "68 kg",
      Aansluiting: "Nekpoort, type Z",
      Garantie: "2 jaar",
    },
  },
  {
    id: 3,
    name: "EMP (Electro-Magnetic Pulse) Device",
    description: "Wapentuig op de schepen van Zion.",
    price: 129.99,
    oldPrice: 159.99,
    imageUrl: "/img/products/emp-device.png",
    category: "verdediging",
    rating: 4.6,
    reviewCount: 248,
    stock: 23,
    badge: "deal",
    highlights: [
      "Schakelt Sentinels in een straal van 500 m uit",
      "Herlaadtijd 40 seconden",
      "Let op: legt ook je eigen schip stil",
    ],
    specs: {
      Bereik: "500 meter",
      Herlaadtijd: "40 seconden",
      Montage: "Romp, onderzijde",
      Gewicht: "120 kg",
    },
  },
  {
    id: 4,
    name: "Hovercraft-motor",
    description:
      "Elektromagnetische aandrijfunit voor hovercrafts van de Zion-vloot. Past op schepen van de Nebuchadnezzar-klasse; inclusief montageset en koelcircuit.",
    price: 3450,
    imageUrl: "",
    category: "schepen",
    rating: 4.2,
    reviewCount: 19,
    stock: 4,
    deliveryText: largeItem,
    highlights: [
      "Past op de Nebuchadnezzar-klasse",
      "Inclusief montageset en koelcircuit",
    ],
    specs: {
      Vermogen: "2,4 MW",
      Koeling: "Gesloten vloeistofcircuit",
      Gewicht: "410 kg",
    },
  },
  {
    id: 5,
    name: "Sentinel-detector",
    description:
      "Draagbare scanner die de elektromagnetische signatuur van Sentinels tot op twee kilometer afstand oppikt. Met trilalarm en tien uur accuduur.",
    price: 749.95,
    imageUrl: "",
    category: "verdediging",
    rating: 4.7,
    reviewCount: 86,
    stock: 31,
    badge: "bestseller",
    highlights: ["Bereik tot 2 km", "Trilalarm", "10 uur accuduur"],
    specs: { Bereik: "2 km", Accuduur: "10 uur", Gewicht: "1,2 kg" },
  },
  {
    id: 6,
    name: "Operator-console",
    description:
      "Werkstation met vier schermen voor de operator aan boord. Toont de code van de Matrix in realtime en laadt trainingsprogramma's voor ingeplugde bemanningsleden.",
    price: 2199,
    oldPrice: 2499,
    imageUrl: "",
    category: "jack-in",
    rating: 4.5,
    reviewCount: 41,
    stock: 6,
    badge: "deal",
    highlights: [
      "Vier schermen met code in realtime",
      "Laadt trainingsprogramma's",
    ],
    specs: { Schermen: "4 × 21 inch", Aansluitingen: "4 jack-in chairs" },
  },
  {
    id: 7,
    name: "Neurale kabel",
    description:
      "Afgeschermde datakabel van 3 meter met nekpoortconnector voor de jack-in chair. Vergulde contactpunten zorgen voor een stabiele verbinding.",
    price: 89.95,
    imageUrl: "",
    category: "jack-in",
    rating: 4.3,
    reviewCount: 305,
    stock: 120,
    highlights: ["3 meter, afgeschermd", "Vergulde contactpunten"],
    specs: { Lengte: "3 m", Connector: "Nekpoort, type Z" },
  },
  {
    id: 8,
    name: "APU-exoskelet",
    description:
      "Bemand pantserpak met twee zware machinegeweren, gebouwd om het dok van Zion te verdedigen. Wordt gemonteerd en ingeregeld geleverd.",
    price: 18500,
    imageUrl: "",
    category: "verdediging",
    rating: 4.9,
    reviewCount: 8,
    stock: 2,
    deliveryText: largeItem,
    badge: "nieuw",
    highlights: ["Bestuurd door één persoon", "Gemonteerd geleverd"],
    specs: { Hoogte: "4,5 m", Bemanning: "1 persoon", Gewicht: "3.200 kg" },
  },
  {
    id: 9,
    name: "Romp-reparatieset",
    description:
      "Lasapparaat, pantserplaten en afdichtpasta om schade aan de romp onderweg te herstellen.",
    price: 389,
    imageUrl: "",
    category: "schepen",
    rating: 4.1,
    reviewCount: 27,
    stock: 0,
    specs: { Inhoud: "Lasapparaat, 6 platen, 2 tubes pasta" },
  },
  {
    id: 10,
    name: "Kungfu-trainingsprogramma",
    description:
      "Laad in tien seconden alle bekende kungfustijlen. Werkt op elke operator-console van Matrix Inc.",
    price: 49.95,
    imageUrl: "",
    category: "jack-in",
    rating: 4.9,
    reviewCount: 512,
    stock: 999,
    deliveryText: "Direct na betaling te downloaden",
    badge: "nieuw",
    specs: { Laadtijd: "10 seconden", Formaat: "Digitaal" },
  },
  {
    id: 11,
    name: "Lange leren jas",
    description:
      "Enkellange jas van zwart leer met verborgen binnenzakken. Valt beter in de Matrix dan in de echte wereld.",
    price: 249,
    imageUrl: "",
    category: "uitrusting",
    rating: 4.6,
    reviewCount: 64,
    stock: 18,
    specs: { Materiaal: "Leer", Maten: "S t/m XXL" },
  },
  {
    id: 12,
    name: "Zonnebril met smalle glazen",
    description:
      "Ovale zonnebril zonder pootjes die vanzelf op je neus blijft zitten. Met etui.",
    price: 79.95,
    oldPrice: 99.95,
    imageUrl: "",
    category: "uitrusting",
    rating: 4.0,
    reviewCount: 133,
    stock: 3,
    badge: "deal",
    specs: { Glazen: "Gepolariseerd", Inclusief: "Etui" },
  },
  {
    id: 13,
    name: "Thermische bemanningstrui",
    description:
      "Grofgebreide trui voor de koude nachten aan boord. Zit niet mooi, houdt je wel warm.",
    price: 59.95,
    imageUrl: "",
    category: "uitrusting",
    rating: 3.8,
    reviewCount: 22,
    stock: 40,
    specs: { Materiaal: "Wol", Maten: "S t/m XXL" },
  },
];

export const customers: Customer[] = [
  { id: 1, name: "Neo", address: "123 Elm St", active: true },
  { id: 2, name: "Morpheus", address: "456 Oak St", active: true },
  { id: 3, name: "Trinity", address: "789 Pine St", active: true },
];

const price = (id: number) => products.find((p) => p.id === id)!.price;

export const seedOrders: Order[] = [
  {
    id: 1,
    customerId: 1,
    orderDate: "2021-01-01T10:12:00",
    status: "Bezorgd",
    lines: [
      { productId: 1, quantity: 1, unitPrice: price(1) },
      { productId: 2, quantity: 2, unitPrice: price(2) },
    ],
  },
  {
    id: 2,
    customerId: 1,
    orderDate: "2021-02-01T16:40:00",
    status: "Bezorgd",
    lines: [{ productId: 3, quantity: 5, unitPrice: price(3) }],
  },
  {
    id: 3,
    customerId: 2,
    orderDate: "2021-02-01T09:05:00",
    status: "Bezorgd",
    lines: [
      { productId: 1, quantity: 3, unitPrice: price(1) },
      { productId: 2, quantity: 1, unitPrice: price(2) },
    ],
  },
  {
    id: 4,
    customerId: 3,
    orderDate: "2021-03-01T21:30:00",
    status: "Geannuleerd",
    lines: [{ productId: 3, quantity: 2, unitPrice: price(3) }],
  },
  {
    id: 5,
    customerId: 2,
    orderDate: "2021-03-14T11:20:00",
    status: "Bezorgd",
    lines: [
      { productId: 7, quantity: 8, unitPrice: price(7) },
      { productId: 6, quantity: 1, unitPrice: price(6) },
    ],
  },
  {
    id: 6,
    customerId: 3,
    orderDate: "2021-04-02T08:45:00",
    status: "Bezorgd",
    lines: [
      { productId: 5, quantity: 4, unitPrice: price(5) },
      { productId: 7, quantity: 6, unitPrice: price(7) },
    ],
  },
  {
    id: 7,
    customerId: 1,
    orderDate: "2021-04-20T19:10:00",
    status: "Onderweg",
    lines: [
      { productId: 5, quantity: 3, unitPrice: price(5) },
      { productId: 4, quantity: 1, unitPrice: price(4) },
    ],
  },
];

export const discountCodes: Record<string, number> = {
  MECH10: 0.1,
};

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
}

export type SortKey = "relevantie" | "prijs-op" | "prijs-af" | "beoordeling";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevantie", label: "Relevantie" },
  { value: "prijs-op", label: "Prijs laag-hoog" },
  { value: "prijs-af", label: "Prijs hoog-laag" },
  { value: "beoordeling", label: "Beoordeling" },
];

export type ProductFilter = {
  query?: string;
  category?: CategorySlug;
  inStock?: boolean;
  onSale?: boolean;
  sort?: SortKey;
};

/** Zoeken, filteren en sorteren voor de catalogus. */
export function findProducts(filter: ProductFilter): Product[] {
  let result = searchProducts(filter.query ?? "");
  if (filter.category) result = result.filter((p) => p.category === filter.category);
  if (filter.inStock) result = result.filter((p) => p.stock > 0);
  if (filter.onSale) result = result.filter((p) => p.oldPrice !== undefined);

  const sorted = [...result];
  switch (filter.sort) {
    case "prijs-op":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "prijs-af":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "beoordeling":
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
  }
  return sorted;
}

/** Aantal producten per categorie binnen een zoekopdracht, voor de filters. */
export function countByCategory(query?: string): Record<CategorySlug, number> {
  const counts = Object.fromEntries(categories.map((c) => [c.slug, 0])) as Record<
    CategorySlug,
    number
  >;
  for (const p of searchProducts(query ?? "")) counts[p.category]++;
  return counts;
}

export function getDeals(): Product[] {
  return products.filter((p) => p.oldPrice !== undefined);
}

/** Producten gesorteerd op totaal verkochte aantallen, zoals GetBestSellingProducts. */
export function getBestSellingProducts(count: number): Product[] {
  const sold = new Map<number, number>();
  for (const order of seedOrders) {
    if (order.status === "Geannuleerd") continue;
    for (const line of order.lines) {
      sold.set(line.productId, (sold.get(line.productId) ?? 0) + line.quantity);
    }
  }
  return [...products]
    .sort((a, b) => (sold.get(b.id) ?? 0) - (sold.get(a.id) ?? 0))
    .slice(0, count);
}

export function getCustomerById(id: number): Customer | undefined {
  return customers.find((c) => c.id === id);
}
