<template>
  <button class="abstract-btn"><slot /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActionButton",
});
</script>

<style src="./tailwind.css" />
