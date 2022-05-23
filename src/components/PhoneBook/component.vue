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
import { onMounted } from "vue";
import { usePhonebook } from "@app/store";
import BookList from "./contact-list.vue";
import ControlPanel from "./control-panel.vue";

const phonebookStore = usePhonebook();
onMounted(() => phonebookStore.loadData());
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "phone-book",
});
</script>
