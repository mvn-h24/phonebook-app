import { IContact, IDbContact } from "./contact";

export type SortOrder = "ASC" | "DESC";
export interface IPhonebookState {
  contactList: Array<IDbContact>;
  sortOrder: SortOrder;
  sortField: keyof IContact | string;
}
