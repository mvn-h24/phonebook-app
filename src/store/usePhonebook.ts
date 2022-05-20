import { defineStore } from "pinia";
import { useContactClient } from "@app/db";
import { IContact, IDbContact, IPhonebookState, SortOrder } from "@app/types";

const contactAscSort = (a: IContact, b: IContact, sortBy: keyof IContact) =>
  a[sortBy].toString().localeCompare(b[sortBy].toString());
const contactDescSort = (a: IContact, b: IContact, sortBy: keyof IContact) =>
  Number(!a[sortBy].toString().localeCompare(b[sortBy].toString()));
const ContactArraySort = (
  list: Array<IContact>,
  sortOrder: SortOrder,
  sortBy: keyof IContact
) =>
  list.sort((a, b) =>
    sortOrder === "ASC"
      ? contactAscSort(a, b, sortBy)
      : contactDescSort(a, b, sortBy)
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
  state: (): IPhonebookState => {
    return {
      contactList: [],
      sortOrder: "ASC",
      sortField: "name",
    };
  },
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
  },
});
