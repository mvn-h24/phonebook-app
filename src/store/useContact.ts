import { defineStore } from "pinia";
import { useContactClient } from "@app/db";
import { IContactState } from "@app/types";

export const contactStoreToken = "ContactStore";
export const useContact = defineStore(contactStoreToken, {
  state: (): IContactState => {
    return {
      contact: {
        name: "",
        phone_number: "",
        children: [],
      },
    };
  },
  getters: {
    getContact: (store) => store.contact,
  },
  actions: {
    add() {
      // eslint-disable-next-line
      const { children, ...contact } = this.contact;
      return useContactClient().then((model) => model.addOne(contact));
    },
  },
});
