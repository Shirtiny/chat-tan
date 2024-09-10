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
import { calcTextareaHeight } from "./util";
import { isObject } from "lodash";

const domEventStore = new DomEventStore();

interface IProps extends ICommonProps {
  value?: string;
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
  autoSize?: boolean | { minRows: number; maxRows: number };
  maxHeight?: number;
  borderless?: boolean;

  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocusChange?: (focus: boolean) => void;
}

const TextArea: FC<IProps> = ({
  className,
  style = {},
  value,
  disabled = false,
  minLength,
  maxLength,
  placeholder,
  resize = "none",
  wrap = "soft",
  cols = 20,
  rows,
  autoSize,
  borderless,

  minHeight = 100,
  maxHeight = 300,
  onFocus,
  onBlur,
  onFocusChange,
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
      onFocus && onFocus(e);
      onFocusChange && onFocusChange(true);
    },
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement, Element>) => {
      textareaRef.current?.blur();
      setFocus(false);
      onBlur && onBlur(e);
      onFocusChange && onFocusChange(false);
    },
    []
  );

  const fitTextareaHeight = useCallback(() => {
    logger.debug("fit textarea height");
    const el = textareaRef.current!;
    if (!autoSize) {
      el.style.minHeight = calcTextareaHeight(el).minHeight!;
    } else {
      const minRows = isObject(autoSize) ? autoSize.minRows : undefined;
      const maxRows = isObject(autoSize) ? autoSize.maxRows : undefined;
      const result = calcTextareaHeight(el, minRows, maxRows);

      // If the scrollbar is displayed, the height of the textarea needs more space than the calculated height.
      // If set textarea height in this case, the scrollbar will not hide.
      // So we need to hide scrollbar first, and reset it in next tick.
      // see https://github.com/element-plus/element-plus/issues/8825
      el.style.overflowY = "hidden";
      el.style.height = result.height;
      el.style.minHeight = result.minHeight!;
    }

    // el.style.height = "auto";
    // el.style.height = String(el.scrollHeight) + "px";
    // el.setSelectionRange(-1, -1);
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
      className={cls("textarea-container", className, { focus, borderless })}
      maxHeight={maxHeight}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <textarea
        ref={textareaRef}
        className="textarea"
        style={{
          resize,
          maxHeight,
          minHeight,
        }}
        wrap={wrap}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        value={value}
        onChange={handleChange}
        {...rest}
      ></textarea>
    </Scrollbar>
  );
};

export default component<IProps>(TextArea);
