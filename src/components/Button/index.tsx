import { FC, useCallback } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls, clsPainPattern } from "@shirtiny/utils/lib/style";
import "./index.scss";

interface IProps extends ICommonProps {
  withIcon?: boolean;
  type?: "text";
  shape?: "circle" | "rect";
  active?: boolean
}

const Button: FC<IProps> = ({
  className,
  style = {},
  active,
  children,
  withIcon,
  type,
  shape = "rect",
  ...rest
}) => {
  return (
    <button
      className={cls(
        "button",
        className,
        active && "button--active",
        withIcon && "button--with-icon",
        clsPainPattern({ type, shape })
      )}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default component(Button);
