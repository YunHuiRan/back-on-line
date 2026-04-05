<template>
  <div>
    <DigitalRange
      :min="8"
      :max="16"
      v-model:model-value="generatorStore.length"
    ></DigitalRange>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import DigitalRange from "./components/DigitalRange.vue";
import { useGeneratorStore } from "./store/generatorStore.ts";

const generatorStore = useGeneratorStore();

watch(
  () => generatorStore.length,
  (newLength) => {
    console.log("Length changed:", newLength);
  },
);
</script>

<style scoped></style>

