import { ComponentPropsWithRef, forwardRef } from "react";

import clsx from "clsx";

import styles from "./Button.module.css";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /* empty */
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <button
        className={clsx(styles.button, className)}
        {...rest}
        ref={ref}
      ></button>
    );
  }
);

Button.displayName = "Button";
