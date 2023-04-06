import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

const Component = () => {
  return (
    <div>
      <div>personal page test</div>
      <NovuProvider
        subscriberId={"on-boarding-subscriber-id-123"}
        applicationIdentifier={"N9Tqzm5nITzY"}
      >
        <PopoverNotificationCenter colorScheme={"light"}>
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    </div>
  );
};

export { Component };
