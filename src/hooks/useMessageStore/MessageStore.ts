import db from "@/database";
import logger from "@/utils/logger";
import { nanoid } from "nanoid";
import { RxDatabase } from "rxdb";

class MessageStore {
  messages: any[];
  database: RxDatabase;

  constructor(dbName: string) {
    this.database = db.i(dbName);
    this.messages = [];
  }

  get collections() {
    return this.database.collections.message;
  }

  addMessage = (content: string) => {
    this.collections.insert({
      id: nanoid(),
      role: "user",
      content,
      timestamp: Date.now(),
    });
  };

  subscribe = (callback: any) => {
    const sub = this.collections
      .find({
        sort: [
          {
            timestamp: "desc",
          },
        ],
      })
      .$.subscribe((results: any) => {
        logger.debug("results", results);
        this.messages = results;
        callback();
      });

    return () => {
      sub.unsubscribe();
    };
  };

  getSnapshot = () => {
    return this.messages;
  };
}

export default MessageStore;
