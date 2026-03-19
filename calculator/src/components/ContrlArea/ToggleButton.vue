<template>
  <button
    ref="animationChild"
    class="h-full aspect-square rounded-[10px] grid grid-cols-2 font-bold"
    @click="handleToggleClick"
  >
    <span class="translate-x-1/6 translate-y-1/6">
      <span v-if="currentMode === 'scientific'">+</span>
      <span v-else>!</span>
    </span>
    <span class="-translate-x-1/6 translate-y-1/6">
      <span v-if="currentMode === 'scientific'">–</span>
      <span v-else>√</span>
    </span>
    <span class="translate-x-1/6 -translate-y-1/6">
      <span v-if="currentMode === 'scientific'">×</span>
      <span v-else>e</span>
    </span>
    <span class="-translate-x-1/6 -translate-y-1/6">
      <span v-if="currentMode === 'scientific'">÷</span>
      <span v-else>x</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, onMounted } from "vue";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import { toggleCalculatorMode } from "@/utils/toggleCalculatorMode";

const calculatorStore = useCalculatorStore();
const animationInstanceStore = userAnimationInstance();

const animationChild: Ref<HTMLButtonElement | null> = ref(null);
const currentMode = computed(() => calculatorStore.$state.mode);

// TODO light and dark mode

async function handleToggleClick(): Promise<void> {
  if (!animationChild.value) return;

  animationChild.value.disabled = true;

  const res: boolean = await toggleCalculatorMode();

  if (res) {
    console.log("Mode toggled successfully, it is now", currentMode.value);
  } else {
    console.error("Failed to toggle mode");
  }

  animationChild.value.disabled = false;
}

onMounted(() => {
  if (animationChild.value) {
    animationInstanceStore.setAnimationInstance(
      animationChild.value,
      "toggleButton",
    );
  }
});
</script>

<style scoped>
.icon {
  height: 100%;
  width: 100%;
}
</style>
