<template>
  <object
    :class="[
      'transform origin-center transition ease-in',
      { 'rotate-180': !up },
    ]"
    type="image/svg+xml"
    :data="triangleUrl"
  />
</template>

<script setup lang="ts">
import triangleUrl from "../../assets/arrow-icon.svg";
import { toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    up?: boolean;
  }>(),
  { up: false }
);
const { up } = toRefs(props);
</script>
