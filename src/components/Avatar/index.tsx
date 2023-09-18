import type { FC, ReactNode } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";


import "./index.scss";

interface IProps extends ICommonProps {
  src?: string;
  Icon?: ReactNode;
}

const Avatar: FC<IProps> = ({
  className,
  style = {},
  src,
  role,
  Icon,
  ...rest
}) => {
  return (
    <div
      className={cls("avatar", className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      {Icon || <img className="avatar__img" src={src} />}
    </div>
  );
};

export default component<IProps>(Avatar);
