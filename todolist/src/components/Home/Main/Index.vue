<template>
  <div class="h-full main-container p-6">
    <div class="h-[10%] flex items-center pl-6">
      <Filter></Filter>
    </div>

    <div class="h-[95%]">
      <ListDetal></ListDetal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Filter = defineAsyncComponent(() => import("./Filter.vue"));
const ListDetal = defineAsyncComponent(() => import("./ListDetal.vue"));
</script>

<style scoped>
.main-container {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.8) 60%, transparent);
}
</style>
