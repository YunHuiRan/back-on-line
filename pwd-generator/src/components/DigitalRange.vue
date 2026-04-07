<template>
  <div
    ref="wrapperRef"
    class="digital-range-wrapper"
    @click="snapToClosest($event)"
  >
    <!-- length - 1 -->
    <button class="w-[10%] h-full bg-red-300"><</button>

    <!-- slider -->
    <div ref="sliderWrapperRef" class="slider-wrapper bg-red-300">
      <div
        ref="sliderRef"
        class="slider"
        :class="{ snapping: isSnapping }"
        :style="style"
      >
        <CyberButton
          :text="props.modelValue.toString()"
          width="80px"
          height="40px"
        >
        </CyberButton>
      </div>

      <!-- segements -->
      <div class="digital-range">
        <div v-for="i in segments" :key="i" class="segements"></div>
      </div>
    </div>

    <!-- lenght + 1 -->
    <button class="w-[10%] h-full bg-red-300">></button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, onMounted } from "vue";
import { useDraggable } from "@vueuse/core";
import CyberButton from "./CyberButton.vue";

const props = defineProps<{
  min: number;
  max: number;
  modelValue: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const segments = computed(() => props.max - props.min + 1);
const segmentsPositions: Ref<number[]> = ref([]);

const wrapperRef = ref<HTMLDivElement | null>(null);
const sliderWrapperRef = ref<HTMLDivElement | null>(null);
const sliderRef = ref<HTMLDivElement | null>(null);

const isSnapping: Ref<boolean> = ref(false);

const { x, y, style } = useDraggable(sliderRef, {
  containerElement: sliderWrapperRef,
  preventDefault: true,
  axis: "x",

  onEnd: () => {
    snapToClosest();
  },
});

/**
 * Initializes the positions of the segments and sets the initial position of the slider.
 * It calculates the left position of each segment relative to the wrapper and stores it in the segmentsPositions array.
 * The slider is then positioned at the initial value based on the first segment's position.
 */
function initSegments() {
  if (!wrapperRef.value || !sliderWrapperRef.value) return;

  const segements = wrapperRef.value.querySelectorAll(".segements");
  const firstSegment = segements[0];

  // get the left position of each segment relative to the wrapper and store it in segmentsPositions
  segements.forEach((segment) => {
    const { left } = segment.getBoundingClientRect();
    const { left: wrapperLeft } =
      sliderWrapperRef.value!.getBoundingClientRect();
    segmentsPositions.value.push(
      left - wrapperLeft + segment.clientWidth / 2 - 40,
      // the magic number here is half of the button's width
    );
  });

  // position the slider at the initial value
  const { left, top } = firstSegment.getBoundingClientRect();
  const { left: wrapperLeft, top: wrapperTop } =
    sliderWrapperRef.value.getBoundingClientRect();

  x.value = left - wrapperLeft + firstSegment.clientWidth / 2 - 40;
  // the magic number here is half of the button's width
  y.value = top - wrapperTop + firstSegment.clientHeight / 2 - 20;
  // the magic number here is half of the button's height

  updateModelValue();
}

/**
 * Snaps the slider to the closest segment position when dragging ends or when the wrapper is clicked.
 * It calculates the current horizontal position of the slider and finds the closest segment position from the segmentsPositions array.
 * The slider's position is then updated to snap to that closest segment, and the model value is updated accordingly.
 * A temporary snapping state is set to trigger a CSS transition for smooth snapping effect.
 *
 * @param event - The mouse event triggered on click, used to calculate the current position of the slider.
 */
function snapToClosest(event?: MouseEvent) {
  if (!segmentsPositions.value.length) return;

  const currentX = event
    ? event.clientX - sliderWrapperRef.value!.getBoundingClientRect().left
    : x.value;

  const closest = segmentsPositions.value.reduce((prev, curr) =>
    Math.abs(curr - currentX) < Math.abs(prev - currentX) ? curr : prev,
  );

  isSnapping.value = true;
  x.value = closest;

  updateModelValue();

  setTimeout(() => (isSnapping.value = false), 200);
}

/**
 * Updates the model value based on the current position of the slider.
 * It finds the index of the closest segment position and calculates the corresponding value based on the minimum value and the index.
 * The model value is then updated to reflect the new selection.
 */
function updateModelValue() {
  const closestIndex = segmentsPositions.value.findIndex(
    (p) => Math.abs(p - x.value) < 1,
  );

  model.value = props.min + closestIndex;
}

onMounted(() => {
  initSegments();
});
</script>

<style scoped>
.digital-range-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider {
  position: absolute;
  transition: none;
  overflow: hidden;
  z-index: 3;

  &:hover {
    cursor: pointer;
  }
}

.snapping {
  transition: left 0.2s ease;
}

.digital-range {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3px;
  width: 100%;
  background-color: var(--main-color-red);
}

.segements {
  position: relative;
  display: flex;
  width: 10px;
  height: 10px;
  /* background-color: var(--main-color-blue); */
}
</style>
