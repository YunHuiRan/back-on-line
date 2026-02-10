<template>
  <div class="w-screen h-screen flex-center">
    <!-- calculator container -->
    <div class="container">
      <!-- result display -->
      <ResultDisplay />

      <!-- buttons -->
      <ButtonsArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResultDisplay from "@/components/ResultArea.vue";
import ButtonsArea from "@/components/ButtonArea/ButtonIndex.vue";
</script>

<style scoped>
.container {
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
