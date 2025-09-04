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

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Paw Grip v2 - Black",
    description: "Matte texture, firm hold for daily use.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Black",
  },
  {
    id: "p2",
    name: "Paw Grip v2 - White",
    description: "Clean look, reliable grip finish.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=White",
  },
  {
    id: "p3",
    name: "Paw Grip v2 - Pink",
    description: "Soft hue with the same trusted feel.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Pink",
  },
  {
    id: "p4",
    name: "Paw Grip v2 - Blue",
    description: "Cool tone, steady performance.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Blue",
  },
  {
    id: "p5",
    name: "Paw Grip v2 - Green",
    description: "Fresh style, consistent traction.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Green",
  },
  {
    id: "p6",
    name: "Paw Grip v2 - Orange",
    description: "Vibrant pop with dependable grip.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Orange",
  },
  {
    id: "p7",
    name: "Paw Grip v2 - White",
    description: "Clean look, reliable grip finish.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=White",
  },
  {
    id: "p8",
    name: "Paw Grip v2 - Pink",
    description: "Soft hue with the same trusted feel.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Pink",
  },
  {
    id: "p9",
    name: "Paw Grip v2 - Blue",
    description: "Cool tone, steady performance.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Blue",
  },
  {
    id: "p10",
    name: "Paw Grip v2 - Green",
    description: "Fresh style, consistent traction.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Green",
  },
  {
    id: "p11",
    name: "Paw Grip v2 - Orange",
    description: "Vibrant pop with dependable grip.",
    price: 12.0,
    imgSrc: "https://placehold.in/600x400?text=Orange",
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
      MOCK_PRODUCTS.filter((p) => (quantities[p.id] ?? 0) > 0).map((p) => ({
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

  return (
    <main className="px-4 pt-10 pb-64 sm:pb-48 lg:pb-40">
      <div className="mx-auto max-w-6xl">
        <section>
          <div className="mb-6">
            <Text as="h1" className="text-2xl font-semibold">
              Pawgrip
            </Text>
            <p className="text-text-em-med mt-1 text-sm">
              Minimal, clean checkout. Add quantities and review your order.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_PRODUCTS.map((product) => (
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

      <div className="border-border-base bg-surface-base/90 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
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
                      className="border-border-base rounded-md border px-3 py-1 text-xs"
                    >
                      <span className="text-text-em-high">
                        {product.name} × {quantity}
                      </span>
                      <span className="text-text-em-high ml-2 font-medium">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <div className="text-sm">
                <span className="text-text-em-med">Subtotal</span>
                <span className="text-text-em-high ml-2 font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
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
      </div>
    </main>
  );
}
