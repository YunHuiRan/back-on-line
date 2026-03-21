<template>
  <div class="w-screen h-screen flex-center">
    <!-- calculator container -->
    <div class="container shadow-2xl">
      <div class="w-full h-[35%] relative">
        <!-- control buttons -->
        <ContrlIndex />

        <!-- display result -->
        <ResultArea />
      </div>

      <!-- buttons -->
      <ButtonsArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContrlIndex from "./components/ContrlArea/ContrlIndex.vue";
import ResultArea from "@/components/ResultArea.vue";
import ButtonsArea from "@/components/ButtonArea/ButtonIndex.vue";
</script>

<style scoped>
.container {
  position: relative;

  width: var(--calculator-container-width);
  min-width: var(--calculator-container-min-width);
  max-width: var(--calculator-container-max-width);

  height: var(--calculator-container-height);
  min-height: var(--calculator-container-min-height);
  max-height: var(--calculator-container-max-height);

  background-color: var(--calculator-container-bg-color);
  border-radius: var(--calculator-container-border-radius);
}
</style>
