<template>
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
