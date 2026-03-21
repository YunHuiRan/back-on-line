<template>
  <div class="button-area" ref="buttonArea">
    <KeepAlive>
      <ButtonRegularMode v-if="calculatorStore.$state.mode === 'basic'" />
      <ButtonAdvanceMode v-else />
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
// ButtonIndex.vue
// Top-level container for the calculator's button area. Chooses between
// `ButtonRegularMode` and `ButtonAdvanceMode` based on the calculator mode
// from `useCalculatorStore` and registers the element with the animation
// instance store on mount.
import { ref, type Ref, onMounted } from "vue";
import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import ButtonRegularMode from "./ButtonRegularMode.vue";
import ButtonAdvanceMode from "./ButtonAdvanceMode.vue";

const animationInstanceStore = userAnimationInstance();
const calculatorStore = useCalculatorStore();

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
