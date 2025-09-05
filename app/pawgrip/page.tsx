"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/common/components/Button";
import { CatIcon } from "@/common/components/CustomIcon";
import { Text } from "@/common/components/Text";
import { PRODUCTS, ProductCard, useConfirmationModal } from "@/modules/pawgrip";

export default function PawgripPage() {
  const [loading, setLoading] = useState(false);

  const {
    render: renderConfirmationModal,
    open,
    close,
  } = useConfirmationModal({
    loading,
    onConfirm: async () => {
      try {
        setLoading(true);
        await fetch(
          "https://primary-production-3984b.up.railway.app/webhook/3cf18b9c-9b5b-419b-b0ed-26d8602d03b0",
          {
            method: "POST",
            body: JSON.stringify({
              cart: cartItems.map((item) => ({
                id: item.product.id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
                total: item.total,
              })),
              subtotal,
              discount,
              total,
            }),
          },
        );

        toast.success("Checkout completed successfully!");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        toast.error("Failed to checkout. Please try again.");
      } finally {
        setLoading(false);
        close();
      }
    },
  });
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
            <div className="flex items-center gap-2">
              <CatIcon className="size-8" />
              <Text as="h1" className="text-2xl font-semibold">
                PawGrip
              </Text>
            </div>
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
                  {discountCount > 0 && (
                    <div
                      key={`discount-tag`}
                      className="border-border-base h-fit rounded-md border px-3 py-1 text-xs"
                    >
                      <span className="text-text-em-high">Pair discount</span>
                      <span className="text-text-em-high ml-2 font-medium">
                        -$10.00 × {discountCount}
                      </span>
                    </div>
                  )}
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
                disabled={cartItems.length === 0 || loading}
                loading={loading}
                onClick={open}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {renderConfirmationModal({
        items: cartItems.map(({ product, quantity, total }) => ({
          id: product.id,
          name: product.name,
          quantity,
          total,
        })),
        subtotal,
        discount,
        discountCount,
        total,
      })}
    </main>
  );
}
