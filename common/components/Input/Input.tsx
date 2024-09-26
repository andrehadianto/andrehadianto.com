import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import { type InputVariants, inputTheme } from "./Input.theme";

import { Field, FieldFullProps, FieldProps } from "@/common/components/Field";
import { cloneElement } from "@/common/functions";

export interface InputContentProps extends FieldProps {
  // contentProps => wraps the input, left and right contents
  contentProps?: ComponentPropsWithoutRef<"div">;
  id: string;
  placeholder?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  wrapperProps?: FieldFullProps;
}

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "id" | "size">,
    Omit<InputVariants, "hasError">,
    InputContentProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftContent,
      rightContent,
      contentProps,
      wrapperProps,
      placeholder,
      id,
      size,
      label,
      error,
      message,
      unstyled,
      variant,
      ...props
    },
    ref,
  ) => {
    const { content, input, sideContent } = inputTheme({
      hasError: error,
      size,
      unstyled,
      variant,
    });

    const styledLeftContent = cloneElement({
      element: leftContent,
      themeStyle: sideContent,
    });

    const styledRightContent = cloneElement({
      element: rightContent,
      themeStyle: sideContent,
    });

    return (
      <Field
        {...wrapperProps}
        error={error}
        htmlFor={id}
        label={label}
        message={message}
        size={size}
      >
        <div
          {...contentProps}
          className={content({
            className: contentProps?.className,
          })}
        >
          {styledLeftContent}
          <input
            ref={ref}
            autoComplete="off"
            className={input({
              className,
            })}
            id={id}
            placeholder={placeholder}
            type="text"
            {...props}
          />
          {styledRightContent}
        </div>
      </Field>
    );
  },
);

Input.displayName = "Input";
