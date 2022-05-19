import { DBSchema } from "idb";
import { EntityRegistry } from "../core/entityRegistry";
import { IDBEntity } from "../core/IDBEntity";
import { IContact } from "../../types/contact";
import { getInstance } from "@app/db";

export interface ContactEntSchema extends DBSchema {
  [EntityRegistry.contact]: {
    key: number;
    value: IContact;
  };
}

export class TodoModel extends IDBEntity<
  EntityRegistry.contact,
  ContactEntSchema
> {
  protected tName: EntityRegistry.contact = EntityRegistry.contact;
}
export function useContactClient() {
  return getInstance<EntityRegistry.contact, ContactEntSchema>(
    EntityRegistry.contact
  ).then((db) => new TodoModel(db));
}
