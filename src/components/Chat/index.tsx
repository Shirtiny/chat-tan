import { FC, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { DataStatus, MessageTypes, Roles, type ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";

import Scrollbar, { IScrollbarRef } from "../Scrollbar";
import ChatMessage from "./Message";
import InputArea from "./InputArea";
import GlobalContextStore from "@/store/global";
import useMessageStore from "@/hooks/useMessageStore";
import MessageStore from "@/hooks/useMessageStore/MessageStore";
import logger from "@/utils/logger";
import { DomEventStore } from "@shirtiny/utils";
import css from "./index.module.scss";

interface IProps extends ICommonProps {
  dbName: string;
  onInit?: (store: MessageStore) => void;
}

const domEventStore = new DomEventStore();

const Chat: FC<IProps> = ({
  className,
  style = {},
  dbName,
  onInit,
  ...rest
}) => {
  // const { t } = GlobalContextStore.use();

  const scrollbarRef = useRef<IScrollbarRef>(null);
  const { messageStore, messages } = useMessageStore(dbName);

  const handleSubmit = useCallback(
    (v: string) => {
      messageStore.saveMessage(Roles.user, MessageTypes.text, v);
    },
    [messageStore]
  );

  const fitScrollPosition = useCallback(() => {
    if (!scrollbarRef.current?.el) return;
    const el = scrollbarRef.current!.el;
    logger.debug("el", el);
  }, [scrollbarRef.current]);

  useLayoutEffect(() => {
    if (!scrollbarRef.current?.scrollableNode) return;

    domEventStore.observeResize(
      "message-list-resize",
      scrollbarRef.current.scrollableNode,
      (entries) => {
        entries.forEach(({ target }) => {
          logger.debug("messageList observeResize", target);

          if (target.scrollHeight > target.clientHeight) {
            target.scrollTop = target.scrollHeight - target.clientHeight;
          }
        });
      },
      "border-box"
    );
    return () => {
      domEventStore.removeObserver("message-list-resize");
    };
  }, [scrollbarRef.current, fitScrollPosition]);

  useEffect(() => {
    if (messageStore.status === DataStatus.done) {
      onInit?.(messageStore);
    }
  }, [messageStore.status]);

  logger.debug("chat render", messages);

  return (
    <div
      className={cls(css.chat, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <Scrollbar ref={scrollbarRef} className={css.panel} autoHide>
        <div className={css.messageList}>
          {messages.map((item) => {
            return (
              <ChatMessage
                key={item.id}
                className={css.messageListItem}
                role={item.role}
                content={item.content}
              />
            );
          })}
        </div>
      </Scrollbar>
      <InputArea onSubmit={handleSubmit} />
    </div>
  );
};

export default component<IProps>(Chat);
