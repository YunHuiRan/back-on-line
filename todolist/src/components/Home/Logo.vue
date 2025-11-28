<template>
  <div class="logo w-1/2 h-full flex justify-start items-center space-x-5 px-6">
    <img src="@/assets/navLogoLight.png" alt="light logo" class="h-1/2" />

    <span class="text-4xl font-bold">Ran's Todo List</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.logo {
  --triangle-background: repeating-linear-gradient(
      60deg,
      rgba(190, 242, 255, 0.3),
      transparent 35px
    ),
    repeating-linear-gradient(180deg, transparent, rgba(108, 230, 255, 0.3) 30px),
    repeating-linear-gradient(120deg, rgba(16, 179, 215, 0.3), transparent 46px);

  background: linear-gradient(0.25turn, transparent, white 90%),
    var(--triangle-background);
}
</style>
