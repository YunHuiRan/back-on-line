<template>
  <div class="h-full p-6 pt-0">
    <div class="w-full h-full py-6">
      <!-- main -->
      <div class="w-full h-full mt-6 flex flex-col space-y-2">
        <!-- ToDdo list -->
        <ul style="overflow: auto">
          <li
            v-for="_ in 20"
            :key="_"
            class="w-[99%] h-[10vh] flex flex-col m-1 border-l-2 border-b-2 border-gray-200 rounded"
          >
            <span class="w-full h-1/2 text-2xl flex justify-start items-center p-4">
              title
            </span>
            <span
              class="w-full h-1/2 text-xl flex justify-start items-center p-4 max-w-[70ch] truncate text-ellipsis text-[#00000080]"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil culpa
              perspiciatis dicta dolor vel, dolore aliquid assumenda dolorem odio, labore
              eaque accusantium non numquam exercitationem ut quos porro nemo? Nam?
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
