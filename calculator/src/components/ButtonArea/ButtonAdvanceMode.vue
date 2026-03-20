<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-5">
    <button
      data-type="function"
      :value="isInverseMode ? 'arcsin' : 'sin'"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      <!-- sin slider -->
      <div
        class="slider-container"
        :class="isInverseMode ? ' -translate-x-[50%]' : 'translate-x-0'"
      >
        <span class="flex-center w-1/2 h-full">sin</span>
        <span class="flex-center w-1/2 h-full">
          <span> sin<sup>-1</sup> </span>
        </span>
      </div>
    </button>

    <button
      data-type="function"
      :value="isInverseMode ? 'arccos' : 'cos'"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      <!-- cos slider -->
      <div
        class="slider-container"
        :class="isInverseMode ? ' -translate-x-[50%]' : 'translate-x-0'"
      >
        <span class="flex-center w-1/2 h-full">cos</span>
        <span class="flex-center w-1/2 h-full">
          <span> cos<sup>-1</sup> </span>
        </span>
      </div>
    </button>

    <button
      data-type="function"
      :value="isInverseMode ? 'arctan' : 'tan'"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      <!-- tan slider -->
      <div
        class="slider-container"
        :class="isInverseMode ? ' -translate-x-[50%]' : 'translate-x-0'"
      >
        <span class="flex-center w-1/2 h-full">tan</span>
        <span class="flex-center w-1/2 h-full">
          <span> tan<sup>-1</sup> </span>
        </span>
      </div>
    </button>

    <button
      data-type="mode"
      value="rad"
      class="advance-operation-button"
      @click="toggleAngleUnit('rad')"
    >
      <!-- rad slider -->
      <div
        class="slider-container"
        :class="angleUnit === 'rad' ? '-translate-x-[50%]' : ''"
      >
        <span class="flex-center w-1/2 h-full">rad</span>
        <span class="flex-center w-1/2 h-full selected-angle-unit-button">
          rad
        </span>
      </div>
    </button>

    <button
      data-type="mode"
      value="deg"
      class="advance-operation-button"
      @click="toggleAngleUnit('deg')"
    >
      <!-- deg slider -->
      <div
        class="slider-container"
        :class="angleUnit === 'deg' ? ' translate-x-0' : '-translate-x-[50%]'"
      >
        <span class="flex-center w-1/2 h-full selected-angle-unit-button">
          deg
        </span>
        <span class="flex-center w-1/2 h-full">deg</span>
      </div>
    </button>

    <button
      data-type="function"
      :value="isInverseMode ? '10^x' : 'log'"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      <!-- log slider -->
      <div
        class="slider-container"
        :class="isInverseMode ? ' -translate-x-[50%]' : 'translate-x-0'"
      >
        <span class="flex-center w-1/2 h-full">log</span>
        <span class="flex-center w-1/2 h-full">
          <span> 10<sup>^</sup> </span>
        </span>
      </div>
    </button>

    <button
      data-type="function"
      :value="isInverseMode ? 'e^x' : 'ln'"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      <!-- ln slider -->
      <div
        class="slider-container"
        :class="isInverseMode ? ' -translate-x-[50%]' : 'translate-x-0'"
      >
        <span class="flex-center w-1/2 h-full">ln</span>
        <span class="flex-center w-1/2 h-full">
          <span> e<sup>×</sup> </span>
        </span>
      </div>
    </button>

    <button
      data-type="group"
      value="("
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      (
    </button>

    <button
      data-type="group"
      value=")"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      )
    </button>

    <button
      data-type="modifier"
      value="inv"
      class="advance-operation-button"
      @click="toggleInverseMode"
    >
      <!-- inv slider -->
      <div
        class="slider-container"
        :class="isInverseMode ? ' -translate-x-[50%]' : 'translate-x-0'"
      >
        <span class="flex-center w-1/2 h-full">inv</span>
        <span class="flex-center w-1/2 h-full selected-angle-unit-button">
          inv
        </span>
      </div>
    </button>

    <button
      data-type="function"
      value="!"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      !
    </button>
    <button
      data-type="action"
      value="ac"
      class="ac-button"
      @click="handleButtonClick"
    >
      ac
    </button>
    <button
      data-type="action"
      value="del"
      class="del-button"
      @click="handleButtonClick"
    >
      del
    </button>
    <button
      data-type="operator"
      value="%"
      class="basic-operation-button"
      @click="handleButtonClick"
    >
      %
    </button>
    <button
      data-type="operator"
      value="÷"
      class="basic-operation-button"
      @click="handleButtonClick"
    >
      ÷
    </button>
    <button
      data-type="operator"
      value="^"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      ^
    </button>
    <button
      data-type="number"
      value="7"
      class="number-button"
      @click="handleButtonClick"
    >
      7
    </button>
    <button
      data-type="number"
      value="8"
      class="number-button"
      @click="handleButtonClick"
    >
      8
    </button>
    <button
      data-type="number"
      value="9"
      class="number-button"
      @click="handleButtonClick"
    >
      9
    </button>
    <button
      data-type="operator"
      value="×"
      class="basic-operation-button"
      @click="handleButtonClick"
    >
      ×
    </button>
    <button
      data-type="function"
      value="root"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      √
    </button>
    <button
      data-type="number"
      value="4"
      class="number-button"
      @click="handleButtonClick"
    >
      4
    </button>
    <button
      data-type="number"
      value="5"
      class="number-button"
      @click="handleButtonClick"
    >
      5
    </button>
    <button
      data-type="number"
      value="6"
      class="number-button"
      @click="handleButtonClick"
    >
      6
    </button>
    <button
      data-type="operator"
      value="-"
      class="basic-operation-button"
      @click="handleButtonClick"
    >
      -
    </button>
    <button
      data-type="constant"
      value="Π"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      Π
    </button>
    <button
      data-type="number"
      value="1"
      class="number-button"
      @click="handleButtonClick"
    >
      1
    </button>
    <button
      data-type="number"
      value="2"
      class="number-button"
      @click="handleButtonClick"
    >
      2
    </button>
    <button
      data-type="number"
      value="3"
      class="number-button"
      @click="handleButtonClick"
    >
      3
    </button>
    <button
      data-type="operator"
      value="+"
      class="basic-operation-button"
      @click="handleButtonClick"
    >
      +
    </button>
    <button
      data-type="constant"
      value="e"
      class="advance-operation-button"
      @click="handleButtonClick"
    >
      e
    </button>
    <button
      data-type="number"
      value="0"
      class="number-button"
      @click="handleButtonClick"
    >
      0
    </button>
    <button
      data-type="number"
      value="00"
      class="number-button"
      @click="handleButtonClick"
    >
      00
    </button>
    <button
      data-type="numbrer"
      value="."
      class="dot-button"
      @click="handleButtonClick"
    >
      .
    </button>
    <button
      data-type="equal"
      value="="
      class="equal-button"
      @click="handleButtonClick"
    >
      =
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

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

function handleButtonClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const button = target.closest("button");
  if (!button) return;

  const value = button.getAttribute("value");
  const type = button.getAttribute("data-type");

  if (!value || !type) return;

  // @ts-ignore
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
</style>
