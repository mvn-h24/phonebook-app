import { IContact, IDbContact } from "./contact";

export enum SortOrder {
  asc = "ASC",
  desc = "DESC",
}
export interface IPhonebookState {
  contactList: Array<IDbContact>;
  sortOrder: SortOrder;
  sortField: keyof IContact | string;
}
