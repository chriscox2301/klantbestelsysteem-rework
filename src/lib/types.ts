export type CategorySlug = "schepen" | "jack-in" | "verdediging" | "uitrusting";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  /** Adviesprijs; alleen gezet als het product in de aanbieding is. */
  oldPrice?: number;
  imageUrl: string;
  category: CategorySlug;
  rating?: number;
  reviewCount?: number;
  /** 0 = tijdelijk uitverkocht */
  stock: number;
  /** Vervangt brand.deliveryPromise, bijv. voor grote producten. */
  deliveryText?: string;
  badge?: "deal" | "nieuw" | "bestseller";
  highlights?: string[];
  specs?: Record<string, string>;
};

export type Customer = {
  id: number;
  name: string;
  address: string;
  active: boolean;
};

export type CartItem = {
  productId: number;
  quantity: number;
};

export type OrderStatus = "Verwerkt" | "Onderweg" | "Bezorgd" | "Geannuleerd";

export type PaymentMethod = "ideal" | "creditcard" | "paypal" | "afterpay";
export type DeliveryMoment = "standard" | "express" | "evening";

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
};

export type OrderLine = {
  productId: number;
  quantity: number;
  /** Prijs per stuk op het moment van bestellen. */
  unitPrice: number;
};

export type Order = {
  id: number;
  customerId: number;
  orderDate: string;
  status: OrderStatus;
  lines: OrderLine[];
  discountCode?: string;
  discountRate?: number;
  payment?: PaymentMethod;
  delivery?: DeliveryMoment;
  address?: ShippingAddress;
};
