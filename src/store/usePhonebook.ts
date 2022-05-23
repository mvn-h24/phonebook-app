import { defineStore } from "pinia";
import { useContactClient } from "@app/db";
import { IContact, IDbContact, IPhonebookState, SortOrder } from "@app/types";
import {
  getPhonebookSortField,
  getPhonebookSortOrder,
  setPhonebookSortField,
  setPhonebookSortOrder,
} from "@app/localstorage";

const sortStr = (a: IContact, b: IContact, sortBy: keyof IContact) =>
  a[sortBy].toString().localeCompare(b[sortBy].toString());

const ContactArraySort = (
  list: Array<IContact>,
  sortOrder: SortOrder,
  sortBy: keyof IContact
) =>
  list.sort((a, b) =>
    sortOrder === "ASC" ? sortStr(a, b, sortBy) : sortStr(b, a, sortBy)
  );
function compilePhonebook(
  list: Array<IDbContact>,
  sortBy: keyof IContact,
  sortOrder: SortOrder,
  from?: number
): Array<IContact> {
  const rootNodes: Array<IContact> = ContactArraySort(
    list
      .filter((contact) => contact.parent == from)
      .map((contact) => ({
        ...contact,
        id: contact.id ?? 0, //@todo remove this to type mapping
        children: [],
      })),
    sortOrder,
    sortBy
  );
  for (const node in rootNodes) {
    rootNodes[node].children = ContactArraySort(
      compilePhonebook(list, sortBy, sortOrder, rootNodes[node].id),
      sortOrder,
      sortBy
    );
  }
  return rootNodes;
}

export const phonebookStoreToken = "PhonebookStore";
export const usePhonebook = defineStore(phonebookStoreToken, {
  state: (): IPhonebookState => ({
    contactList: [],
    sortOrder: getPhonebookSortOrder() ?? SortOrder.asc,
    sortField: getPhonebookSortField() ?? "name",
  }),
  getters: {
    phoneBook: (store) =>
      compilePhonebook(
        store.contactList,
        store.sortField as keyof IContact,
        store.sortOrder
      ),
  },
  actions: {
    loadData(): Promise<void> {
      return useContactClient()
        .then((model) => model.getAll())
        .then((dbItemsList) => {
          this.contactList = dbItemsList;
        });
    },
    toggleSortOrder() {
      const order =
        this.sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
      this.sortOrder = order;
      setPhonebookSortOrder(order);
    },
    setSortField(field: keyof IContact) {
      this.sortField = field;
      setPhonebookSortField(field);
    },
  },
});
