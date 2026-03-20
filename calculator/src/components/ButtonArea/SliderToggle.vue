<template>
  <div
    :class="[
      'slider-container',
      shifted ? '-translate-x-[50%]' : 'translate-x-0',
    ]"
  >
    <span class="flex-center w-1/2 h-full"
      ><slot name="left">{{ left }}</slot></span
    >
    <span class="flex-center w-1/2 h-full"
      ><slot name="right">{{ right }}</slot></span
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  left: { type: String, default: "" },
  right: { type: String, default: "" },
  shifted: { type: Boolean, default: false },
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
  transition: translate 0.3s ease-in-out;
}
</style>
