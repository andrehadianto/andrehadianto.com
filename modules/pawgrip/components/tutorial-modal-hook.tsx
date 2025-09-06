import { Button } from "@/common/components/Button";
import { Dialog } from "@/common/components/dialog/dialog";
import { useEffect, useState } from "react";

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
  const [step, setStep] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    setIsImageLoading(true);
  }, [step]);

  const next = () => {
    if (step >= 3) {
      setStep(1);
      setIsOpen(false);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (step <= 1) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content showCloseButton>
        <div className="p-1">
          <div className="bg-surface-base rounded-2xl">
            <div className="px-4 pt-4 pb-3 md:px-8">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">
                    Step 1: Add items that are ordered
                  </h2>
                  <div className="relative min-h-[258px] overflow-hidden rounded-lg">
                    {isImageLoading && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent" />
                      </div>
                    )}
                    <img
                      src="./assets/pawgrips/step-1.gif"
                      alt="Step 1"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => setIsImageLoading(false)}
                    />
                  </div>
                  <p>
                    Click on the product to add to your cart. You can add
                    multiple items to your cart.
                  </p>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">
                    Step 2: Review the order
                  </h2>
                  <div className="relative min-h-[258px] overflow-hidden rounded-lg">
                    {isImageLoading && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent" />
                      </div>
                    )}
                    <img
                      src="./assets/pawgrips/step-2.gif"
                      alt="Step 2"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => setIsImageLoading(false)}
                    />
                  </div>
                  <p>You can review your cart before checking out.</p>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Step 3: Checkout</h2>
                  <div className="relative min-h-[258px] overflow-hidden rounded-lg">
                    {isImageLoading && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent" />
                      </div>
                    )}
                    <img
                      src="./assets/pawgrips/step-3.png"
                      alt="Step 3"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => setIsImageLoading(false)}
                    />
                  </div>
                  <p>This will notify me on what are sold.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-2 px-4 py-3 sm:flex-row md:px-8 md:py-3">
          <Button
            disabled={step <= 1}
            className="w-full md:w-fit"
            variant="tertiary"
            onClick={prev}
          >
            Previous
          </Button>
          <Button
            disabled={step >= 3}
            className="w-full md:w-fit"
            onClick={next}
          >
            Next
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
