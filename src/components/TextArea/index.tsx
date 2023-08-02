import {
  FC,
  FocusEventHandler,
  FocusEvent,
  useCallback,
  useRef,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
} from "react";
import type { Property } from "csstype";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import { DomEventStore } from "@shirtiny/utils/lib/events";
import logger from "@/utils/logger";

import Scrollbar, { IScrollbarRef } from "../Scrollbar";

import "./index.scss";

const domEventStore = new DomEventStore();

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
  maxHeight?: number;

  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
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

  maxHeight = 300,
  onFocus,
  onChange,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const scrollbarRef = useRef<IScrollbarRef>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLTextAreaElement, Element>) => {
      textareaRef.current?.focus();
      setFocus(true);
    },
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement, Element>) => {
      textareaRef.current?.blur();
      setFocus(false);
    },
    []
  );

  const fitTextareaHeight = useCallback(() => {
    logger.debug("fit textarea height");
    const el = textareaRef.current!;
    el.style.height = "auto";
    el.style.height = String(el.scrollHeight) + "px";
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      fitTextareaHeight();
      onChange && onChange(e);
    },
    [fitTextareaHeight]
  );

  useEffect(() => {
    if (!scrollbarRef.current?.el || !textareaRef.current) return;
    domEventStore.observeResize(
      "textarea-resize",
      scrollbarRef.current.el,
      (entries) => {
        logger.debug("textarea observeResize", entries);
        fitTextareaHeight();
      },
      "border-box"
    );
    return () => {
      domEventStore.removeObserver("textarea-resize");
    };
  }, [scrollbarRef.current, textareaRef.current]);

  return (
    <Scrollbar
      ref={scrollbarRef}
      className={cls("textarea-container", className, { focus })}
      maxHeight={maxHeight}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <textarea
        ref={textareaRef}
        className="textarea"
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
        onChange={handleChange}
        {...rest}
      ></textarea>
    </Scrollbar>
  );
};

export default component(TextArea);
