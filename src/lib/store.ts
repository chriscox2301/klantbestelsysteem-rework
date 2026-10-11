"use client";

import { useSyncExternalStore } from "react";
import { discountCodes, getProductById, seedOrders } from "./data";
import type {
  CartItem,
  DeliveryMoment,
  Order,
  PaymentMethod,
  ShippingAddress,
} from "./types";

/*
 * Clientstate van de winkel: vervangt de ASP.NET-session (Cart + Customer)
 * en houdt nieuw geplaatste bestellingen bij. Alles staat in localStorage.
 */

type ShopState = {
  cart: CartItem[];
  customerId: number | null;
  discountCode: string | null;
  placedOrders: Order[];
};

const STORAGE_KEY = "matrix-inc-shop";
const MAX_QUANTITY = 50;

const initialState: ShopState = {
  cart: [],
  customerId: null,
  discountCode: null,
  placedOrders: [],
};

let state: ShopState = initialState;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...initialState, ...JSON.parse(raw) };
  } catch {
    // Geen opslag beschikbaar: we starten met een lege winkel.
  }
}

function setState(update: (s: ShopState) => ShopState) {
  state = update(state);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Opslaan mislukt; de state blijft in elk geval in het geheugen.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => initialState;

export function useShop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True zodra de client-state uit localStorage gelezen is. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
const noopSubscribe = () => () => {};

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.floor(n)));

export const shop = {
  addToCart(productId: number, quantity = 1) {
    setState((s) => {
      const existing = s.cart.find((i) => i.productId === productId);
      const cart = existing
        ? s.cart.map((i) =>
            i.productId === productId
              ? { ...i, quantity: clamp(i.quantity + quantity) }
              : i,
          )
        : [...s.cart, { productId, quantity: clamp(quantity) }];
      return { ...s, cart };
    });
  },

  setQuantity(productId: number, quantity: number) {
    setState((s) => ({
      ...s,
      cart: s.cart.map((i) =>
        i.productId === productId ? { ...i, quantity: clamp(quantity) } : i,
      ),
    }));
  },

  removeFromCart(productId: number) {
    setState((s) => ({
      ...s,
      cart: s.cart.filter((i) => i.productId !== productId),
    }));
  },

  /** Geeft false terug als de code niet bestaat. */
  applyDiscount(code: string): boolean {
    const normalized = code.trim().toUpperCase();
    if (!(normalized in discountCodes)) return false;
    setState((s) => ({ ...s, discountCode: normalized }));
    return true;
  },

  removeDiscount() {
    setState((s) => ({ ...s, discountCode: null }));
  },

  logIn(customerId: number) {
    setState((s) => ({ ...s, customerId }));
  },

  logOut() {
    setState((s) => ({ ...s, customerId: null }));
  },

  placeOrder(details: {
    payment: PaymentMethod;
    delivery: DeliveryMoment;
    address: ShippingAddress;
  }): Order | null {
    const s = state;
    if (s.customerId === null || s.cart.length === 0) return null;

    const allOrders = [...seedOrders, ...s.placedOrders];
    const order: Order = {
      id: Math.max(...allOrders.map((o) => o.id)) + 1,
      customerId: s.customerId,
      orderDate: new Date().toISOString(),
      status: "Verwerkt",
      lines: s.cart.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: getProductById(i.productId)?.price ?? 0,
      })),
      discountCode: s.discountCode ?? undefined,
      discountRate: s.discountCode ? discountCodes[s.discountCode] : undefined,
      ...details,
    };

    setState((prev) => ({
      ...prev,
      cart: [],
      discountCode: null,
      placedOrders: [...prev.placedOrders, order],
    }));
    return order;
  },
};

export function getOrdersFor(s: ShopState, customerId: number): Order[] {
  return [...seedOrders, ...s.placedOrders]
    .filter((o) => o.customerId === customerId)
    .sort((a, b) => b.orderDate.localeCompare(a.orderDate));
}

export function findOrder(s: ShopState, id: number): Order | undefined {
  return [...seedOrders, ...s.placedOrders].find((o) => o.id === id);
}

export function orderTotals(order: Pick<Order, "lines" | "discountRate">) {
  const subtotal = order.lines.reduce(
    (sum, l) => sum + l.unitPrice * l.quantity,
    0,
  );
  const discount = order.discountRate ? subtotal * order.discountRate : 0;
  return { subtotal, discount, total: subtotal - discount };
}
