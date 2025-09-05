import * as RDialog from "@radix-ui/react-dialog";

import { DialogVariants, dialogVariants } from "./dialog.theme";

import { CrossIcon } from "@/common/components/CustomIcon";

import type { DialogContentProps as RDialogContentProps } from "@radix-ui/react-dialog";

export interface DialogContentProps
  extends RDialogContentProps,
    DialogVariants {
  showCloseButton?: boolean;
}

export const DialogContent = ({
  children,
  showCloseButton = false,
  className,
  ...props
}: DialogContentProps) => {
  const { overlay, content } = dialogVariants();
  return (
    <RDialog.Portal>
      <RDialog.Overlay className={overlay()}>
        <RDialog.Content {...props} className={content({ className })}>
          <RDialog.Title className="sr-only"></RDialog.Title>
          {children}
          {showCloseButton && (
            <RDialog.Close asChild>
              <button className="bg-element-tertiary absolute top-8 right-8 grid size-8 place-content-center rounded-full">
                <CrossIcon />
              </button>
            </RDialog.Close>
          )}
        </RDialog.Content>
      </RDialog.Overlay>
    </RDialog.Portal>
  );
};
