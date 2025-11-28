<template>
  <div class="flex w-full h-full">
    <Logo></Logo>

    <Notification></Notification>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Logo = defineAsyncComponent(() => import("./Logo.vue"));
const Notification = defineAsyncComponent(() => import("./Notification.vue"));
</script>

<style></style>
