<template>
  <div class="button-display" ref="animationEndParent">
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
import {ref,type Ref, onMounted} from "vue";
import { regularButtons, advancedButtons } from "@/constants/buttonValues";
import { getButtonValueCategory } from "@/utils/getButtonValueCategory";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { userAnimationInstance } from "@/store/useAnimationInstanceStore";

const calculatorStore = useCalculatorStore();
const animationInstanceStore = userAnimationInstance();

const animationEndParent: Ref<HTMLElement | null> = ref(null);

function getcurrentButtons(): readonly string[] {
  return calculatorStore.mode === "basic" ? regularButtons : advancedButtons;
}

function calculateGridCols(): string {
  return calculatorStore.mode === "basic" ? "grid-cols-4" : "grid-cols-5";
}

onMounted(() => {
  if (animationEndParent.value) {
    animationInstanceStore.setAnimationInstance(animationEndParent.value, "endParent");
  }
});
</script>

<style scoped>
.button-display {
  width: 100%;
  height: var(--button-display-height);
}
</style>
