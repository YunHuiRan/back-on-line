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

function toggleAngleUnit(newAngleUnit: AngleUnitType): void {
  if (angleUnit.value === newAngleUnit) return;
  angleUnit.value = newAngleUnit;

  console.log(`angle unit changed to ${newAngleUnit}`);
}

function toggleInverseMode(): void {
  isInverseMode.value = !isInverseMode.value;

  console.log(`inverse mode ${isInverseMode.value ? "enabled" : "disabled"}`);
}

function computedValue(btn: ButtonDef): string {
  if (btn.altValue && isInverseMode.value) return btn.altValue;
  return btn.value;
}

function getShifted(btn: ButtonDef): boolean {
  if (btn.shiftWith === "inverse") return isInverseMode.value;
  if (btn.shiftWith === "angle")
    return (
      angleUnit.value === (btn.shiftParam as AngleUnitType) ||
      angleUnit.value === btn.shiftParam
    );
  return false;
}

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
}

button:hover {
  filter: brightness(90%);
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
