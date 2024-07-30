import { tv, type VariantProps } from "tailwind-variants";

export const textTheme = tv({
  base: [
    "text-text-em-high",
    "font-sans",
    // tracking from: https://rsms.me/inter/lab/?size=20
    "tracking-[-0.017rem]",
    "font-medium",
  ],
});

export type TextVariants = VariantProps<typeof textTheme>;
