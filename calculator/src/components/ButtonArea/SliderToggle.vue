<template>
  <div
    :class="[
      'slider-container',
      shifted
        ? (direction === 'right' ? 'translate-x-[50%]' : '-translate-x-[50%]')
        : 'translate-x-0',
    ]"
  >
    <span class="flex-center w-1/2 h-full">
      <slot name="left">{{ left }}</slot>
    </span>
    <span class="flex-center w-1/2 h-full">
      <slot name="right">{{ right }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

const props = defineProps({
  left: { type: String, default: "" },
  right: { type: String, default: "" },
  shifted: { type: Boolean, default: false },
  direction: { type: String as PropType<'left' | 'right'>, default: 'left' },
});
</script>

<style scoped>
.slider-container {
  width: 200%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  transition: transform 0.3s ease-in-out;
}
</style>
