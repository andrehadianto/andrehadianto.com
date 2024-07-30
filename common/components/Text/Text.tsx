import { type PropsWithChildren } from "react";

import { textTheme, type TextVariants } from "./Text.theme";

import { PolymorphicProps } from "@/common/types/system";

export type TextElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type TextProps<Element extends TextElementType> = PropsWithChildren<
  PolymorphicProps<Element, TextVariants>
>;

export const Text = <Element extends TextElementType>({
  children,
  as,
  className,
  ...props
}: TextProps<Element>) => {
  // Component is the element that will be rendered
  const Component = as ?? "h1";

  return (
    <Component
      {...props}
      className={textTheme({
        className,
      })}
    >
      {children}
    </Component>
  );
};
