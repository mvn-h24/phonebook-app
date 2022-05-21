<template>
  <div class="form-layout">
    <label class="form-row">
      <span class="control-label">Имя</span>
      <text-input class="form-control" v-model="contact.name" />
    </label>
    <label class="form-row">
      <span class="control-label">Номер</span>
      <text-input class="form-control" v-model="contact.phone_number" />
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
import { useContact, usePhonebook } from "@app/store";
import { storeToRefs } from "pinia";
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

export default defineComponent({
  name: "CreateContact",
});
</script>
<style src="./tailwind.css" scoped />
