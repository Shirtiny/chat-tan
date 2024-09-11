import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import { nanoid } from "nanoid";
import TextArea from "../TextArea";
import Button from "../Button";
import Scrollbar from "../Scrollbar";
import ChatMessage from "./Message";

import GlobalContextStore from "@/store/global";
import db from "@/database";
import logger from "@/utils/logger";
import { HiPaperAirplane } from "react-icons/hi2";

import css from "./index.module.scss";
import useMessageStore from "@/hooks/useMessageStore";

interface IProps extends ICommonProps {
  dbName: string;
}

const Chat: FC<IProps> = ({ className, style = {}, dbName, ...rest }) => {
  const { t } = GlobalContextStore.use();
  const [v, setV] = useState("");
  // const [messages, setMessages] = useState<any[]>([]);
  const [state, update] = useImmer({
    inputFocus: false,
  });

  const { messageStore, messages } = useMessageStore(dbName);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setV(e.target.value);
    },
    []
  );

  const handleFocusChange = useCallback((focus?: boolean) => {
    update((s) => {
      s.inputFocus = !!focus;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const database = db.i(dbName);

    const messageCollections = database.collections.message;
    messageCollections.insert({
      id: nanoid(),
      role: "user",
      content: v,
      timestamp: Date.now(),
    });
    setV("");
  }, [v]);

  useEffect(() => {
    const database = db.i(dbName);

    const messageCollections = database.collections.message;
    messageCollections.insert({
      id: "0",
      role: "user",
      content: "对度度保温杯进行波士顿7s分析，要求全面且详细",
      timestamp: Date.now(),
    });

    // const sub = messageCollections
    //   .find({
    //     sort: [
    //       {
    //         timestamp: "asc",
    //       },
    //     ],
    //   })
    //   .$.subscribe((results: any) => {
    //     logger.debug("results", results);
    //     setMessages(results);
    //   });
    return () => {
      // sub.unsubscribe();
    };
  }, [dbName]);

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
      <div className={cls(css.inputArea, state.inputFocus && css.focus)}>
        <TextArea
          value={v}
          onChange={handleInputChange}
          onFocusChange={handleFocusChange}
          className={css.textarea}
          placeholder={t("CHAT_INPUT_PLACEHOLDER")}
          // resize="vertical"
          wrap="off"
          autoComplete="off"
          minHeight={50}
          maxLength={2000}
          autoSize
          borderless
        />
        <div className={css.bar}>
          <div className="flex-space"></div>
          <Button type="text" onClick={handleSubmit} withIcon>
            <HiPaperAirplane />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default component<IProps>(Chat);
