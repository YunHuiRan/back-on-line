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
import { buttons } from "./buttonRegularData";

const calculationFormulaStore = useCalculationFormulaStore();

/**
 * Handle a click from any rendered regular button.
 * Finds the closest `button` element, reads its `value` and `data-type`
 * attributes and forwards them to the calculation store.
 * -------------------
 * @param {MouseEvent} event - Click event from the button
 */
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
