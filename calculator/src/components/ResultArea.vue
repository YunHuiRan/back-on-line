<template>
  <div class="w-full h-full bg-red-300">
    {{ calculationFormulaStore.$state.rawString }}
  </div>
</template>

<script setup lang="ts">
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

const calculationFormulaStore = useCalculationFormulaStore();
</script>

<style></style>
