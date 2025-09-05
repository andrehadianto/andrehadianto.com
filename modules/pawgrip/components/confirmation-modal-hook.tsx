import { useState } from "react";

import { Button } from "@/common/components/Button";
import { Dialog } from "@/common/components/dialog/dialog";

interface UseConfirmationModalProps {
  onConfirm: () => void;
  loading?: boolean;
}

export type ConfirmationCartItem = {
  id: string;
  name: string;
  quantity: number;
  total: number;
};

export type ConfirmationCart = {
  items: ConfirmationCartItem[];
  subtotal: number;
  discount: number;
  discountCount: number;
  total: number;
};

export const useConfirmationModal = ({
  onConfirm,
  loading,
}: UseConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const trigger = () => {
    setIsOpen((prev) => !prev);
  };

  const render = (cart?: ConfirmationCart) => {
    return (
      <ConfirmationModal
        cart={cart}
        isOpen={isOpen}
        loading={loading}
        setIsOpen={setIsOpen}
        onCancel={close}
        onConfirm={onConfirm}
      />
    );
  };

  return {
    isOpen,
    open,
    close,
    trigger,
    render,
  };
};

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  cart?: ConfirmationCart;
  loading?: boolean;
}
export const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
  onCancel,
  cart,
  loading,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content>
        <div className="p-1">
          <div className="bg-surface-base rounded-2xl">
            <div className="space-y-4 px-4 pt-4 pb-3 md:px-8">
              <h1 className="text-xl font-bold">Checkout</h1>

              {cart && (
                <>
                  <div className="max-h-64 space-y-2 overflow-auto pr-1">
                    {cart.items.length === 0 ? (
                      <p className="text-text-em-med text-sm">No items.</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {cart.items.map((item) => (
                          <div
                            key={item.id}
                            className="border-border-base flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                          >
                            <span className="text-text-em-high truncate">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="text-text-em-high ml-2 font-medium">
                              ${item.total.toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {cart.discountCount > 0 && (
                          <div
                            key={`discount-tag-modal`}
                            className="border-border-base flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                          >
                            <span className="text-text-em-high">
                              Pair discount
                            </span>
                            <span className="text-text-em-high ml-2 font-medium">
                              -$10.00 × {cart.discountCount}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-text-em-high">Subtotal</p>
                      <p className="text-text-em-high">
                        ${cart.subtotal.toFixed(2)}
                      </p>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between">
                        <p className="text-text-em-high">Discount</p>
                        <p className="text-text-em-high">
                          -{`$${cart.discount.toFixed(2)}`}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold">
                      <p className="text-text-em-high">Total</p>
                      <p className="text-text-em-high">
                        ${cart.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-4 py-3 md:px-8 md:py-3">
            <Button
              className="w-full md:w-fit"
              disabled={loading}
              variant="tertiary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="w-full md:w-fit"
              disabled={loading}
              loading={loading}
              onClick={onConfirm}
            >
              Submit
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
