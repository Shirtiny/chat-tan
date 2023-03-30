import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const ChatLayout: FC<Props> = ({  }) => {
  return <div>chat layout {children}</div>;
};

export default ChatLayout;
