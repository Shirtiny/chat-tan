import {
  FC,
  FocusEventHandler,
  FocusEvent,
  useCallback,
  useRef,
  useState,
  ChangeEvent,
} from "react";
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
  onFocus,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const scrollbarRef = useRef(null);
  const textareaRef = useRef(null);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLTextAreaElement, Element>) => {
      setFocus(true);
    },
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement, Element>) => {
      setFocus(false);
    },
    []
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = String(el.scrollHeight) + "px";
  }, []);

  return (
    <Scrollbar
      className={cls("textarea-container", { focus })}
      maxHeight={height}
      ref={scrollbarRef}
    >
      <textarea
        ref={textareaRef}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      ></textarea>
    </Scrollbar>
  );
};

export default component(TextArea);
