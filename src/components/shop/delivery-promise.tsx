import { brand } from "@/brand.config";

export function DeliveryPromise({
  stock,
  text,
  size = "sm",
}: {
  stock: number;
  text?: string;
  size?: "sm" | "md";
}) {
  const textSize = size === "md" ? "text-base" : "text-[13px] leading-snug";
  if (stock <= 0) {
    return <p className={`${textSize} font-semibold text-danger`}>Tijdelijk uitverkocht</p>;
  }
  return (
    <div className={textSize}>
      <p className="font-semibold text-success">{text ?? brand.deliveryPromise}</p>
      {stock <= 5 && (
        <p className="text-xs text-muted">Nog {stock} op voorraad</p>
      )}
    </div>
  );
}
