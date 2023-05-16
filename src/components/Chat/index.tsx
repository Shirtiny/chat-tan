import type { FC } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import TextArea from "../TextArea";

import GlobalContextStore from "@/store/global";
import "./index.scss";

interface IProps extends ICommonProps {}

const Chat: FC<IProps> = ({ className, style = {}, ...rest }) => {
  const { t } = GlobalContextStore.use();

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
        placeholder={t("CHAT_INPUT_PLACEHOLDER")}
        resize="vertical"
        wrap="off"
        autoComplete="off"
        maxLength={2000}
      />
    </div>
  );
};

export default component(Chat);
