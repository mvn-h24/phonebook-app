<template>
  <ListShuffleTransition tag="div">
    <div
      v-for="(data, index) in props.dtoList"
      :key="keyFrom ? data[keyFrom] : index"
    >
      <slot name="dto" :dto="data" :index="index"></slot>
    </div>
  </ListShuffleTransition>
</template>

<script lang="ts" setup>
import ListShuffleTransition from "@app/components/Transition/ListShuffleTransition.vue";

const props = defineProps<{
  dtoList: Array<Record<string, any>>;
  keyFrom?: string;
}>();
</script>
