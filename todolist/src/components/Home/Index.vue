<template>
  <div
    class="w-full h-full rounded-xl shadow-2xl shadow-white border-2 border-[#ffffff90]"
  >
    <el-container class="w-full h-full">
      <el-header style="padding: 0%" height="10vh">
        <Header></Header>
      </el-header>

      <el-container>
        <el-aside width="20vw">
          <Aside></Aside>
        </el-aside>

        <el-main style="padding: 0%">
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Header = defineAsyncComponent(() => import("./Header/Index.vue"));
const Aside = defineAsyncComponent(() => import("./Aside/Index.vue"));
const Main = defineAsyncComponent(() => import("./Main/Index.vue"));
</script>

<style></style>
