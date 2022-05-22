<template>
  <div class="phone-book-overlay">
    <div class="phone-book">
      <control-panel />
      <div class="list-area">
        <book-list :list="phonebookStore.phoneBook" />
      </div>
    </div>
  </div>
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
import BookList from "@app/components/ContactList/component.vue";
import { usePhonebook } from "@app/store";
import { onMounted } from "vue";
import ControlPanel from "@app/components/control-panel.vue";

const phonebookStore = usePhonebook();
onMounted(() => phonebookStore.loadData());
</script>
