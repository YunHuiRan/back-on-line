<template>
  <div class="index-container w-full h-full rounded-xl border-2 border-[#ffffff90]">
    <el-container class="w-full h-full relative">
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

<style scoped>
.index-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.index-container ::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url("/src/assets/banner.webp") no-repeat top left;
  background-size: cover;
  z-index: -1;
}
</style>
