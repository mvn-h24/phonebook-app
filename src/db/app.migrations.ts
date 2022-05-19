import { DBClient } from "./core/client";
import { DBSchema, StoreNames } from "idb";
import { EntityRegistry } from "./core/entityRegistry";
import { ContactEntSchema } from "./entity/contact";

export function getInstance<
  EntityName extends StoreNames<EntitySchema>,
  EntitySchema extends DBSchema
>(TabName: EntityName | Array<EntityName>) {
  return new DBClient<EntityName, EntitySchema>(dbname).setup(
    Array.isArray(TabName) ? TabName : [TabName],
    1
  );
}

const dbname = "app-db";
const defaultTables = [EntityRegistry.contact];
type AppScheme = ContactEntSchema;

export function InstallMigrations() {
  return getInstance<EntityRegistry, AppScheme>(defaultTables);
}
