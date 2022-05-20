import { defineStore } from "pinia";
import { useContactClient } from "@app/db";
import { IContact, IDbContact, IPhonebookState } from "@app/types";

function compilePhonebook(
  list: Array<IDbContact>,
  from?: number
): Array<IContact> {
  const rootNodes: Array<IContact> = list
    .filter((contact) => contact.parent == from)
    .map((contact) => ({
      ...contact,
      id: contact.id ?? 0, //@todo remove this to type mapping
      children: [],
    }));
  for (const node in rootNodes) {
    rootNodes[node].children = compilePhonebook(list, rootNodes[node].id);
  }
  return rootNodes;
}

export const phonebookStoreToken = "PhonebookStore";
export const usePhonebook = defineStore(phonebookStoreToken, {
  state: (): IPhonebookState => {
    return {
      contactList: [],
    };
  },
  getters: {
    phoneBook: (store) => compilePhonebook(store.contactList),
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
