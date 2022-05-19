import { IContact, IDbContact } from "./contact";

export interface IContactState {
  contact: IDbContact & Omit<IContact, "id">;
}
