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
 * Productbeeld in de vaste 4:3-verhouding op een donker vlak. Zonder
 * imageUrl tonen we een placeholder met initialen (en de naam, als er
 * ruimte voor is), zodat nieuwe producten er ook zonder foto verzorgd uitzien.
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
    <div className={`@container relative aspect-[4/3] overflow-hidden bg-ink ${className}`}>
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
          className={`absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:12.5%_16.667%] text-plate ${imageClassName}`}
        >
          <span className="font-wide text-[24cqw] leading-none font-extrabold tracking-tight">
            {initials(product.name)}
          </span>
          <span className="mt-[4cqw] hidden max-w-[80%] truncate text-[max(0.75rem,3.5cqw)] font-medium tracking-[0.2em] text-plate/70 uppercase @[12rem]:block">
            {product.name}
          </span>
          <span className="absolute bottom-0 left-0 h-[3px] w-1/4 bg-signal" />
        </div>
      )}
    </div>
  );
}
