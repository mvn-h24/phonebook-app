<template>
  <div class="row">
    <slot />
    <div class="row-cell">
      {{ name }}
    </div>
    <div class="row-cell">{{ phone_number }}</div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface contactRowProps {
  phone_number: string;
  name: string;
}
const props = defineProps<contactRowProps>();
const { name, phone_number } = toRefs(props);
</script>

<style scoped>
@tailwind components;
@layer components {
  .row {
    @apply flex p-3  rounded-md;
  }
  .row-cell {
    @apply basis-1 grow select-all;
    min-width: 300px;
  }
}
</style>
