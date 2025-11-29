<template>
  <div class="header-container flex w-full h-full">
    <Logo></Logo>

    <Notification></Notification>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Logo = defineAsyncComponent(() => import("./Logo.vue"));
const Notification = defineAsyncComponent(() => import("./Notification.vue"));
</script>

<style scoped>
.header-container {
  /* background-image: url("@/assets/banner.webp"); */
  background: linear-gradient(to right, url("/src/assets/banner.webp"), white);
}
</style>
