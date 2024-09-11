import db from "@/database";
import logger from "@/utils/logger";
import { useSyncExternalStore } from "react";

interface MessageStore {
  messages: any[];
  addMessage: () => void;
  subscribe: (callback: any) => () => void;
  getSnapshot: () => any[];
}

const memo: Record<string, MessageStore> = {};

const getMessageStore = (dbName: string) => {
  if (memo[dbName]) return memo[dbName];

  const store = {
    messages: [],
    addMessage() {},
    subscribe(callback: any) {
      const database = db.i(dbName);
      if (!database) return () => {};

      const messageCollections = database.collections.message;

      const sub = messageCollections
        .find({
          sort: [
            {
              timestamp: "asc",
            },
          ],
        })
        .$.subscribe((results: any) => {
          logger.debug("results", results);
          store.messages = results;
          callback();
        });

      return () => {
        sub.unsubscribe();
      };
    },
    getSnapshot() {
      return store.messages;
    },
  };

  memo[dbName] = store;

  return store;
};

const useMessageStore = (dbName: string) => {
  const messageStore = getMessageStore(dbName);

  const messages = useSyncExternalStore(
    messageStore.subscribe,
    messageStore.getSnapshot
  );

  return { messageStore, messages };
};

export default useMessageStore;
