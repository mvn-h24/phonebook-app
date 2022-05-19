<template>
  <div class="toast-layout top-5 right-5">
    <TransitionGroup name="error-transition">
      <div
        v-for="(error, id) in errorsList"
        :key="error.id"
        class="toast-message toast-error"
        :class="{ 'mt-2': id, 'mb-2': !id }"
      >
        {{ error.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useError } from "@app/store";
import { storeToRefs } from "pinia";

const errorsStore = useError();
const { errorsList } = storeToRefs(errorsStore);
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotification",
});
</script>
<style src="./tailwind.css" scoped />
