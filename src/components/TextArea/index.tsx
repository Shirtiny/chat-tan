import { FC, FocusEventHandler, FocusEvent, useCallback, useRef } from "react";
import type { Property } from "csstype";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import logger from "@/utils/logger";

import Scrollbar from "../Scrollbar";

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

  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
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
  rows,

  height = 300,
  tabIndex = 0,
  onFocus,
  ...rest
}) => {
  const scrollbarRef = useRef(null);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLTextAreaElement, Element>) => {
      const scrollbarEl = (scrollbarRef.current as any)?.el;
      scrollbarEl?.focus();
      logger.debug("focus", scrollbarEl);
    },
    []
  );

  return (
    <Scrollbar
      className="textarea-container"
      tabIndex={tabIndex}
      maxHeight={height}
      ref={scrollbarRef}
    >
      <textarea
        onFocus={handleFocus}
        className={cls("textarea", className)}
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
    </Scrollbar>
  );
};

export default component(TextArea);
