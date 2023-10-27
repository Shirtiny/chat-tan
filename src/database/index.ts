import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import env from "@/utils/env";

interface IDBMap {
  public: RxDatabase | null;
  [key: string]: RxDatabase | null;
}

const map: IDBMap = {
  public: null,
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
    name: {
      type: "string",
    },
    done: {
      type: "boolean",
    },
    timestamp: {
      type: "date-time",
    },
  },
  required: ["id", "name", "done", "timestamp"],
};

const init = async () => {
  const run = async (name: string) => {
    // create a database
    const db = await createRxDatabase({
      name, // the name of the database
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    await db.addCollections({
      message: {
        schema: messageSchema,
      },
    });

    return db;
  };
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
  i: instances
};

export default db;
