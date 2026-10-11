import type { Customer, Order, Product } from "./types";

/*
 * Mockdata, overgenomen uit MatrixIncDbInitializer.cs.
 * Zodra er een backend is, kunnen de functies onderaan dit bestand
 * vervangen worden door fetch-calls; de pagina's hoeven dan niet te veranderen.
 */

export const products: Product[] = [
  {
    id: 1,
    name: "Nebuchadnezzar",
    description:
      "Het schip waarop Neo voor het eerst de echte wereld leert kennen.",
    price: 10000,
    imageUrl: "/img/products/nebuchadnezzar.jpg",
  },
  {
    id: 2,
    name: "Jack-in Chair",
    description:
      "Stoel met een rugsteun en metalen armen waarin mensen zitten om ingeplugd te worden in de Matrix via een kabel in de nekpoort.",
    price: 500.5,
    imageUrl: "/img/products/jack-in-chair.jpg",
  },
  {
    id: 3,
    name: "EMP (Electro-Magnetic Pulse) Device",
    description: "Wapentuig op de schepen van Zion.",
    price: 129.99,
    imageUrl: "/img/products/emp-device.png",
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

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
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
