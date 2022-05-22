import store from "store2";
import { SortOrder } from "@app/types";

const phonebookSortOrderKey = "phonebook-sort-order";
export function getPhonebookSortOrder(): SortOrder {
  return store(phonebookSortOrderKey);
}
export function setPhonebookSortOrder(v: SortOrder) {
  return store(phonebookSortOrderKey, v);
}
