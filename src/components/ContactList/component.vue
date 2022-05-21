<template>
  <div class="table">
    <t-head
      class="thead table-row"
      v-if="showHead"
      :fields="{ name: 'Имя', phone_number: 'Телефон' }"
      :selected="phoneBook.sortField"
      :order="phoneBook.sortOrder"
      @order-toggle="toggleOrder"
      @sort-change="changeSort"
    >
      <div class="first-column"></div>
    </t-head>
    <t-body :dtoList="list" key-from="id">
      <template #dto="{ dto, index }">
        <contact-row
          class="row table-row"
          :class="{ 'mt-2': index }"
          :name="dto.name"
          :phone_number="dto.phone_number"
          @click="toggleByIndex(dto.id)"
        >
          <div class="first-column">
            <icon-cross v-if="dto.children.length" />
          </div>
        </contact-row>
        <div v-if="dto.children.length" class="hidden-sublist">
          <ShowSlideTransition direction="topToBottom">
            <contact-list
              :list="dto.children"
              :show-head="false"
              v-show="expanded.includes(dto.id)"
            />
          </ShowSlideTransition>
        </div>
      </template>
    </t-body>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IContact, SortOrder } from "@app/types";
import { usePhonebook } from "@app/store";
import THead from "@app/components/ContactList/tHead.vue";
import TBody from "@app/components/ContactList/tBody.vue";
import ContactRow from "@app/components/ContactList/contact-row.vue";
import IconCross from "@app/components/Icons/icon-cross.vue";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";

export default defineComponent({
  name: "contact-list",
  components: { ContactRow, TBody, THead, IconCross, ShowSlideTransition },
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
  },
  methods: {
    toggleByIndex(index: number) {
      if (this.expanded.includes(index)) {
        this.expanded = this.expanded.filter((value) => value !== index);
      } else {
        this.expanded.push(index);
      }
    },
    toggleOrder(sortOrder: SortOrder) {
      this.phoneBook.$patch({
        sortOrder,
      });
    },
    changeSort(sortField: string) {
      this.phoneBook.$patch({ sortField });
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
  .first-column {
    @apply basis-3 justify-center items-center flex;
  }
  .thead {
    @apply bg-gray-800 text-gray-500 p-3;
  }
  .row {
    @apply bg-gray-800 text-gray-300;
  }
  .hidden-sublist {
    @apply mt-1 ml-5 overflow-hidden;
  }
  .table-row {
    @apply gap-6;
    text-align: start;
  }
}
</style>
