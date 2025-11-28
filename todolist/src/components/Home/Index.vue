<template>
  <div class="w-full h-full">
    <el-container class="w-full h-full">
      <!-- header -->
      <el-header style="padding: 0%" height="10vh">
        <Header></Header>
      </el-header>

      <el-container>
        <!-- aside -->
        <el-aside
          width="20vw"
          class="bg-[#F352AE] rounded-tr-[50px] p-6 flex flex-col space-y-5"
        >
          <AddTodo></AddTodo>
        </el-aside>

        <!-- main -->
        <el-main class="bg-[#F0F6F6]" style="padding: 0%">
          <!-- tags -->
          <Tags></Tags>

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
import { defineAsyncComponent, ref } from "vue";

const Header = defineAsyncComponent(() => import("./Header/Index.vue"));
const Logo = defineAsyncComponent(() => import("./Header/Logo.vue"));
const Notification = defineAsyncComponent(() => import("./Header/Notification.vue"));
const AddTodo = defineAsyncComponent(() => import("../AddTodo/Index.vue"));
const Tags = defineAsyncComponent(() => import("./Tags.vue"));

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

<style scoped></style>
