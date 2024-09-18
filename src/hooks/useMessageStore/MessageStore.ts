import PromptTypes from "@/components/_Prompts/types";
import db from "@/database";
import { DataStatus, Message, MessageTypes, Roles } from "@/types";
import logger from "@/utils/logger";
import { lang } from "@shirtiny/utils";
import { nanoid } from "nanoid";
import { RxDatabase, RxDocument } from "rxdb";

class MessageStore {
  status: DataStatus;
  messages: Message[];
  database: RxDatabase;
  onUpdate: any;

  constructor(dbName: string) {
    this.database = db.i(dbName);
    this.messages = [];
    this.status = DataStatus.initial;
  }

  get collections() {
    return this.database.collections.message;
  }

  prompt = (type: PromptTypes, data: any = {}) => {
    this.tempMessage(Roles.system, MessageTypes.json, {
      ...data,
      componentType: type,
    });
  };

  // 临时消息
  tempMessage = (
    role: Roles,
    messageType: MessageTypes = MessageTypes.text,
    content?: any
  ) => {
    this.messages = [
      this.transformMessage(this.createMessage(role, messageType, content)),
      ...this.messages,
    ];
    this.onUpdate?.();
  };

  saveMessage = (
    role: Roles,
    messageType: MessageTypes = MessageTypes.text,
    content?: any
  ) => {
    this.collections.insert(this.createMessage(role, messageType, content));
  };

  createMessage = (role: Roles, messageType: MessageTypes, content: any) => {
    return {
      id: nanoid(),
      role,
      messageType,
      content: this.serialize(messageType, content),
      timestamp: Date.now(),
    };
  };

  transformMessage = (doc: any): Message => {
    const message: Message = {
      id: doc.id,
      messageType: doc.messageType,
      role: doc.role,
      content: this.deserialize(doc.messageType, doc.content) || {},
      timestamp: doc.timestamp,
    };

    return message;
  };

  serialize = (messageType: MessageTypes, content: any) => {
    switch (messageType) {
      case MessageTypes.text: {
        return content;
      }
      case MessageTypes.json: {
        return JSON.stringify(content);
      }
      default: {
        return "";
      }
    }
  };

  deserialize = (messageType: MessageTypes, content: any) => {
    switch (messageType) {
      case MessageTypes.text: {
        return content;
      }

      case MessageTypes.json: {
        try {
          const data = JSON.parse(content);
          return data;
        } catch (e) {
          logger.error(e);
        }
        return null;
      }

      default: {
        return null;
      }
    }
  };

  subscribe = (callback: any) => {
    this.onUpdate = callback;
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
        this.messages = results.map(this.transformMessage);
        this.status = DataStatus.done;
        this.onUpdate?.();
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
