<template>
  <div class="table">
    <list-row
      class="head-row"
      v-if="showHead"
      :labels="showFields"
      :selectable-row="false"
      @cell-click="headCellClick"
    >
      <template #cell-before><div class="first-column"></div></template>
      <template #row-cell="{ outputKey, outputLabel }">
        <span>{{ outputLabel }}</span>
        <ShowHideTransition>
          <icon-triangle
            class="w-6"
            :up="phoneBook.sortOrder === 'ASC'"
            v-if="phoneBook.sortField === outputKey"
          />
        </ShowHideTransition>
      </template>
    </list-row>
    <ListShuffleTransition tag="div" class="overflow-hidden">
      <template v-for="(contact, index) in list" :key="contact.id">
        <list-row
          v-if="!contact.children?.length"
          :class="[{ 'mt-2': index }]"
          :entity="contact"
          :labels="showFields"
        >
          <template #cell-before><div class="first-column" /></template>
          <template #row-cell="{ outputKey, dto }"
            >{{ dto[outputKey] }}
          </template>
        </list-row>
        <expand-container v-else>
          <template #content>
            <list-row
              :class="[{ 'mt-2': index }]"
              :entity="contact"
              :labels="showFields"
            >
              <template #cell-before
                ><div class="first-column"><icon-cross /></div
              ></template>
              <template #row-cell="{ outputKey, dto }"
                >{{ dto[outputKey] }}
              </template>
            </list-row>
          </template>
          <template #expand-content>
            <contact-list :list="contact.children" :show-head="false" />
          </template>
        </expand-container>
      </template>
    </ListShuffleTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IContact } from "@app/types";
import { usePhonebook } from "@app/store";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";
import ShowHideTransition from "@app/components/Transition/ShowHideTransition.vue";
import ListShuffleTransition from "@app/components/Transition/ListShuffleTransition.vue";
import IconTriangle from "@app/components/Icons/icon-triangle.vue";
import IconCross from "@app/components/Icons/icon-cross.vue";
import ListRow from "@app/components/ListRow/component.vue";
import ExpandContainer from "@app/components/ExpandContainer/component.vue";

export default defineComponent({
  name: "contact-list",
  components: {
    IconCross,
    ExpandContainer,
    IconTriangle,
    ListRow,
    ShowSlideTransition,
    ShowHideTransition,
    ListShuffleTransition,
  },
  setup() {
    const expanded = ref<Array<number>>([]);
    const phoneBook = usePhonebook();
    return { expanded, phoneBook };
  },
  props: {
    showHead: {
      type: Boolean,
      default: () => true,
    },
    list: {
      type: Array as PropType<Array<IContact>>,
      required: true,
    },
    showFields: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({ name: "Имя", phone_number: "Телефон" }),
    },
  },
  methods: {
    toggleByIndex(index: number) {
      if (this.expanded.includes(index)) {
        this.expanded = this.expanded.filter((value) => value !== index);
      } else {
        this.expanded.push(index);
      }
    },
    headCellClick(v: string) {
      if (this.phoneBook.sortField === v) {
        this.phoneBook.toggleSortOrder();
      } else {
        this.phoneBook.setSortField(v as keyof IContact); //@todo: remove as usage
      }
    },
  },
});
</script>

<style scoped>
@tailwind components;
@layer components {
  .table {
    @apply text-gray-400 border-separate space-y-6 text-sm w-full min-w-max;
  }
  .head-row {
    @apply bg-gray-800 text-gray-500 sticky top-0 shadow shadow-md shadow-white z-50;
  }
  .first-column {
    @apply basis-3 justify-center items-center flex ml-3;
  }
}
</style>
