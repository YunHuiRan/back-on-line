<template>
  <div class="w-full h-[80%]">
    {{ calculationFormulaStore.$state.rawString }}
  </div>
</template>

<script setup lang="ts">
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

const calculationFormulaStore = useCalculationFormulaStore();
</script>

<style></style>
