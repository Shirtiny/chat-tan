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
      <TextArea
        className="chat__input"
        resize="vertical"
        wrap="off"
        autocomplete="off"
        maxLength={2000}
        min
      />
    </div>
  );
};

export default component(Chat);
