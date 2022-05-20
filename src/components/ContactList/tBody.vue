<template>
  <div>
    <template
      v-for="(data, index) in props.dtoList"
      :key="keyFrom ? data[keyFrom] : index"
    >
      <slot name="dto" :dto="data" :index="index"></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  dtoList: Array<Record<string, string>>;
  keyFrom?: string;
}>();
</script>
