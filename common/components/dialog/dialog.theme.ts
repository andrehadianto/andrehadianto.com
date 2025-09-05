import { tv, type VariantProps } from "tailwind-variants";

export const dialogVariants = tv({
  slots: {
    overlay: [
      "fixed",
      "inset-0",
      "z-50",
      "bg-black/50",
      "flex",
      "justify-center",
      "items-end",
      "lg:items-center",
      "data-[state=closed]:animate-fade-out",
      "data-[state=open]:animate-fade-in",
    ],
    content: [
      "relative",
      "z-[99]",
      "md:rounded-[1.25rem]",
      "rounded-t-[1.25rem]",
      "h-fit",
      "w-full",
      "max-w-[39.5rem]",
      "bg-surface-elevated",
      "mx-auto",
      "overflow-hidden",
      "data-[state=closed]:animate-slide-down-fade-out",
      "data-[state=open]:animate-slide-up-fade-in",
    ],
  },
});

export type DialogVariants = VariantProps<typeof dialogVariants>;
