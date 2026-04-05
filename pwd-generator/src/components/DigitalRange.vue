<template>
  <div class="digital-range-wrapper" v-bind="$attrs">
    <div class="slider"></div>

    <div class="digital-range">
      <div v-for="i in segements" :key="i" class="segements"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  min: number;
  max: number;
}>();

const segements = props.max - props.min + 1;
</script>

<style scoped>
.digital-range-wrapper {
  position: relative;
  width: 100%;
  height: 15px;
}

.slider {
  position: absolute;
  top: -5px;
  left: 5px;
  width: 25px;
  height: 25px;
  background-color: var(--main-color-blue);
  border-top-right-radius: 10px;
  corner-shape: superellipse(0);
}

.digital-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border: 4px solid var(--main-color-red);
  border-top-right-radius: 12px;
}

.segements {
  display: flex;
  width: 10px;
  height: 10px;
}
</style>
