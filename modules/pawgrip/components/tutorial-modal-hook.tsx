import { Dialog } from "@/common/components/dialog/dialog";
import { useState } from "react";

export const useTutorialModal = () => {
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

  const render = () => {
    return <TutorialModal isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  return {
    isOpen,
    open,
    close,
    trigger,
    render,
  };
};

interface TutorialModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const TutorialModal = ({ isOpen, setIsOpen }: TutorialModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content showCloseButton>
        <div className="p-1">
          <div className="bg-surface-base rounded-2xl">
            <div className="space-y-4 px-4 pt-4 pb-3 md:px-8">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">
                  Step 1: Add items that are ordered
                </h2>
                <p>
                  Click on the product to add to your cart. You can add multiple
                  items to your cart.
                </p>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Step 2: Review the order</h2>
                <p>You can review your cart before checking out.</p>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Step 3: Checkout</h2>
                <p>This will notify me on what are sold.</p>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
