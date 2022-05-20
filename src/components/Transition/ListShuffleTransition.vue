<template>
  <TransitionGroup name="shuffle">
    <slot />
  </TransitionGroup>
</template>
<style>
.shuffle-move,
.shuffle-enter-active,
.shuffle-leave-active {
  transition: all 0.5s ease;
}

.shuffle-enter-from,
.shuffle-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.shuffle-leave-active {
  position: absolute;
}
</style>
