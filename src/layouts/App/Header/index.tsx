import type { FC } from "react";
import type { ICommonProps } from "@/types";

import Image from "@/components/Image";

import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";

import "./index.scss";

interface IProps extends ICommonProps {}

const AppHeader: FC<IProps> = ({ className, style = {}, ...rest }) => {
  return (
    <div
      className={cls("app-header", className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <a href="/" target="_blank">
        <Image className="brand" height="100%" src="/logo.svg" name="logo.svg" alt="logo" />
      </a>
      <div className="flex-space"></div>
    </div>
  );
};

export default component<IProps>(AppHeader);
