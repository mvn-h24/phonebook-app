import { defineStore } from "pinia";
import { useContactClient } from "@app/db";
import { IContactState, StateContact } from "@app/types";
import { useError } from "./useError";
import { usePhonebook } from "./usePhonebook";

function testPhoneMask(v: string): boolean {
  return /\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/.test(v);
}
export const contactStoreToken = "ContactStore";
export const useContact = defineStore(contactStoreToken, {
  state: (): IContactState => {
    return {
      contact: undefined,
    };
  },
  getters: {
    getContact: (store) => store.contact,
  },
  actions: {
    initNew() {
      this.contact = {
        name: "",
        phone_number: "",
        children: [],
      };
    },
    cancelNew() {
      this.$state.contact = undefined;
    },
    save(cancelAfter = false, refreshBook = false) {
      if (this.validate(this.contact)) {
        // eslint-disable-next-line
        const { children, ...contact } = this.contact;
        const phonebookStore = usePhonebook();
        return useContactClient()
          .then((model) => model.addOne(contact))
          .then(() => {
            if (refreshBook) {
              phonebookStore.loadData();
            }
            if (cancelAfter) {
              this.cancelNew();
            }
          });
      }
    },
    validate(obj?: StateContact): obj is StateContact {
      const errorsStore = useError();
      const timeout = 2000;
      let message = undefined;

      if (this.contact === undefined) {
        message = "Контакт не создан";
      } else {
        if (!this.contact.name.length) {
          message = "Необходимо заполнить имя";
        } else if (!this.contact.phone_number.length) {
          message = "Необходимо заполнить номер телефона";
        } else if (!testPhoneMask(this.contact.phone_number)) {
          message =
            "Необходимо заполнить номер телефона в следующем формате: +7 (###) ###-##-##";
        }
      }
      if (message) {
        errorsStore.addError(message, timeout);
        return false;
      }
      return true;
    },
  },
});
