<template>
  <div class="button-display" ref="buttonArea">
    <div class="w-full h-full grid p-2 gap-2" :class="calculateGridCols()">
      <button
        v-for="(i, index) in getcurrentButtons()"
        :key="index"
        :value="i"
        class="base-button"
        :class="`${getButtonValueCategory(i)}-buttons`"
        @click="calculationFormulaStore.addToRawString(i)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
import { regularButtons, advancedButtons } from "@/constants/buttonValues";
import { getButtonValueCategory } from "@/utils/getButtonValueCategory";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

const calculatorStore = useCalculatorStore();
const animationInstanceStore = userAnimationInstance();
const calculationFormulaStore = useCalculationFormulaStore();

const buttonArea: Ref<HTMLElement | null> = ref(null);

function getcurrentButtons(): readonly string[] {
  return calculatorStore.mode === "basic" ? regularButtons : advancedButtons;
}

function calculateGridCols(): string {
  return calculatorStore.mode === "basic" ? "grid-cols-4" : "grid-cols-5";
}

onMounted(() => {
  if (buttonArea.value) {
    animationInstanceStore.setAnimationInstance(buttonArea.value, "buttonArea");
  }
});
</script>

<style scoped>
.button-display {
  width: 100%;
  height: var(--button-display-height);
  border-radius: var(--container-border-radius);
}
</style>
