<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-5">
    <button value="sin" class="advance-operation-button">
      <span v-if="!isInverseMode">sin</span>
      <span v-else>sin <sup>-1</sup></span>
    </button>
    <button value="cos" class="advance-operation-button">
      <span v-if="!isInverseMode">cos</span>
      <span v-else>cos <sup>-1</sup></span>
    </button>
    <button value="tan" class="advance-operation-button">
      <span v-if="!isInverseMode">tan</span>
      <span v-else>tan <sup>-1</sup></span>
    </button>
    <button
      value="rad"
      class="advance-operation-button relative"
      :class="angleUnit === 'rad' ? 'selected-angle-unit-button' : ''"
      @click="toggleAngleUnit('rad')"
    >
      <span>rad</span>
      <span
        class="absolute w-full h-full flex justify-center items-center top-0 -left-[50%]"
      >
        rad
      </span>
    </button>
    <button
      value="deg"
      class="advance-operation-button relative"
      :class="angleUnit === 'deg' ? 'selected-angle-unit-button' : ''"
      @click="toggleAngleUnit('deg')"
    >
      <span>deg</span>
      <span
        class="absolute w-full h-full flex justify-center items-center top-0 left-[50%]"
      >
        deg
      </span>
    </button>
    <button value="log" class="advance-operation-button">
      <span v-if="!isInverseMode">log</span>
      <span v-else>10<sup>^</sup></span>
    </button>
    <button value="ln" class="advance-operation-button">
      <span v-if="!isInverseMode">ln</span>
      <span v-else>e<sup>×</sup></span>
    </button>
    <button value="(" class="advance-operation-button">(</button>
    <button value=")" class="advance-operation-button">)</button>
    <button
      value="inv"
      class="advance-operation-button"
      @click="toggleInverseMode"
    >
      inv
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
</style>
