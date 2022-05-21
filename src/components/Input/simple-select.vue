<template>
  <select v-model="value">
    <slot name="options" />
  </select>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ modelValue: unknown }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: unknown): void;
}>();

const value = computed({
  get(): unknown {
    return props.modelValue;
  },
  set(value: unknown) {
    emit("update:modelValue", value);
  },
});
</script>
<style scoped>
@tailwind components;
@layer components {
  select {
    @apply px-4 py-2.5 rounded-lg block w-full bg-white border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none;
  }
}
</style>
