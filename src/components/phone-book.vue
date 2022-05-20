<template>
  <div class="phone-book-overlay">
    <div class="phone-book">
      <div class="control-panel">
        <action-button class="green-btn" @click="contactStore.initNew"
          >Добавить контакт</action-button
        >
      </div>
      <div class="list-area">
        <book-list :list="phonebookStore.phoneBook" />
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
    @apply relative w-11/12 px-4 h-5/6 bg-slate-200 rounded-2xl flex flex-col py-5  box-border  gap-2;
  }
  .control-panel {
    @apply w-full flex justify-start;
  }
  .list-area {
    @apply h-full overflow-y-auto;
  }
  .list-area::-webkit-scrollbar {
    display: none;
  }
  .list-area {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
<script lang="ts" setup>
import ActionButton from "@app/components/ActionButton/component.vue";
import ModalDialogComponent from "@app/components/ModalDialog/component.vue";
import CreateContact from "@app/components/CreateContact/component.vue";
import BookList from "@app/components/ContactList/component.vue";
import { useContact, usePhonebook } from "@app/store";
import { onMounted } from "vue";

const contactStore = useContact();
const phonebookStore = usePhonebook();
onMounted(() => phonebookStore.loadData());
</script>
