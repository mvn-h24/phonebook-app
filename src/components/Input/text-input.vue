<template>
  <input type="text" v-model="value" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped>
@tailwind components;
@layer components {
  input {
    @apply px-4 py-2.5 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600;
  }
}
</style>
