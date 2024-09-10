import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";

import env from "@/utils/env";

export const publicDbName = "garden";

interface IDBMap {
  [publicDbName]: RxDatabase | null;
  [key: string]: RxDatabase | null;
}

const map: IDBMap = {
  [publicDbName]: null,
};

const messageSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100, // <- the primary key must have set maxLength
    },
    role: {
      type: "string",
    },
    content: {
      type: "string",
    },
    timestamp: {
      type: "date-time",
    },
  },
  required: ["id", "role", "content", "timestamp"],
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
      },
    });

    const migrationState = messageCol.message.getMigrationState();

    // 'start' the observable
    migrationState.$.subscribe((allStates) => {
      console.log(
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
