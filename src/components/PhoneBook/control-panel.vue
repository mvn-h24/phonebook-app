<template>
  <div class="control-panel">
    <action-button class="green-btn" @click="contactStore.initNew"
      >Добавить контакт</action-button
    >
  </div>
  <teleport to="body" v-if="contactStore.getContact">
    <modal-dialog @dialog-close="contactStore.cancelNew">
      <create-contact />
    </modal-dialog>
  </teleport>
</template>

<script lang="ts" setup>
import { useContact } from "@app/store";
import ModalDialog from "@app/components/ModalDialog/component.vue";
import ActionButton from "@app/components/ActionButton/component.vue";
import CreateContact from "./create-contact.vue";

const contactStore = useContact();
</script>

<style scoped>
@tailwind components;
@layer components {
  .control-panel {
    @apply w-full flex justify-start;
  }
}
</style>
