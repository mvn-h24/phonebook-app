<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "icon-cross",
  props: {
    height: {
      type: [Number, String],
      default: () => 10,
    },
    width: {
      type: [Number, String],
      default: () => 10,
    },
    lineColor: {
      type: String,
      default: () => "white",
    },
  },
  computed: {
    iconHeight() {
      return isNaN(Number(this.height)) ? this.height : `${this.height}px`;
    },
    iconWidth() {
      return isNaN(Number(this.width)) ? this.width : `${this.width}px`;
    },
  },
});
</script>

<style scoped>
div {
  width: v-bind(iconWidth);
  height: v-bind(iconHeight);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
div:after,
div:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  background-color: v-bind(lineColor);
}
div:after {
  transform: rotate(90deg);
}
</style>
