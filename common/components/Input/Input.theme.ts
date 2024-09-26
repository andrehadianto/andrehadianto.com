import { tv, type VariantProps } from "tailwind-variants";

export const inputTheme = tv({
  slots: {
    content: [
      "w-full",
      "flex",
      "items-center",
      "whitespace-nowrap",
      "transition-all",
      "text-text-em-high",
      "[&_input::placeholder]:text-text-em-low",
      "focus-within:border-element-primary",
      "[&_textarea::placeholder]:text-text-em-low",
      "focus-within:text-text-em-mid",
    ],
    sideContent: ["text-text-em-low"],
    input: [
      "w-full",
      "flex-1",
      "bg-transparent",
      "focus:outline-none", // outline-0 doesn't work for Safari
      "text-text-em-high",
      "caret-current",
    ],
  },
  variants: {
    variant: {
      default: {
        content: ["bg-surface-base"],
      },
      elevated: {
        content: ["bg-surface-base-elevated"],
      },
    },
    size: {
      md: {
        content: [
          "py-2",
          "px-3",
          "max-h-9",
          "rounded-[6px]",
          "gap-2",
          "text-base",
        ],
      },
      sm: {
        content: [
          "px-2.5",
          "py-1.5",
          "max-h-[30px]",
          "rounded-[6px]",
          "gap-1.5",
          "text-sm",
        ],
      },
    },
    hasError: {
      true: {
        content: "border-text-error",
      },
    },
    unstyled: {
      true: {
        content: [
          "border-none",
          "bg-transparent",
          "text-text-em-high",
          "w-fit",
          "p-0",
        ],
        input: ["text-text-em-high", "w-fit", "flex-none"],
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    unstyled: false,
    hasError: false,
  },
});

export type InputVariants = VariantProps<typeof inputTheme>;
