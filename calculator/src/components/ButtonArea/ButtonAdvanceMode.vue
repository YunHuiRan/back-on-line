<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-5">
    <button value="sin" class="advance-operation-button">
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
    <button value="cos" class="advance-operation-button">
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
    <button value="tan" class="advance-operation-button">
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
    <button value="log" class="advance-operation-button">
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
    <button value="ln" class="advance-operation-button">
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
    <button value="(" class="advance-operation-button">(</button>
    <button value=")" class="advance-operation-button">)</button>
    <button
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
    <button value="!" class="advance-operation-button">!</button>
    <button value="ac" class="ac-button">ac</button>
    <button value="del" class="del-button">del</button>
    <button value="%" class="basic-operation-button">%</button>
    <button value="÷" class="basic-operation-button">÷</button>
    <button value="^" class="advance-operation-button">^</button>
    <button value="7" class="number-button">7</button>
    <button value="8" class="number-button">8</button>
    <button value="9" class="number-button">9</button>
    <button value="×" class="basic-operation-button">×</button>
    <button value="root" class="advance-operation-button">√</button>
    <button value="4" class="number-button">4</button>
    <button value="5" class="number-button">5</button>
    <button value="6" class="number-button">6</button>
    <button value="-" class="basic-operation-button">-</button>
    <button value="Π" class="advance-operation-button">Π</button>
    <button value="1" class="number-button">1</button>
    <button value="2" class="number-button">2</button>
    <button value="3" class="number-button">3</button>
    <button value="+" class="basic-operation-button">+</button>
    <button value="e" class="advance-operation-button">e</button>
    <button value="00" class="number-button">00</button>
    <button value="0" class="number-button">0</button>
    <button value="." class="dot-button">.</button>
    <button value="=" class="equal-button">=</button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

type AngleUnitType = "rad" | "deg";

const angleUnit: Ref<AngleUnitType> = ref("deg");
const isInverseMode: Ref<boolean> = ref(false);

function toggleAngleUnit(newAngleUnit: AngleUnitType): void {
  if (angleUnit.value === newAngleUnit) return;
  angleUnit.value = newAngleUnit;

  console.log(`angle unit changed to ${newAngleUnit}`);
}

function toggleInverseMode(): void {
  isInverseMode.value = !isInverseMode.value;

  console.log(`inverse mode ${isInverseMode.value ? "enabled" : "disabled"}`);
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
