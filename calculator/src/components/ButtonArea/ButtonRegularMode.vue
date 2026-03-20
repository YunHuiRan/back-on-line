<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-4">
    <button
      v-for="btn in buttons"
      :key="btn.value + btn.type"
      :data-type="btn.type"
      :value="btn.value"
      :class="btn.class"
      @click="handleButtonClick"
    >
      {{ btn.label ?? btn.value }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

const calculationFormulaStore = useCalculationFormulaStore();

type ButtonDef = {
  value: string;
  type: string;
  class: string;
  label?: string;
};

const buttons: ButtonDef[] = [
  { value: "ac", type: "action", class: "ac-button" },
  { value: "del", type: "action", class: "del-button" },
  { value: "%", type: "operator", class: "basic-operation-button" },
  { value: "÷", type: "operator", class: "basic-operation-button" },
  { value: "7", type: "number", class: "number-button" },
  { value: "8", type: "number", class: "number-button" },
  { value: "9", type: "number", class: "number-button" },
  { value: "×", type: "operator", class: "basic-operation-button" },
  { value: "4", type: "number", class: "number-button" },
  { value: "5", type: "number", class: "number-button" },
  { value: "6", type: "number", class: "number-button" },
  { value: "-", type: "operator", class: "basic-operation-button" },
  { value: "1", type: "number", class: "number-button" },
  { value: "2", type: "number", class: "number-button" },
  { value: "3", type: "number", class: "number-button" },
  { value: "+", type: "operator", class: "basic-operation-button" },
  { value: "00", type: "number", class: "number-button" },
  { value: "0", type: "number", class: "number-button" },
  { value: ".", type: "number", class: "dot-button" },
  { value: "=", type: "equal", class: "equal-button" },
];

function handleButtonClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const button = target.closest("button");
  if (!button) return;

  const value = button.getAttribute("value");
  const type = button.getAttribute("data-type") || "";
  if (!value) return;

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
</style>
