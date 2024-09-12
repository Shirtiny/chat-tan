import { useSyncExternalStore } from "react";
import MessageStore from "./MessageStore";
import { memoize } from "lodash";

const getMessageStore = memoize((dbName) => new MessageStore(dbName));

const useMessageStore = (dbName: string) => {
  const messageStore = getMessageStore(dbName);

  const messages = useSyncExternalStore(
    messageStore.subscribe,
    messageStore.getSnapshot
  );

  return { messageStore, messages };
};

export default useMessageStore;
