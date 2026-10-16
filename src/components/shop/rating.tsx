import { Star } from "lucide-react";

export function Rating({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const star = size === "md" ? "size-4" : "size-3.5";
  return (
    <div className={`flex items-center gap-1.5 text-muted ${size === "md" ? "text-sm" : "text-xs"}`}>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${star} ${i <= Math.round(value) ? "fill-star text-star" : "fill-line text-line"}`}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="sr-only">{value.toFixed(1).replace(".", ",")} van 5 sterren</span>
      {count !== undefined && (
        <span>
          ({count}
          <span className="sr-only"> beoordelingen</span>)
        </span>
      )}
    </div>
  );
}
