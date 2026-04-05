<template>
  <div
    ref="digitalRangeWrapperRef"
    class="digital-range-wrapper"
    v-bind="$attrs"
  >
    <div ref="sliderWrapper" class="slider-wrapper" :style="style">
      <div class="slider"></div>
    </div>

    <div class="digital-range">
      <div v-for="i in segments" :key="i" class="segements"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDraggable } from "@vueuse/core";

const props = defineProps<{
  min: number;
  max: number;
}>();

const segments = computed(() => props.max - props.min + 1);

const digitalRangeWrapperRef = ref<HTMLDivElement | null>(null);
const sliderWrapper = ref<HTMLDivElement | null>(null);

const { style } = useDraggable(sliderWrapper, {
  containerElement: digitalRangeWrapperRef,
});
</script>

<style scoped>
.digital-range-wrapper {
  position: relative;
  width: 100%;
  height: 15px;
}

.slider-wrapper {
  position: absolute;

  z-index: 3;

  &:hover {
    cursor: pointer;
  }
}

.slider {
  width: 25px;
  height: 25px;
  margin: 0 7px;
  background-color: var(--main-color-blue);
  border-top-right-radius: 10px;
  corner-shape: superellipse(0);

  opacity: 0.4;
}

.digital-range {
  position: relative;
  top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border: 4px solid var(--main-color-red);
  border-top-right-radius: 12px;
}

.segements {
  display: flex;
  width: 10px;
  height: 10px;
  background-color: lightblue;
  margin: 0 10px;
}
</style>
