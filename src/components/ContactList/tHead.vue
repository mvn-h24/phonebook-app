<template>
  <div class="list-head">
    <slot />
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="cell"
      @click="clickOnCell(index)"
    >
      <span class="select-none">{{ field }}</span>
      <show-hide-transition>
        <template v-if="index === selected">
          <border-triangle class="ml-4" :up="order === 'ASC'" />
        </template>
      </show-hide-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import BorderTriangle from "@app/components/Icons/border-triangle.vue";
import ShowHideTransition from "@app/components/Transition/ShowHideTransition.vue";

enum SortOrder {
  asc = "ASC",
  desc = "DESC",
}
interface tHeadProps {
  fields: Record<string, string>;
  selected?: string;
  order?: SortOrder | string;
}
const props = withDefaults(defineProps<tHeadProps>(), {
  order: "ASC",
});

enum EventName {
  OrderToggle = "order-toggle",
  SortChange = "sort-change",
}
interface tHeadEvents {
  (e: EventName.OrderToggle, order: SortOrder): void;
  (e: EventName.SortChange, order: string): void;
}
const emit = defineEmits<tHeadEvents>();

const ToggleOrder = () =>
  emit(
    EventName.OrderToggle,
    props.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc
  );
const ChangeSort = (selectedField: string) =>
  emit(EventName.SortChange, selectedField);

const clickOnCell = (ClickedField: string) => {
  if (ClickedField === props.selected) {
    ToggleOrder();
  } else {
    ChangeSort(ClickedField);
  }
};
</script>

<style scoped>
@tailwind components;
@layer components {
  .list-head {
    @apply sticky top-0 shadow-md shadow-white flex rounded-md z-40;
  }
  .cell {
    @apply basis-40 grow w-full p-3;
    min-width: 300px;
  }
}
</style>
