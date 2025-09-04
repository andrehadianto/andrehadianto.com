/* eslint-disable @next/next/no-img-element */

import { Button } from "@/common/components/Button";

export interface ProductCardProps {
  imgSrc: string;
  name: string;
  description: string;
  price?: number;
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const ProductCard = ({
  imgSrc,
  name,
  description,
  price = 0,
  quantity = 0,
  onIncrease,
  onDecrease,
}: ProductCardProps) => {
  return (
    <div className="border-border-base bg-surface-base group col-span-1 w-full rounded-lg border p-2">
      <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
        <img
          alt={`${name}-image`}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110"
          src={imgSrc}
        />

        {/* Title badge */}
        <div className="pointer-events-none absolute top-2 right-2 left-2">
          <div className="bg-surface-base/90 text-text-em-high border-border-base inline-block max-w-full truncate rounded-md border px-2 py-1 text-xs backdrop-blur">
            {name}
          </div>
        </div>

        {/* Price pill */}
        {price > 0 && (
          <div className="absolute bottom-2 left-2">
            <div className="bg-surface-base/90 text-text-em-high border-border-base rounded-full border px-2 py-1 text-xs font-medium backdrop-blur">
              ${price.toFixed(2)}
            </div>
          </div>
        )}

        {/* Quantity controls */}
        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          <Button
            aria-label="decrease quantity"
            disabled={!onDecrease}
            onClick={onDecrease}
          >
            -
          </Button>
          <span className="text-text-em-high text-sm font-medium">
            {quantity}
          </span>
          <Button
            aria-label="increase quantity"
            disabled={!onIncrease}
            onClick={onIncrease}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
