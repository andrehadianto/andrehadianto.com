/* eslint-disable @next/next/no-img-element */

import { Icon } from "@iconify-icon/react";

import { Button } from "@/common/components/Button";
import { cn } from "@/common/functions";
import { formatCurrency } from "@/modules/pawgrip";

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
    <div
      className={cn(
        "bg-surface-base group col-span-1 w-full rounded-lg border p-2",
        quantity > 0 ? "border-element-primary" : "border-border-base",
      )}
    >
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

        {/* Added + Price pills */}
        {(quantity > 0 || price > 0) && (
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            {quantity > 0 && (
              <div className="bg-element-primary text-text-em-high flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium backdrop-blur">
                <Icon icon="mdi:check-bold" />
                Added
              </div>
            )}
            {price > 0 && (
              <div className="bg-surface-base/90 text-text-em-high border-border-base rounded-full border px-2 py-1 text-xs font-medium backdrop-blur">
                {formatCurrency(price)}
              </div>
            )}
          </div>
        )}

        {/* Quantity controls */}
        <div className="bg-surface-base/90 absolute right-2 bottom-2 flex items-center gap-2 rounded-lg px-2 py-1">
          <Button
            aria-label="decrease quantity"
            disabled={!onDecrease}
            iconLeft={<Icon icon="mdi:minus" />}
            size="sm"
            variant="tertiary"
            onClick={onDecrease}
          />
          <span className="text-text-em-high text-sm font-medium">
            {quantity}
          </span>
          <Button
            aria-label="increase quantity"
            disabled={!onIncrease}
            iconRight={<Icon icon="mdi:plus" />}
            size="sm"
            variant="tertiary"
            onClick={onIncrease}
          />
        </div>
      </div>
    </div>
  );
};
