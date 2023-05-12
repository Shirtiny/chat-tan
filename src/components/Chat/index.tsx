import type { FC } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import TextArea from "../TextArea";

import "./index.scss";

interface IProps extends ICommonProps {}

const Chat: FC<IProps> = ({ className, style = {}, ...rest }) => {
  return (
    <div
      className={cls("chat", className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <TextArea />
    </div>
  );
};

export default component(Chat);
