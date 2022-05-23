<template>
  <div class="row">
    <slot name="cell-before" />
    <div
      class="row-cell"
      :class="selectableRow ? `row-select` : `row-unselectable`"
      v-for="(outputLabel, outputKey) in labels"
      :key="outputKey"
      @click="cellClick(outputKey)"
    >
      <slot
        name="row-cell"
        :outputKey="outputKey"
        :outputLabel="outputLabel"
        :dto="entity"
      >
        {{ outputLabel }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface contactRowProps {
  entity?: Record<any, any>;
  labels: Record<string, unknown>;
  selectableRow?: boolean;
}
const props = withDefaults(defineProps<contactRowProps>(), {
  selectableRow: true,
});
const { entity, labels, selectableRow } = toRefs(props);

enum Events {
  cellClick = "cell-click",
}
interface ListRowEmits {
  (e: Events.cellClick, data: string): void;
}
const emit = defineEmits<ListRowEmits>();
const cellClick = (v: string) => emit(Events.cellClick, v);
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "list-row",
});
</script>
<style scoped>
@tailwind components;
@layer components {
  .row {
    @apply flex  rounded-md bg-gray-800 text-gray-300 gap-3;
  }
  .row-cell {
    /*@todo: remove max height */
    @apply basis-1 grow select-all py-3 inline-flex gap-3 max-h-12;
    min-width: 300px;
    text-align: start;
  }
  .row-select {
    @apply select-all;
  }
  .row-unselectable {
    @apply select-none;
  }
}
</style>
