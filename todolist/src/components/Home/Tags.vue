<template>
  <div class="w-full h-[10vh] flex relative justify-start items-center space-x-4 px-6">
    <button
      v-for="_ in 5"
      class="w-[200px] h-[5vh] text-xl bg-[#27EDCA] text-white rounded-full hover:cursor-pointer"
      :style="{
        backgroundColor: _ === 1 ? '#27EDCA' : 'white',
        color: _ === 1 ? 'white' : 'black',
      }"
    >
      tag button {{ _ }}
    </button>

    <!-- tag serch -->
    <input
      type="text"
      class="absolute right-6 w-[200px] h-[5vh] text-xl bg-white text-black indent-3 outline-none rounded-full hover:cursor-pointer"
      placeholder="search tag"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
