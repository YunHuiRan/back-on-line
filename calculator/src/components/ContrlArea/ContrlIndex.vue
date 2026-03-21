<template>
  <div class="w-full h-[20%] px-10 pt-5 flex justify-end gap-2 overflow-auto">
    <ThemeToggle />

    <ToggleButtons />
  </div>
</template>

<script setup lang="ts">
import ToggleButtons from "./ToggleButton.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<style></style>
