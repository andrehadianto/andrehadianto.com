"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/common/components/Button";
import { CatIcon, InfoIcon } from "@/common/components/CustomIcon";
import { Text } from "@/common/components/Text";
import {
  PRODUCTS,
  ProductCard,
  useConfirmationModal,
  computeTotals,
  formatCurrency,
  type CartLineItem,
} from "@/modules/pawgrip";
import { useTutorialModal } from "@/modules/pawgrip/components/tutorial-modal-hook";

export default function PawgripPage() {
  const [loading, setLoading] = useState(false);

  const { render: renderTutorialModal, open: openTutorialModal } =
    useTutorialModal();

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
              cart: cartItems.map((item: CartLineItem) => ({
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
        setQuantities({});
        close();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        toast.error("Failed to checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const increase = useCallback((id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const decrease = useCallback((id: string) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) - 1);
      return { ...prev, [id]: next };
    });
  }, []);

  const { cartItems, subtotal, discountCount, discount, total } = useMemo(
    () => computeTotals(quantities, PRODUCTS),
    [quantities],
  );

  return (
    <main className="px-4 pt-10 pb-64 sm:pb-48 lg:pb-40">
      <div className="mx-auto max-w-6xl">
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <CatIcon className="size-12" />
              <Text as="h1" className="text-5xl font-semibold">
                PawGrip x CLIMば
              </Text>
            </div>
            <p className="text-text-em-med mt-1 flex items-center text-sm">
              Point-of-sale web app for PawGrip purchases. Add quantities and
              review your order.
              <span className="ml-2">
                <button onClick={openTutorialModal}>
                  <InfoIcon className="size-4" />
                </button>
              </span>
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
                <div className="grid min-h-40 grid-cols-2 content-start gap-2 overflow-auto pr-1 sm:grid-cols-3">
                  {cartItems.map(
                    ({ product, quantity, total }: CartLineItem) => (
                      <div
                        key={product.id}
                        className="border-border-base h-fit rounded-md border px-3 py-1 text-xs"
                      >
                        <span className="text-text-em-high">
                          {product.name} × {quantity}
                        </span>
                        <span className="text-text-em-high ml-2 font-medium">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    ),
                  )}
                  {discountCount > 0 && (
                    <div
                      key={`discount-tag`}
                      className="border-border-base h-fit rounded-md border px-3 py-1 text-xs"
                    >
                      <span className="text-text-em-high">Pair discount</span>
                      <span className="text-text-em-high ml-2 font-medium">
                        -{formatCurrency(10)} × {discountCount}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex w-full shrink-0 flex-col items-end gap-4 self-end sm:w-auto">
              <div className="text-right text-sm">
                <div>
                  <span className="text-text-em-med">Subtotal</span>
                  <span className="text-text-em-high ml-2">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div>
                    <span className="text-text-em-med">Discount</span>
                    <span className="text-text-em-high ml-2">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                )}
                <div className="font-semibold">
                  <span className="text-text-em-med">Total</span>
                  <span className="text-text-em-high ml-2">
                    {formatCurrency(total)}
                  </span>
                </div>
                {total > 0 && (
                  <div className="font-semibold">
                    <span className="text-text-em-med">To be transferred</span>
                    <span className="text-text-em-high ml-2">
                      {formatCurrency(total * 0.7)}
                    </span>
                  </div>
                )}
              </div>
              <Button
                className="w-full min-w-[120px]"
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

      {renderTutorialModal()}
    </main>
  );
}
