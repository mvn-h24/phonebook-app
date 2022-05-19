<template>
  <Transition
    :name="direction"
    :style="{ ...transition, ...translate }"
    :class="{ 'hide-immediate': hideImmediate }"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TransitionDirection } from "./types";

export default defineComponent({
  name: "ShowSlideTransition",
  props: {
    direction: {
      type: String as PropType<TransitionDirection | string>,
      default: () => TransitionDirection.rightToLeft,
    },
    easeSeconds: {
      type: Number,
      default: () => 1,
    },
    pathLength: {
      type: Number,
      default: () => 30,
    },
    hideImmediate: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    transition() {
      return { "--transition-pars": `all ${this.easeSeconds}s ease` };
    },
    pathLengthDirectional() {
      return this.direction === TransitionDirection.leftToRight ||
        this.direction === TransitionDirection.topToBottom
        ? this.pathLength * -1
        : this.pathLength;
    },
    translate() {
      return {
        "--path-length": `${this.pathLengthDirectional}px`,
      };
    },
  },
});
</script>

<!--suppress CssUnusedSymbol -->
<style>
.topToBottom-leave-active.hide-immediate,
.leftToRight-leave-active.hide-immediate,
.bottomToTop-leave-active.hide-immediate,
.rightToLeft-leave-active.hide-immediate {
  transition: all 0.1s ease;
  display: none;
}
.topToBottom-enter-active,
.topToBottom-leave-active,
.leftToRight-enter-active,
.leftToRight-leave-active,
.bottomToTop-enter-active,
.bottomToTop-leave-active,
.rightToLeft-enter-active,
.rightToLeft-leave-active {
  --transition-pars: all 5s ease;
  --path-length: 100px;
  transition: var(--transition-pars);
}

.topToBottom-enter-from,
.topToBottom-leave-to {
  opacity: 0;
  transform: translateY(var(--path-length));
}

.leftToRight-enter-from,
.leftToRight-leave-to {
  opacity: 0;
  transform: translateX(var(--path-length));
}

.bottomToTop-enter-from,
.bottomToTop-leave-to {
  opacity: 0;
  transform: translateY(var(--path-length));
}

.rightToLeft-enter-from,
.rightToLeft-leave-to {
  opacity: 0;
  transform: translateX(var(--path-length));
}
</style>
