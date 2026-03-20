<template>
  <button
    aria-label="Toggle theme"
    :aria-pressed="isDark"
    @click="toggle"
    class="h-10 w-10 flex items-center justify-center rounded-md"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const storageKey = "theme";
const isDark = ref(false);

function applyTheme(dark: boolean) {
  const el = document.documentElement;
  if (dark) el.classList.add("dark");
  else el.classList.remove("dark");
}

function setTheme(dark: boolean) {
  isDark.value = dark;
  applyTheme(dark);
  try {
    localStorage.setItem(storageKey, dark ? "dark" : "light");
  } catch (e) {}
}

function toggle() {
  setTheme(!isDark.value);
}

onMounted(() => {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(storageKey);
  } catch (e) {
    stored = null;
  }

  if (stored === "dark") setTheme(true);
  else if (stored === "light") setTheme(false);
  else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(Boolean(prefersDark));
  }
});
</script>

<style scoped>
button {
  background: transparent;
}
</style>
