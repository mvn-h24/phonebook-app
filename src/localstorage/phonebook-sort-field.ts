import store from "store2";
import { IContact } from "@app/types";

const phonebookSortFieldKey = "phonebook-sort-field";
export function getPhonebookSortField(): keyof IContact {
  return store(phonebookSortFieldKey);
}
export function setPhonebookSortField(v: keyof IContact): void {
  return store(phonebookSortFieldKey, v);
}
