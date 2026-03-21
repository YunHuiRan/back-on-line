<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-5">
    <button
      v-for="btn in buttons"
      :key="btn.key"
      :data-type="btn.type"
      :value="computedValue(btn)"
      :class="btn.class"
      @click="handleClick(btn, $event)"
    >
      <template v-if="btn.slider">
        <SliderToggle
          :shifted="getShifted(btn)"
          :direction="btn.shiftDirection || 'left'"
        >
          <template #left v-if="btn.leftHtml">
            <span v-html="btn.leftHtml"> </span>
          </template>
          <template #left v-else>{{ btn.left }}</template>

          <template #right v-if="btn.rightHtml">
            <span v-html="btn.rightHtml"></span>
          </template>

          <template #right v-else>{{ btn.right }}</template>
        </SliderToggle>
      </template>

      <template v-else>
        {{ btn.label ?? btn.display ?? btn.value }}
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";
import SliderToggle from "./SliderToggle.vue";
import { buttons, type ButtonDef } from "./buttonData";

type AngleUnitType = "rad" | "deg";

const angleUnit: Ref<AngleUnitType> = ref("deg");
const isInverseMode: Ref<boolean> = ref(false);
const calculationFormulaStore = useCalculationFormulaStore();

/**
 * Toggle the angle unit between 'rad' and 'deg'.
 * No-op if the requested unit is already active.
 * -------------------
 * @param {AngleUnitType} newAngleUnit - The angle unit to switch to
 */
function toggleAngleUnit(newAngleUnit: AngleUnitType): void {
  if (angleUnit.value === newAngleUnit) return;
  angleUnit.value = newAngleUnit;

  console.log(`angle unit changed to ${newAngleUnit}`);
}

/**
 * Toggle the inverse-function mode (affects sin/cos/tan, log/ln, etc.).
 */
function toggleInverseMode(): void {
  isInverseMode.value = !isInverseMode.value;

  console.log(`inverse mode ${isInverseMode.value ? "enabled" : "disabled"}`);
}

/**
 * Compute the actual value to send to the calculation store depending on
 * whether inverse mode is active.
 * -------------------
 * @param {ButtonDef} btn - Button descriptor
 * @returns {string} value to forward to the store
 */
function computedValue(btn: ButtonDef): string {
  if (btn.altValue && isInverseMode.value) return btn.altValue;
  return btn.value;
}

/**
 * Determine whether a button's slider should be in the shifted state.
 * - For `inverse` shiftWith: depends on `isInverseMode`
 * - For `angle` shiftWith: depends on `angleUnit`
 * -------------------
 * @param {ButtonDef} btn - Button descriptor
 * @returns {boolean} whether slider is shifted
 */
function getShifted(btn: ButtonDef): boolean {
  if (btn.shiftWith === "inverse") return isInverseMode.value;
  if (btn.shiftWith === "angle")
    return (
      angleUnit.value === (btn.shiftParam as AngleUnitType) ||
      angleUnit.value === btn.shiftParam
    );
  return false;
}

/**
 * Handle a button click for advanced buttons. Some buttons trigger local
 * toggles (angle/inverse) while others forward a value/type to the
 * calculation store.
 * -------------------
 * @param {ButtonDef} btn - Button descriptor
 * @param {MouseEvent=} _ - Click event (optional)
 */
function handleClick(btn: ButtonDef, _?: MouseEvent): void {
  if (btn.onClickType === "toggleAngleUnit" && btn.onClickParam) {
    toggleAngleUnit(btn.onClickParam as AngleUnitType);
    return;
  }

  if (btn.onClickType === "toggleInverseMode") {
    toggleInverseMode();
    return;
  }

  const value = computedValue(btn);
  const type = btn.type || "";

  calculationFormulaStore.addToRawString(value, type);
}
</script>

<style scoped>
button {
  font-size: var(--base-font-size);
  border-radius: var(--base-button-radius);
  border: 1px solid var(--base-button-border-color);
  transition: all 0.2s ease-in-out;
}

button:hover {
  filter: brightness(90%);
  transform: translateY(-5px) scaleX(105%);
}

button:active {
  filter: brightness(100%);
  transform: translateY(-3px) scaleX(100%);
}

html[class="dark"] button:hover {
  filter: brightness(200%);
  transform: translateY(-5px) scaleX(105%);
}

html[class="dark"] button:active {
  filter: brightness(100%);
  transform: translateY(-3px) scaleX(100%);
}

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

.selected-angle-unit-button {
  color: var(--main-color);
}

.deg-slider div {
  transform: translateX(-50%);
}
</style>
