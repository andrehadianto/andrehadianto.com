"use client";

import { useMemo, useState } from "react";

import { Button } from "@/common/components/Button";
import { Text } from "@/common/components/Text";
import { ProductCard } from "@/modules/pawgrip";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Paw Grip v2 - Black",
    description: "Matte texture, firm hold for daily use.",
    price: 25.0,
    imgSrc: "https://placehold.in/600x400?text=Black",
  },
  {
    id: "p2",
    name: "Paw Grip v2 - White",
    description: "Clean look, reliable grip finish.",
    price: 25.0,
    imgSrc: "https://placehold.in/600x400?text=White",
  },
  {
    id: "p3",
    name: "Paw Grip v2 - Orange",
    description: "Soft hue with the same trusted feel.",
    price: 25.0,
    imgSrc: "https://placehold.in/600x400?text=Pink",
  },
  {
    id: "p4",
    name: "Paw Grip v3 - Black",
    description: "Cool tone, steady performance.",
    price: 30.0,
    imgSrc: "https://placehold.in/600x400?text=Blue",
  },
  {
    id: "p5",
    name: "Paw Grip v3 - White",
    description: "Fresh style, consistent traction.",
    price: 30.0,
    imgSrc: "https://placehold.in/600x400?text=Green",
  },
];

export default function PawgripPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const increase = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const decrease = (id: string) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) - 1);
      return { ...prev, [id]: next };
    });
  };

  const cartItems = useMemo(
    () =>
      PRODUCTS.filter((p) => (quantities[p.id] ?? 0) > 0).map((p) => ({
        product: p,
        quantity: quantities[p.id] ?? 0,
        total: (quantities[p.id] ?? 0) * p.price,
      })),
    [quantities],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.total, 0),
    [cartItems],
  );

  const totalItems = useMemo(
    () => Object.values(quantities).reduce((acc, qty) => acc + (qty ?? 0), 0),
    [quantities],
  );
  const discountCount = useMemo(() => Math.floor(totalItems / 2), [totalItems]);
  const discount = useMemo(() => discountCount * 10, [discountCount]);
  const total = useMemo(
    () => Math.max(0, subtotal - discount),
    [subtotal, discount],
  );

  return (
    <main className="px-4 pt-10 pb-64 sm:pb-48 lg:pb-40">
      <div className="mx-auto max-w-6xl">
        <section>
          <div className="mb-6">
            <Text as="h1" className="text-2xl font-semibold">
              Pawgrip
            </Text>
            <p className="text-text-em-med mt-1 text-sm">
              Point-of-sale web app for PawGrip. Add quantities and review your
              order.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                description={product.description}
                imgSrc={product.imgSrc}
                name={product.name}
                price={product.price}
                quantity={quantities[product.id] ?? 0}
                onDecrease={() => decrease(product.id)}
                onIncrease={() => increase(product.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <aside className="border-border-base bg-surface-base/90 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              {cartItems.length === 0 ? (
                <p className="text-text-em-med text-sm">No items yet.</p>
              ) : (
                <div className="grid min-h-40 grid-cols-2 content-start gap-2 overflow-auto pr-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {cartItems.map(({ product, quantity, total }) => (
                    <div
                      key={product.id}
                      className="border-border-base h-fit rounded-md border px-3 py-1 text-xs"
                    >
                      <span className="text-text-em-high">
                        {product.name} × {quantity}
                      </span>
                      <span className="text-text-em-high ml-2 font-medium">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {discountCount > 0 &&
                    Array.from({ length: discountCount }).map((_, index) => (
                      <div
                        key={`discount-${index}`}
                        className="border-border-base h-fit rounded-md border px-3 py-1 text-xs"
                      >
                        <span className="text-text-em-high">Pair discount</span>
                        <span className="text-text-em-high ml-2 font-medium">
                          -$10.00
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-4 self-end">
              <div className="text-right text-sm">
                <div>
                  <span className="text-text-em-med">Subtotal</span>
                  <span className="text-text-em-high ml-2">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div>
                    <span className="text-text-em-med">Discount</span>
                    <span className="text-text-em-high ml-2">
                      -{`$${discount.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <div className="font-semibold">
                  <span className="text-text-em-med">Total</span>
                  <span className="text-text-em-high ml-2">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="min-w-[120px]"
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
