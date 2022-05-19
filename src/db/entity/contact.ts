import { DBSchema } from "idb";
import { IDbContact } from "@app/types";
import { EntityRegistry } from "../core/entityRegistry";
import { IDBEntity } from "../core/IDBEntity";
import { getInstance } from "../app.migrations";

export interface ContactEntSchema extends DBSchema {
  [EntityRegistry.contact]: {
    key: number;
    value: IDbContact;
  };
}

export class ContactModel extends IDBEntity<
  EntityRegistry.contact,
  ContactEntSchema
> {
  protected tName: EntityRegistry.contact = EntityRegistry.contact;
}
export function useContactClient() {
  return getInstance<EntityRegistry.contact, ContactEntSchema>(
    EntityRegistry.contact
  ).then((db) => new ContactModel(db));
}
