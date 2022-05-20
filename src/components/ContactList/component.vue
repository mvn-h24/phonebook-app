<template>
  <div class="table">
    <t-head
      class="bg-gray-800 text-gray-500"
      v-if="showHead"
      :fields="{ name: 'Имя', phone_number: 'Телефон' }"
      :selected="phoneBook.sortField"
      :order="phoneBook.sortOrder"
      @order-toggle="toggleOrder"
      @sort-change="changeSort"
    />
    <t-body :dtoList="list">
      <template #dto="{ dto, index }">
        <contact-row
          class="bg-gray-800 text-gray-300"
          :class="{ 'mt-2': index }"
          :name="dto.name"
          :phone_number="dto.phone_number"
          @click="toggleByIndex(index)"
        >
        </contact-row>
        <div v-if="dto.children.length" class="ml-5 mt-1">
          <Transition name="slide-fade">
            <contact-list
              :list="dto.children"
              :show-head="false"
              v-show="expanded.includes(index)"
            />
          </Transition>
        </div>
      </template>
    </t-body>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import THead from "@app/components/ContactList/tHead.vue";
import TBody from "@app/components/ContactList/tBody.vue";
import { IContact } from "@app/types";
import ContactRow from "@app/components/ContactList/contact-row.vue";
import { usePhonebook } from "@app/store";

export default defineComponent({
  name: "contact-list",
  components: { ContactRow, TBody, THead },
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
    toggleOrder(sortOrder: "ASC" | "DESC") {
      this.phoneBook.$patch({ sortOrder });
    },
    changeSort(sortField: keyof IContact) {
      this.phoneBook.$patch({ sortField });
    },
  },
});
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
@tailwind components;
@layer components {
  .table {
    @apply text-gray-400 border-separate space-y-6 text-sm relative w-full;
  }
}
.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
