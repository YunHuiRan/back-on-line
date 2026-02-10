<template>
  <div class="w-full h-(--button-display-height)">
    <ButtonsRegular />
  </div>
</template>

<script setup lang="ts">
import ButtonsRegular from "./ButtonsRegular.vue";
</script>

<style scoped>
.buttons-area {
  width: 100%;
  height: var(--button-display-height);
}
</style>
