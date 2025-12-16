<template>
  <div class="w-screen h-screen bg-red-300">
    <MdEditor
      v-model="text"
      theme="light"
      language="zh-CN"
      :page-fullscreen="true"
      previewTheme="mk-cute"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const text = ref("# Hello Editor");
</script>

<style></style>
