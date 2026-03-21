<template>
  <div class="w-full h-[80%] flex items-end flex-col relative">
    <Transition name="copy-button">
      <div
        v-if="renderedString.length !== 0"
        class="w-full h-1/2 flex items-end justify-end p-4"
      >
        <button class="copy-button">copy</button>
      </div>
    </Transition>

    <Transition name="group-fade">
      <TransitionGroup v-if="visible" tag="div" name="fade" class="container">
        <span v-for="charObj in renderedString" :key="charObj.id">
          {{ charObj.char }}
        </span>
      </TransitionGroup>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch, nextTick } from "vue";
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

const calculationStore = useCalculationFormulaStore();

const renderedString: Ref<{ id: number; char: string }[]> = ref([]);
const visible = ref(true);

let idCounter = 0;

watch(
  () => calculationStore.$state.rawString,
  async (newString = "", oldString = "") => {
    // clear
    if (newString.length === 0 && oldString.length > 0) {
      visible.value = false;

      setTimeout(() => {
        renderedString.value = [];
      }, 300);

      return;
    }

    // resume display
    if (newString.length > 0 && !visible.value) {
      visible.value = true;
      await nextTick();
    }

    const isAppend = newString.startsWith(oldString);
    const isDelete = oldString.startsWith(newString);

    // as long as it's not append or delte, replace it
    const isReplace = !isAppend && !isDelete;

    // press enter
    if (isReplace) {
      visible.value = false;

      setTimeout(async () => {
        renderedString.value = newString.split("").map((char) => ({
          id: idCounter++,
          char,
        }));

        visible.value = true;
        await nextTick();
      }, 300);

      return;
    }

    // add to string
    if (isAppend) {
      const addedPart = newString.slice(oldString.length);

      for (const char of addedPart) {
        renderedString.value.push({
          id: idCounter++,
          char,
        });
      }

      return;
    }

    // delete
    if (isDelete) {
      const removeCount = oldString.length - newString.length;

      for (let i = 0; i < removeCount; i++) {
        renderedString.value.pop();
      }

      return;
    }
  },
);
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 1rem;
  font-size: 3rem;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-active {
  position: absolute;
}

.group-fade-enter-active,
.group-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.group-fade-enter-from,
.group-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.copy-button-enter-active,
.copy-button-leave-active {
  transition: all 0.3s ease-in-out;
}

.copy-button-enter-from,
.copy-button-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.copy-button {
  padding: 8px 20px 8px 20px;
  border-radius: 12px;
  border: 1px solid var(--base-button-border-color);
  transition: all 0.2s ease-in-out;
}

.copy-button:hover {
  transform: translateY(-5px) scaleX(105%);
}

.copy-button:active {
  transform: translateY(-3px) scaleX(100%);
}
</style>
