<template>
  <div class="header-container">
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #ffffff80;

  border-left: 2px solid white;
  border-right: 2px;
  border-top: 2px;
}

.header-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 12px;
  background: linear-gradient(to right, white 20%, var(--main-blue));
}

.header-container::after {
  content: "";
  position: absolute;
  right: 0;
  width: 2px;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(to bottom, var(--main-blue) 10%, white);
}
</style>
