<template>
  <div class="expand-container">
    <div class="heading" @click="toggleExpand">
      <slot name="content" />
    </div>
    <div class="wrapper-layout">
      <show-slide-transition hideImmediate direction="topToBottom">
        <div class="expand-wrapper" v-show="expandStatus">
          <slot name="expand-content" />
        </div>
      </show-slide-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";

const expandStatus = ref(false);
const toggleExpand = () => {
  expandStatus.value = !expandStatus.value;
};
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "expand-container",
});
</script>

<style scoped>
@tailwind components;
@layer components {
  .expand-wrapper {
    @apply mt-2 ml-5;
  }
  .wrapper-layout {
    @apply overflow-hidden;
  }
}
</style>
