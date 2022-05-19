import { defineStore } from "pinia";
import { useContactClient } from "@app/db";
import { IPhonebookState } from "@app/types";

export const phonebookStoreToken = "PhonebookStore";
export const usePhonebook = defineStore(phonebookStoreToken, {
  state: (): IPhonebookState => {
    return {
      contactList: [],
    };
  },
  getters: {
    //@TODO: add db-contact-items to contact-items transform
    getContactList: (store) => store.contactList,
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
