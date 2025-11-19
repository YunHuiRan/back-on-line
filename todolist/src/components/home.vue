<template>
  <div class="w-full h-full">
    <el-container class="w-full h-full bg-[#F0F6F6]">
      <!-- header -->
      <el-header
        class="bg-[#FCE000] flex justify-center items-center"
        style="padding: 0%"
        height="10vh"
      >
        <div class="w-1/2 h-full flex justify-start items-center px-6">
          <span class="text-4xl font-bold">Ran's Todo List</span>
        </div>

        <div class="w-1/2 h-full flex justify-end items-center px-6">
          <el-icon size="30px"><Notification /></el-icon>
        </div>
      </el-header>

      <el-container>
        <!-- aside -->
        <el-aside
          width="20vw"
          class="bg-[#F352AE] rounded-tr-[50px] p-6 flex flex-col space-y-5"
        >
          <div class="text-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus maxime et,
            suscipit quia placeat aspernatur. Suscipit explicabo, aperiam sed iusto, vel
            earum vitae aliquam unde recusandae fugiat dicta ex optio.
          </div>

          <button
            class="w-full h-[5vh] bg-[#FCE000] hover:cursor-pointer rounded-full text-2xl"
          >
            Add ToDo
          </button>
        </el-aside>

        <!-- main -->
        <el-main class="bg-[#F0F6F6]" style="padding: 0%">
          <!-- tags -->
          <div
            class="w-full h-[10vh] flex relative justify-start items-center space-x-4 px-6"
          >
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

          <!-- main display area -->
          <div class="w-full h-[calc(100%-10vh)] p-6 pt-0 bg-white">
            <div class="w-full h-full py-6">
              <!-- state selector -->
              <div class="w-full h-[5vh] flex flex-row space-x-4">
                <button
                  v-for="state in toDoStates"
                  class="w-[200px] h-full text-xl bg-white active:bg-[#F352AE] active:text-white rounded-full hover:cursor-pointer"
                  :style="{
                    backgroundColor: currentState === state ? '#F352AE' : 'white',
                    color: currentState === state ? 'white' : 'black',
                  }"
                  @click="setCurrentState(state)"
                >
                  {{ state }}
                </button>
              </div>

              <!-- main -->
              <div class="w-full h-full mt-6 flex flex-col space-y-2">
                <!-- ToDdo list -->
                <ul style="overflow: auto">
                  <li
                    v-for="_ in 20"
                    :key="_"
                    class="w-[99%] h-[10vh] flex flex-col m-1 border-l-2 border-b-2 border-gray-200 rounded"
                  >
                    <span
                      class="w-full h-1/2 text-2xl flex justify-start items-center p-4"
                    >
                      title
                    </span>
                    <span
                      class="w-full h-1/2 text-xl flex justify-start items-center p-4 max-w-[70ch] truncate text-ellipsis text-[#00000080]"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil culpa
                      perspiciatis dicta dolor vel, dolore aliquid assumenda dolorem odio,
                      labore eaque accusantium non numquam exercitationem ut quos porro
                      nemo? Nam?
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ToDoState {
  All: "All";
  Unfinished: "Unfinished";
  Finished: "Finished";
}

const toDoStates: ToDoState = {
  All: "All",
  Unfinished: "Unfinished",
  Finished: "Finished",
};
const currentState = ref<keyof ToDoState>("All");

function setCurrentState(state: keyof ToDoState): void {
  currentState.value = state;
}
</script>

<style></style>
