import Image from "next/image";
import type { Product } from "@/lib/types";

/** Eerste letters van de eerste twee woorden, bijv. "Neurale kabel" → "NK". */
function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .filter((word) => /^\p{L}/u.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Productbeeld in een vaste 4:3-verhouding. De foto's in de catalogus zijn
 * donkere sfeerbeelden, dus zonder imageUrl tonen we een placeholder in
 * dezelfde donkere toon met initialen, zodat de grid één geheel blijft.
 */
export function ProductImage({
  product,
  sizes,
  alt = "",
  preload = false,
  className = "",
  imageClassName = "",
}: {
  product: Pick<Product, "name" | "imageUrl">;
  sizes: string;
  /** Leeg laten als de productnaam al naast het beeld staat. */
  alt?: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`@container relative aspect-[4/3] overflow-hidden rounded-sm bg-brand-deep ${className}`}>
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={alt}
          fill
          preload={preload}
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <div
          {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
          className={`absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgb(255_255_255/0.08),transparent_65%),linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] bg-[size:100%_100%,12.5%_16.667%,12.5%_16.667%] text-white ${imageClassName}`}
        >
          <span className="font-wide text-[22cqw] leading-none font-extrabold tracking-tight text-white/90">
            {initials(product.name)}
          </span>
          <span className="mt-[4cqw] hidden max-w-[80%] truncate text-[max(0.75rem,3.5cqw)] font-medium text-white/60 @[14rem]:block">
            {product.name}
          </span>
        </div>
      )}
    </div>
  );
}
