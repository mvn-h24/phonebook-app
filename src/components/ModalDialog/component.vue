<template>
  <ShowHideTransition @after-leave="callClose">
    <div class="modal-layout" v-show="showLayout">
      <ShowSlideTransition>
        <div class="modal-dialog" v-show="showDialog">
          <button class="modal-dialog--close" @click="showClose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="w-full h-full">
            <slot />
          </div>
        </div>
      </ShowSlideTransition>
    </div>
  </ShowHideTransition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ShowHideTransition from "@app/components/Transition/ShowHideTransition.vue";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";

enum DialogEvent {
  close = "dialog-close",
}
const emit = defineEmits<{
  (e: DialogEvent.close): void;
}>();
const showDialog = ref(false);
const showLayout = ref(false);
onMounted(() => {
  showLayout.value = true;
  showDialog.value = true;
});
const callClose = () => {
  emit(DialogEvent.close);
};
const showClose = () => {
  showLayout.value = false;
  showDialog.value = false;
};
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalDialogComponent",
});
</script>
<style src="./tailwind.css" scoped />
