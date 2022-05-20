<template>
  <div class="flex flex-col rounded-md">
    <div class="flex p-3">
      <div class="w-full">
        {{ name }}
      </div>
      <div class="w-full">{{ phone_number }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

interface contactRowProps {
  phone_number: string;
  name: string;
}
const props = defineProps<contactRowProps>();
const { name, phone_number } = toRefs(props);
</script>

<style scoped></style>
