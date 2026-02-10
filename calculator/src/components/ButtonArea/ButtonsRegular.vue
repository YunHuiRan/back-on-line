<template>
  <div class="w-full h-full grid grid-cols-4 p-2 gap-2">
    <button
      v-for="(i, index) in buttons"
      :key="index"
      :value="i"
      class="base-button"
      :class="`${getButtonValueCategory(i)}-buttons`"
    >
      {{ i }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { regularButtons as buttons } from "@/constants/buttonValues";
import { getButtonValueCategory } from "@/utils/getButtonValueCategory";
</script>

<style scoped>
.base-button {
  font-size: var(--font-size);
  border-radius: var(--button-radius);
  border: 1px solid var(--button-border-color);
}

.base-button:hover {
  filter: brightness(90%);
  cursor: pointer;
}

.regular-buttons {
  background-color: var(--regular-button-bg-color);
  color: var(--regular-text-color);
}

.function-buttons {
  background-color: var(--function-button-bg-color);
  color: var(--function-text-color);
  font-weight: 500;
}

.advanced-buttons {
}

.equal-buttons {
  background-color: var(--equals-button-bg-color);
  color: var(--equals-text-color);
}
</style>
