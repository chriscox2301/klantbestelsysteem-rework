"use client";

import { discountCodes, getProductById } from "@/lib/data";
import { orderTotals, useShop } from "@/lib/store";

/** Regels en totalen van de huidige winkelwagen, gedeeld door winkelwagen en checkout. */
export function useCartLines() {
  const state = useShop();
  const lines = state.cart.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const totals = orderTotals({
    lines: lines.map((l) => ({ productId: l.product.id, quantity: l.quantity, unitPrice: l.product.price })),
    discountRate: state.discountCode ? discountCodes[state.discountCode] : undefined,
  });
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  return { ...state, lines, totals, count };
}
