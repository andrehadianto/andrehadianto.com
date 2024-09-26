import { type VariantProps, tv } from "tailwind-variants";

export const fieldTheme = tv({
  slots: {
    wrapper: "",
    label: ["w-full", "text-text-em-mid", "block", "pl-1"],
    message: [
      "mt-2",
      "flex",
      "items-start",
      "gap-1",
      "pl-1",
      "text-text-em-low",
      "data-[error]:text-text-error",
    ],
    children: [],
  },
  variants: {
    size: {
      md: {
        wrapper: ["gap-2"],
        label: ["text-base"],
        message: ["text-sm"],
      },
      sm: {
        wrapper: ["gap-1.5"],
        label: ["text-sm"],
        message: ["text-xs"],
      },
    },
    orientation: {
      horizontal: {
        wrapper: ["flex", "items-center"],
        children: ["flex", "flex-col", "items-center"],
      },
      vertical: {
        wrapper: ["flex", "flex-col"],
      },
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "vertical",
  },
});

export type FieldVariants = VariantProps<typeof fieldTheme>;
