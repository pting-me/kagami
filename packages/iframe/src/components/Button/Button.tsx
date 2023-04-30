import { ComponentPropsWithRef, forwardRef } from "react";

import clsx from "clsx";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /* empty */
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <button
        className={clsx(
          "border-stroke-strong box-border flex h-full select-none items-center justify-center rounded-md border bg-clip-padding px-3",
          className
        )}
        {...rest}
        ref={ref}
      ></button>
    );
  }
);

Button.displayName = "Button";
