import { FC, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import logger from "@/utils/logger";

import SimpleBar from "simplebar-react";

import "simplebar-react/dist/simplebar.min.css";
import "./index.scss";

interface IProps extends ICommonProps {
  maxHeight?: number;
}

const Scrollbar: FC<IProps> = forwardRef(
  ({ className, style = {}, maxHeight, children, ...rest }, ref) => {
    const scrollRef = useRef(null);

    useImperativeHandle(ref, () => {
      const scrollCurrent = scrollRef.current as any;
      logger.debug("scrollCurrent", scrollCurrent);
      return { el: scrollCurrent?.el };
    });

    return (
      <SimpleBar
        {...rest}
        className={cls("scrollbar", className)}
        style={{
          ...style,
          maxHeight,
        }}
        ref={scrollRef}
      >
        {children}
      </SimpleBar>
    );
  }
);

export default component(Scrollbar, { useForwardRef: true });
