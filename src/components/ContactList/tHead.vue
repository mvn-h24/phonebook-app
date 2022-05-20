<template>
  <div class="list-head">
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="p-3 w-full"
      @click="clickOnCell(field)"
    >
      {{ field }}
      <template v-if="field === selected">
        <span> order: {{ order }} </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
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
}
</style>
