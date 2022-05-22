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
import CreateContact from "@app/components/CreateContact/component.vue";
import ModalDialog from "@app/components/ModalDialog/component.vue";
import ActionButton from "@app/components/ActionButton/component.vue";
import { useContact } from "@app/store";

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
