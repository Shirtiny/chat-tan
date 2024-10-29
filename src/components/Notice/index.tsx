import type { FC } from "react";
import type { ICommonProps } from "@/types";
// import {
//     NovuProvider,
//     PopoverNotificationCenter,
//     NotificationBell,
// } from "@novu/notification-center";

import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import "./index.scss";

interface IProps extends ICommonProps {}

const Notice: FC<IProps> = ({ className, style = {}, ...rest }) => {
  return (
    <div
      className={cls("notice", className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      {/* <NovuProvider
        subscriberId={"on-boarding-subscriber-id-123"}
        applicationIdentifier={"N9Tqzm5nITzY"}
      >
        <PopoverNotificationCenter colorScheme={"light"}>
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider> */}
    </div>
  );
};

export default component<IProps>(Notice);
