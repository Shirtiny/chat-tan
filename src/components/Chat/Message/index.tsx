import { FC, memo } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import Avatar from "@/components/Avatar";
import { HiOutlineCommandLine, HiOutlineUserCircle } from "react-icons/hi2";

import css from "./index.module.scss";

interface IProps extends ICommonProps {
  role: "user" | "system";
  content?: string;
}

const ChatMessage: FC<IProps> = memo(({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={cls(css.message, css[`role-${role}`])}>
      <div className={css.side}>
        {isUser ? (
          <Avatar Icon={<HiOutlineUserCircle />} />
        ) : (
          <Avatar Icon={<HiOutlineCommandLine />} />
        )}
        <div className="flex-space"></div>
      </div>
      <div className={css.content}>{content}</div>
    </div>
  );
});

export default component<IProps>(ChatMessage);
