import * as RDialog from "@radix-ui/react-dialog";

import { DialogContent } from "./dialog-content";

import type { DialogProps as RDialogProps } from "@radix-ui/react-dialog";

export interface DialogProps extends RDialogProps {}

const Dialog = ({ children, ...props }: DialogProps) => {
  return <RDialog.Root {...props}>{children}</RDialog.Root>;
};

Dialog.Content = DialogContent;

export { Dialog };
