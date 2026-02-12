<template>
  <div class="w-full h-(--button-display-height)">
    <div class="w-full h-full grid p-2 gap-2" :class="calculateGridCols()">
      <button
        v-for="(i, index) in getcurrentButtons()"
        :key="index"
        :value="i"
        class="base-button"
        :class="`${getButtonValueCategory(i)}-buttons`"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { regularButtons, advancedButtons } from "@/constants/buttonValues";
import { getButtonValueCategory } from "@/utils/getButtonValueCategory";
import { useCalculatorStore } from "@/store/index";

const calculatorStore = useCalculatorStore();

function getcurrentButtons(): readonly string[] {
  return calculatorStore.mode === "basic" ? regularButtons : advancedButtons;
}

function calculateGridCols(): string {
  return calculatorStore.mode === "basic" ? "grid-cols-4" : "grid-cols-5";
}
</script>

<style></style>
