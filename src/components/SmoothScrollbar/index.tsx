import { FC, useLayoutEffect, useRef } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import Scrollbar from "smooth-scrollbar";

import "./index.scss";

interface IProps extends ICommonProps {
  continuousScrolling?: boolean;
}

// https://idiotwu.github.io/smooth-scrollbar/
const SmoothScrollbar: FC<IProps> = ({
  className,
  style = {},
  children,
  //   Set to true to allow outer scrollbars continue scrolling when current scrollbar reaches edge.
  continuousScrolling = false,
  ...rest
}) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      Scrollbar.init(containerRef.current, { continuousScrolling });
    }
  }, [containerRef, continuousScrolling]);

  return (
    <div
      className={cls("scrollbar", className)}
      style={{
        ...style,
      }}
      {...rest}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default component(SmoothScrollbar);
