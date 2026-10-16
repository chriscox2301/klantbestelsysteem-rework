const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export const formatPrice = (value: number) => euro.format(value);

export const partNumber = (id: number) => `MI-${String(id).padStart(4, "0")}`;

const date = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const time = new Intl.DateTimeFormat("nl-NL", {
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDate = (iso: string) => date.format(new Date(iso));
export const formatTime = (iso: string) => time.format(new Date(iso));

export function splitPrice(value: number) {
  const [euros, cents] = value.toFixed(2).split(".");
  return { euros: Number(euros).toLocaleString("nl-NL"), cents };
}

export function discountPercent(price: number, oldPrice: number) {
  return Math.round((1 - price / oldPrice) * 100);
}

const day = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
/** "dinsdag 14 oktober" */
export const formatDeliveryDate = (d: Date) => day.format(d);

/** Eerstvolgende werkdag na `from` plus `extraDays` werkdagen. */
export function workdaysFrom(from: Date, days: number) {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) left--;
  }
  return d;
}
