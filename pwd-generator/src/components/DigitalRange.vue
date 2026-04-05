<template>
  <div
    ref="wrapperRef"
    class="digital-range-wrapper hover:cursor-pointer"
    @click="snapToClosest($event)"
    v-bind="$attrs"
  >
    <!-- slider -->
    <div
      ref="sliderRef"
      class="slider-wrapper"
      :class="{ snapping: isSnapping }"
      :style="style"
    >
      <CyberButton width="25" height="25" theme="blue"> </CyberButton>
    </div>

    <!-- segements -->
    <div class="digital-range">
      <div v-for="i in segments" :key="i" class="segements">
        <!-- segment label -->
        <transition name="glitch">
          <div
            v-if="
              props.min + i - 1 === model ||
              props.min + i - 1 === props.min ||
              props.min + i - 1 === props.max
            "
            class="segements-label"
          >
            {{ props.min + i - 1 }}
          </div>
        </transition>
      </div>
    </div>
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
const sliderRef = ref<HTMLDivElement | null>(null);

const isSnapping: Ref<boolean> = ref(false);

const { x, y, style } = useDraggable(sliderRef, {
  containerElement: wrapperRef,

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
  if (!wrapperRef.value) return;

  const segements = wrapperRef.value.querySelectorAll(".segements");
  const firstSegment = segements[0];

  // get the left position of each segment relative to the wrapper and store it in segmentsPositions
  segements.forEach((segment) => {
    const { left } = segment.getBoundingClientRect();
    const { left: wrapperLeft } = wrapperRef.value!.getBoundingClientRect();
    segmentsPositions.value.push(
      left - wrapperLeft + segment.clientWidth / 2 - 12.5,
    );
  });

  // position the slider at the initial value
  const { left, top } = firstSegment.getBoundingClientRect();
  const { left: wrapperLeft, top: wrapperTop } =
    wrapperRef.value.getBoundingClientRect();

  x.value = left - wrapperLeft + firstSegment.clientWidth / 2 - 12.5;
  y.value = top - wrapperTop + firstSegment.clientHeight / 2 - 12;
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
    ? event.clientX - wrapperRef.value!.getBoundingClientRect().left
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
  width: 100%;
  height: 15px;
}

.slider-wrapper {
  position: absolute;
  transition: none;
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
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border: 4px solid var(--main-color-red);
  border-top-right-radius: 12px;
}

.segements {
  position: relative;
  display: flex;
  width: 10px;
  height: 10px;
  margin: 0 10px;
  /* background-color: var(--main-color-blue); */
}

.segements-label {
  position: absolute;
  top: -30px;
  left: -7px;
  width: 25px;
  height: 25px;
  text-align: center !important;
  color: var(--main-color-blue);
}
</style>
