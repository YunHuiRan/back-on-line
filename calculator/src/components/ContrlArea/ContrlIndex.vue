<template>
  <div
    ref="animationStartParent"
    class="w-full h-[4%] absolute top-4 pr-10 flex justify-end"
  >
    <ToggleButtons />
  </div>
</template>

<script setup lang="ts">
import { ref,type Ref, onMounted } from "vue";
import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import ToggleButtons from "./ToggleButtons.vue";

const animationInstanceStore = userAnimationInstance();

const animationStartParent: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (animationStartParent.value) {
    animationInstanceStore.setAnimationInstance(
      animationStartParent.value,
      "startParent"
    );
  }
});
</script>

<style></style>
