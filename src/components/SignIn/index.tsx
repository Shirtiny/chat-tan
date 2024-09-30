import { useRef, type FC } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import css from "./index.module.scss";
import Input from "../Input";

interface IProps extends ICommonProps {}

const SignIn: FC<IProps> = ({ className, style = {}, ...rest }) => {
  return (
    <div
      className={cls(css.signIn, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      登录
      <Input />
    </div>
  );
};

export default component<IProps>(SignIn);
