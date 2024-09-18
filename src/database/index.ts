import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";

import env from "@/utils/env";
import logger from "@/utils/logger";

export const publicDbName = "garden";

interface IDBMap {
  [publicDbName]: RxDatabase | null;
  [key: string]: RxDatabase | null;
}

const map: IDBMap = {
  [publicDbName]: null,
};

const messageSchema = {
  version: 2,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100, // <- the primary key must have set maxLength
      final: true,
    },
    messageType: {
      type: "string",
      default: "text",
      final: true,
    },
    role: {
      type: "string",
      final: true,
    },
    content: {
      type: "string",
      default: "",
    },
    timestamp: {
      type: "date-time",
      final: true,
    },
  },
  required: ["id", "role", "messageType", "timestamp"],
};

const init = async () => {
  const run = async (name: string) => {
    // create a database
    const db = await createRxDatabase({
      name, // the name of the database
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    const messageCol = await db.addCollections({
      message: {
        schema: messageSchema,
        autoMigrate: true,
        migrationStrategies: {
          // 1 means, this transforms data from version 0 to version 1
          1: function (oldDoc) {
            oldDoc.messageType = "text"; // string to unix
            return oldDoc;
          },
          2: function (oldDoc) {
            return oldDoc;
          },
        },
      },
    });

    const migrationState = messageCol.message.getMigrationState();

    // 'start' the observable
    migrationState.$.subscribe((allStates) => {
      logger.debug(
        "migration state of " +
          allStates.status +
          "," +
          migrationState.collection.name
      );
    });

    return db;
  };

  addRxPlugin(RxDBMigrationSchemaPlugin);

  if (env.isDev()) {
    await import("rxdb/plugins/dev-mode").then(({ RxDBDevModePlugin }) =>
      addRxPlugin(RxDBDevModePlugin as any)
    );
  }
  const dbNames = Object.keys(map);
  const allDb = await Promise.all(dbNames.map((name) => run(name)));
  allDb.forEach((db, i) => {
    const key = dbNames[i];
    map[key] = db;
  });

  return allDb;
};

const instances = (dbName: string) => {
  return map[dbName]!;
};

const db = {
  init,
  i: instances,
};

export default db;
