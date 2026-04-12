<template>
  <div class="h-full w-full">
    <!-- length -->
    <TabelRow>
      <template #label>Length</template>

      <template #content>
        <DigitalRange
          :min="8"
          :max="20"
          v-model:model-value="generatorStore.length"
        ></DigitalRange>
      </template>
    </TabelRow>

    <!-- include uppercase -->
    <TabelRow>
      <template #label>include uppercase</template>

      <template #content> </template>
    </TabelRow>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import DigitalRange from "./components/DigitalRange.vue";
import TabelRow from "./components/TabelRow.vue";
import { useGeneratorStore } from "./store/generatorStore.ts";

const generatorStore = useGeneratorStore();

watch(
  () => generatorStore.length,
  (newLength) => {
    console.log("Length changed:", newLength);
  },
);
// TODP resize
</script>

<style scoped></style>

