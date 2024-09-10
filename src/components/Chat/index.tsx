import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";

import TextArea from "../TextArea";
import Button from "../Button";
import Scrollbar from "../Scrollbar";
import ChatMessage from "./Message";

import GlobalContextStore from "@/store/global";
import db from "@/database";
import logger from "@/utils/logger";

import css from "./index.module.scss";
import { HiPaperAirplane } from "react-icons/hi2";

interface IProps extends ICommonProps {
  dbName: string;
}

const Chat: FC<IProps> = ({ className, style = {}, dbName, ...rest }) => {
  const { t } = GlobalContextStore.use();
  const [v, setV] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [state, update] = useImmer({
    inputFocus: false,
  });

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
    setMessages((arr) => [...arr, { role: "user", content: v }]);
  }, [v]);

  useEffect(() => {
    const database = db.i(dbName);
    const messageCollections = database.collections.message;
    const sub = messageCollections.find().$.subscribe((results) => {
      logger.debug("results", results);
    });
    return () => {
      sub.unsubscribe();
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
        <ChatMessage
          role="user"
          content="对度度保温杯进行波士顿7s分析，要求全面且详细"
        />
        <ChatMessage
          role="system"
          content={`Boston 7S 分析是一种用于组织分析的方法，它将一个组织视为一个系统，并将其分解为七个组成部分：结构（Structure）、战略（Strategy）、系统（Systems）、风格（Style）、员工（Staff）、技能（Skills）和文化（Culture）。以下是对于度度保温杯的 Boston 7S 分析：

结构（Structure）：
度度保温杯的组织结构相对简单，遵循传统的垂直整合模式，生产、销售、营销等关键职能都由公司自身承担。在生产方面，它们具有完善的生产线和质量控制流程。在销售方面，它们拥有线上和线下的销售网络。
战略（Strategy）：
度度保温杯的战略定位是成为高品质保温杯的领导者，其产品在设计和功能上具有独特性，瞄准中高端市场。它的主要竞争优势在于创新，不断推出新款产品以满足消费者的需求。
系统（Systems）：
度度保温杯在运营中运用了许多系统，包括生产系统、销售系统、财务系统等。这些系统相互衔接，保证了公司的顺畅运行。此外，它们还采用了先进的生产技术和质量控制系统，以确保产品的一致性和高品质。
风格（Style）：
度度保温杯在设计上秉持简约、时尚的风格，这种风格也贯穿于它们的品牌营销中。无论是在产品包装，还是在广告宣传中，度度都强调自己的时尚属性，以此吸引年轻消费者。
员工（Staff）：
度度保温杯拥有一支高素质的员工队伍，其中大部分员工都是在各自领域具有丰富经验的专家。此外，公司也注重员工的培训和发展，不断提升他们的技能和知识。
技能（Skills）：
度度保温杯的员工都具备出色的技术技能和管理能力。在生产方面，他们的技能体现在能够熟练掌握各种生产技术和设备。在销售和营销方面，他们的技能体现在能够准确把握市场动态，进行有效的品牌推广。
文化（Culture）：
度度保温杯的企业文化强调创新、质量和服务。这种文化反映在员工的行为中，也体现在公司的决策过程中。例如，公司鼓励员工提出新的想法和建议，只要这些想法有利于公司的创新和发展。
综上所述，度度保温杯在 Boston 7S 分析中的各个要素都表现出色，这使得它们能够在竞争激烈的市场中保持领先地位。`}
        />
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
          <Button type="text" withIcon>
            <HiPaperAirplane />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default component<IProps>(Chat);
