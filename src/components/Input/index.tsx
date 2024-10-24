import {
  forwardRef,
  memo,
  useCallback,
  type ChangeEvent,
  type FC,
  type InputHTMLAttributes,
} from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import css from "./index.module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement>, ICommonProps {
  name?: string;
  status?: "normal" | "error";
  /**
   * @deprecated input的最小高度 建议使用className控制
   */
  height?: number;
  maxLength?: number;

  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      style,
      name,
      status = "normal",
      autoComplete = "off",
      maxLength = 99,
      disabled,
      readOnly,
      height,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
      },
      [onChange],
    );

    const statusCls = css[`status-${status}`];

    return (
      <input
        ref={ref}
        className={cls(
          css.input,
          className,
          statusCls,
          (readOnly || disabled) && css.disabled,
        )}
        style={style}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={handleChange}
        {...rest}
      />
    );
  },
);

export default component<IProps>(memo(Input), { useForwardRef: true });
