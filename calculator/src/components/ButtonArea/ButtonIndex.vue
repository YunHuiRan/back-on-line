<template>
  <div class="button-area" ref="buttonArea">
    <ButtonRegularMode />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import ButtonRegularMode from "./ButtonRegularMode.vue";

const animationInstanceStore = userAnimationInstance();

const buttonArea: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (buttonArea.value) {
    animationInstanceStore.setAnimationInstance(buttonArea.value, "buttonArea");
  }
});
</script>

<style scoped>
.button-area {
  width: 100%;
  height: var(--button-area-height);
  border-radius: 20px;
}
</style>
