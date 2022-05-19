import { IContact, IDbContact } from "./contact";

export type StateContact = IDbContact & Omit<IContact, "id">;
export interface IContactState {
  contact?: StateContact;
}
