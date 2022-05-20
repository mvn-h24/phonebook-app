<template>
  <div class="table">
    <t-head
      class="bg-gray-800 text-gray-500"
      v-if="showHead"
      :fields="{ name: 'Имя', phone_number: 'Телефон' }"
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
        <div v-if="dto.children.length" class="ml-2 mt-1">
          <contact-list
            :list="dto.children"
            :show-head="false"
            v-show="expanded.includes(index)"
          />
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

export default defineComponent({
  name: "contact-list",
  components: { ContactRow, TBody, THead },
  setup() {
    const expanded = ref<Array<number>>([]);
    return { expanded };
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
  },
});
</script>

<style scoped>
@tailwind components;
@layer components {
  .table {
    @apply text-gray-400 border-separate space-y-6 text-sm relative w-full;
  }
}
</style>
