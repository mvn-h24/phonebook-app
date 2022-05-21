<template>
  <div class="form-layout">
    <label class="form-row">
      <span class="control-label">Имя</span>
      <text-input class="form-control" v-model="contact.name" />
    </label>
    <label class="form-row">
      <span class="control-label">Номер</span>
      <text-input
        class="form-control"
        v-model="contact.phone_number"
        v-maska="'+7 (###) ###-##-##'"
      />
    </label>
    <label class="form-row" v-if="contactList.length">
      <span class="control-label">Руководитель</span>
      <simple-select class="form-control" v-model="contact.parent">
        <template #options>
          <option
            v-for="contact in contactList"
            :key="contact.id"
            :value="contact.id"
          >
            {{ contact.name }}
          </option>
        </template>
      </simple-select>
    </label>
    <action-button @click="contactStore.save(true, true)" class="blue-btn"
      >Сохранить</action-button
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useContact, usePhonebook } from "@app/store";

import ActionButton from "@app/components/ActionButton/component.vue";
import TextInput from "@app/components/Input/text-input.vue";
import SimpleSelect from "@app/components/Input/simple-select.vue";

const contactStore = useContact();
const { contact } = storeToRefs(contactStore);

const phonebookStore = usePhonebook();
const { contactList } = storeToRefs(phonebookStore);
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { maska } from "maska";

export default defineComponent({
  name: "CreateContact",
  directives: {
    maska,
  },
});
</script>
<style src="./tailwind.css" scoped />
