<template>
  <div class="w-6 overflow-hidden inline-block pointer-events-none">
    <div
      class="bg-white h-3 w-3 transform origin-bottom-left transition ease-in-out"
      :class="{
        'rotate-45 origin-bottom-left': up,
        '-rotate-45 origin-top-left': !up,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    up: boolean;
  }>(),
  { up: false }
);
const { up } = toRefs(props);
</script>
