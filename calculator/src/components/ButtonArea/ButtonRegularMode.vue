<template>
  <div class="w-full h-full grid p-2 gap-2 grid-cols-4">
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
      data-type="number"
      value="00"
      class="number-button"
      @click="handleButtonClick"
    >
      00
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
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

const calculationFormulaStore = useCalculationFormulaStore();

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
