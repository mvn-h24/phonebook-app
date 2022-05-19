<template>
  <Transition name="hide" :style="{ ...transition }">
    <slot />
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShowHideTransition",
  props: {
    easeSeconds: {
      type: Number,
      default: () => 1,
    },
  },
  computed: {
    transition() {
      return { "--transition-pars": `all ${this.easeSeconds}s ease` };
    },
  },
});
</script>

<!--suppress CssUnusedSymbol -->
<style>
.hide-enter-active,
.hide-leave-active {
  --transition-pars: all 5s ease;
  transition: var(--transition-pars);
}
.hide-enter-from,
.hide-leave-to {
  opacity: 0;
}
.hide-enter-to,
.hide-leave-from {
  opacity: 1;
}
</style>
