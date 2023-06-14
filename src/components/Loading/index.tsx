import type { FC } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import "./index.scss";

interface IProps extends ICommonProps {}

const Loading: FC<IProps> = ({ className, style = {}, ...rest }) => {
  return (
    <div
      className={cls("loading-overlay", className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default component(Loading);
