<template>
  <div
    ref="digitalRangeWrapperRef"
    class="digital-range-wrapper hover:cursor-pointer"
    @click="snapToClosestSegmentOnClick($event)"
    v-bind="$attrs"
  >
    <!-- slider -->
    <div
      ref="sliderWrapper"
      class="slider-wrapper"
      :class="{ snapping: isSnapping }"
      :style="style"
    >
      <div class="slider"></div>
    </div>

    <!-- segements -->
    <div class="digital-range">
      <div v-for="i in segments" :key="i" class="segements"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, onMounted } from "vue";
import { useDraggable } from "@vueuse/core";

const props = defineProps<{
  min: number;
  max: number;
}>();

const segments = computed(() => props.max - props.min + 1);
const segmentsPositions: Ref<number[]> = ref([]);

const digitalRangeWrapperRef = ref<HTMLDivElement | null>(null);
const sliderWrapper = ref<HTMLDivElement | null>(null);

const isSnapping: Ref<boolean> = ref(false);

const { x, y, style } = useDraggable(sliderWrapper, {
  containerElement: digitalRangeWrapperRef,

  onEnd: () => {
    isSnapping.value = true;

    const closest = segmentsPositions.value.reduce((prev, curr) =>
      Math.abs(curr - x.value) < Math.abs(prev - x.value) ? curr : prev,
    );

    x.value = closest;

    setTimeout(() => {
      isSnapping.value = false;
    }, 200);
  },
});

/**
 * Initializes the slider's position to the first segment when the component is mounted.
 * It calculates the position based on the first segment's location and centers the slider on it.
 */
function initalizeSliderPosition() {
  if (!digitalRangeWrapperRef.value) return;

  const segement =
    digitalRangeWrapperRef.value.querySelectorAll(".segements")[0];
  const { left, top } = segement.getBoundingClientRect();
  const { left: wrapperLeft, top: wrapperTop } =
    digitalRangeWrapperRef.value.getBoundingClientRect();

  x.value = left - wrapperLeft + segement.clientWidth / 2 - 12.5;
  y.value = top - wrapperTop + segement.clientHeight / 2 - 12;
}

/**
 * Calculates the horizontal positions of each segment within the digital range.
 * It retrieves the left position of each segment relative to the wrapper and stores it in the segmentsPositions array.
 * This allows for snapping the slider to the closest segment when dragging ends.
 */
function getSegmentsPositions() {
  if (!digitalRangeWrapperRef.value) return;

  const segements = digitalRangeWrapperRef.value.querySelectorAll(".segements");

  segements.forEach((segment) => {
    const { left } = segment.getBoundingClientRect();
    const { left: wrapperLeft } =
      digitalRangeWrapperRef.value!.getBoundingClientRect();
    segmentsPositions.value.push(
      left - wrapperLeft + segment.clientWidth / 2 - 12.5,
    );
  });
}

/**
 * Handles click events on the digital range wrapper to set the slider's position.
 * It calculates the click position relative to the wrapper and snaps the slider to the closest segment.
 * The snapping effect is achieved by temporarily setting the isSnapping flag, which triggers a CSS transition.
 *
 * @param event - The mouse event triggered by clicking on the digital range wrapper.
 */
function snapToClosestSegmentOnClick(event: MouseEvent) {
  if (!digitalRangeWrapperRef.value) return;

  const { left } = digitalRangeWrapperRef.value.getBoundingClientRect();
  const clickX = event.clientX - left;

  isSnapping.value = true;

  const closest = segmentsPositions.value.reduce((prev, curr) =>
    Math.abs(curr - clickX) < Math.abs(prev - clickX) ? curr : prev,
  );

  x.value = closest;

  setTimeout(() => {
    isSnapping.value = false;
  }, 200);
}

onMounted(() => {
  initalizeSliderPosition();
  getSegmentsPositions();
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
  transition: none;

  &:hover {
    cursor: pointer;
  }
}

.snapping {
  transition: left 0.2s ease;
}

.slider {
  width: 25px;
  height: 25px;
  background-color: var(--main-color-blue);
  border-top-right-radius: 10px;
  corner-shape: superellipse(0);
}

.digital-range {
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
  margin: 0 10px;
  /* background-color: lightblue; */
}
</style>
