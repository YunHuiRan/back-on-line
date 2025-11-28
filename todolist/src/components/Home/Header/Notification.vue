<template>
  <div class="notification w-1/2 h-full flex justify-end items-center px-6">
    <el-icon size="30px"><Notification /></el-icon>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 只给右上角部分设置圆角，不然只靠Header/Index.vue里的设置会无法完美衔接border */
.notification {
  border-top-right-radius: 12px;
  border: 2px solid var(--main-blue);
  border-left: none;
  border-bottom: none;
  background: linear-gradient(to right, white, transparent);
}
</style>
