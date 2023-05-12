import type { FC } from "react";
import type { Property } from "csstype";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import "./index.scss";

interface IProps extends ICommonProps {
  resize?: Property.Resize;
  wrap?: "hard" | "soft" | "off";
}

const TextArea: FC<IProps> = ({
  className,
  style = {},
  resize = "none",
  wrap = "soft",
  ...rest
}) => {
  return (
    <textarea
      className={cls("textarea", className)}
      style={{
        ...style,
        resize,
      }}
      wrap={wrap}
      {...rest}
    ></textarea>
  );
};

export default component(TextArea);
