import { FC, useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";

import Scrollbar from "../Scrollbar";
import ChatMessage from "./Message";
import InputArea from "./InputArea";

import GlobalContextStore from "@/store/global";

import css from "./index.module.scss";
import useMessageStore from "@/hooks/useMessageStore";
import logger from "@/utils/logger";

interface IProps extends ICommonProps {
  dbName: string;
}

const Chat: FC<IProps> = ({ className, style = {}, dbName, ...rest }) => {
  // const { t } = GlobalContextStore.use();

  const { messageStore, messages } = useMessageStore(dbName);

  const handleSubmit = useCallback(
    (v: string) => {
      messageStore.addMessage(v);
    },
    [messageStore]
  );

  logger.debug("chat render", messages);

  return (
    <div
      className={cls(css.chat, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <Scrollbar className={css.panel} autoHide>
        {messages.map((item) => {
          return <ChatMessage role={item.role} content={item.content} />;
        })}
      </Scrollbar>
      <InputArea onSubmit={handleSubmit} />
    </div>
  );
};

export default component<IProps>(Chat);
