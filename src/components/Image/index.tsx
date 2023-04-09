import { FC } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import "./index.scss";

interface IProps extends ICommonProps {
  src?: string;
  name?: string;
  alt?: string;
  width?: string;
  height?: string;
}

const Image: FC<IProps> = ({
  src,
  name,
  alt,
  width,
  height,
  className,
  style = {},
  ...rest
}) => {
  return (
    <div
      className={cls("image-container", className)}
      style={{
        width,
        height,
        ...style,
      }}
      {...rest}
    >
      <img src={src} name={name} alt={alt} />
    </div>
  );
};

export default component<IProps>(Image);
