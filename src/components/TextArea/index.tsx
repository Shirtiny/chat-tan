import type { FC } from "react";
import type { Property } from "csstype";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";

import SmoothScrollbar from "../SmoothScrollbar";

import "./index.scss";

interface IProps extends ICommonProps {
  resize?: Property.Resize;

  // hard: 在文本到达元素最大宽度的时候，浏览器自动插入换行符 (CR+LF) 。比如指定 cols值。
  // soft: 在到达元素最大宽度的时候，不会自动插入换行符。
  wrap?: "hard" | "soft" | "off";

  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  cols?: number;
  rows?: number;
  height?: number;
  tabindex?: number;
}

const TextArea: FC<IProps> = ({
  className,
  style = {},
  disabled = false,
  minLength,
  maxLength,
  placeholder,
  resize = "none",
  wrap = "soft",
  cols = 20,
  height = 300,
  tabindex = 0,
  rows,
  ...rest
}) => {
  return (
    <SmoothScrollbar
      className={cls("textarea", className)}
      style={{
        ...style,
        height,
      }}
      continuousScrolling={false}
      tabindex={tabindex}
    >
      <textarea
        style={{
          resize,
        }}
        wrap={wrap}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        {...rest}
      ></textarea>
    </SmoothScrollbar>
  );
};

export default component(TextArea);
