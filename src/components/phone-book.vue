<template>
  <div class="phone-book-overlay">
    <div class="phone-book">
      <div class="control-panel">
        <action-button class="green-btn" @click="contactStore.initNew"
          >Добавить контакт</action-button
        >
      </div>
    </div>
  </div>
  <teleport to="body" v-if="contactStore.getContact">
    <ModalDialogComponent @dialog-close="contactStore.cancelNew">
      <create-contact />
    </ModalDialogComponent>
  </teleport>
</template>

<style scoped>
@tailwind components;
@layer components {
  .phone-book-overlay {
    @apply fixed w-full h-full flex justify-center items-center bg-opacity-40 bg-black;
  }
  .phone-book {
    @apply relative w-11/12 px-4 h-5/6 bg-slate-200 rounded-2xl grid grid-flow-row auto-rows-max py-5;
  }
  .control-panel {
    @apply w-full flex justify-start;
  }
}
</style>
<script lang="ts" setup>
import ActionButton from "@app/components/ActionButton/component.vue";
import ModalDialogComponent from "@app/components/ModalDialog/component.vue";
import CreateContact from "@app/components/CreateContact/component.vue";
import { useContact } from "@app/store";

const contactStore = useContact();
</script>
