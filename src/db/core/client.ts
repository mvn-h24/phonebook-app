import { DBSchema, IDBPDatabase, openDB, StoreNames } from "idb";

export class DBClient<
  EntityName extends StoreNames<EntitySchema>,
  EntitySchema extends DBSchema
> {
  constructor(private dbName: string) {}
  private tableFactory(name: EntityName, db: IDBPDatabase<EntitySchema>) {
    db.createObjectStore(name, {
      keyPath: "id",
      autoIncrement: true,
    });
  }
  public async setup(entities: Array<EntityName>, version?: number) {
    return openDB<EntitySchema>(this.dbName, version, {
      upgrade: (db) => {
        entities.forEach((name) => this.tableFactory(name, db));
      },
    });
  }
}
