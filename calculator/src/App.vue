<template>
  <div class="w-screen h-screen flex-center">
    <!-- calculator container -->
    <div class="container">
      <ContrlIndex />

      <!-- result display -->
      <ResultArea />

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
  width: var(--container-width);
  min-width: var(--container-min-width);
  max-width: var(--container-max-width);

  height: var(--container-height);
  min-height: var(--container-min-height);
  max-height: var(--container-max-height);

  background-color: var(--container-bg-color);
  border-radius: var(--container-border-radius);
}
</style>
