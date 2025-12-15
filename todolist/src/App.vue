<template>
  <main class="flex justify-center items-start">
    <el-card
      shadow="always"
      class="max-w-[1200px] w-[70%] min-w-[500px] min-h-[500px] m-6 p-6"
    >
      <template #header>
        <div class="relative flex justify-center items-center">
          <el-affix :offset="0">
            <el-button
              type="primary"
              plain
              size="large"
              ref="addBtnRef"
              @click="drawer = true"
              aria-label="Add new todo"
            >
              add to-do
            </el-button>

            <div class="absolute top-0 right-0">
              <el-switch v-model="toggleDark" @change="toggleDarkMode">
                <template #active-action>
                  <el-icon><Moon /></el-icon>
                </template>
                <template #inactive-action>
                  <el-icon><Sunny /></el-icon>
                </template>
              </el-switch>
            </div>

            <!-- drawer -->
            <el-drawer
              v-model="drawer"
              direction="rtl"
              size="50%"
              title="New To-Do"
              header="New To-Do"
            >
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                style="max-width: 1000px"
                label-width="auto"
              >
                <el-form-item label="Title: " prop="title">
                  <el-input
                    v-model="ruleForm.title"
                    placeholder="Please input title"
                    clearable
                  />
                </el-form-item>

                <el-form-item label="Description: " prop="description">
                  <el-input
                    v-model="ruleForm.description"
                    placeholder="Please input description"
                    autosize
                    type="textarea"
                    clearable
                  />
                </el-form-item>

                <el-form-item label="Date Range: " prop="dateRange">
                  <el-date-picker
                    v-model="ruleForm.dateRange"
                    type="datetimerange"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm"> Submit </el-button>

                  <el-button @click="resetForm">Reset</el-button>
                </el-form-item>
              </el-form>
            </el-drawer>
          </el-affix>
        </div>
      </template>

      <!-- list -->
      <div class="flex flex-col w-full h-full gap-y-2 scroll-auto">
        <TransitionGroup name="list" tag="div" class="relative">
          <el-card
            v-for="todo in toDoList"
            :key="todo.id"
            class="w-full h-[150px] mb-2 relative"
            :style="{ opacity: todo.state === 'unfinished' ? 1 : 0.5 }"
          >
            <!-- completed todo overlay -->
            <div
              v-if="todo.state === 'completed'"
              class="absolute top-0 left-0 w-full h-full box-border bg-(--el-green) opacity-30"
            ></div>
            <!-- deleted todo overlay -->
            <div
              v-if="todo.state === 'deleted'"
              class="absolute top-0 left-0 w-full h-full box-border bg-(--el-red) opacity-30"
            ></div>

            <div class="w-full h-full flex flex-row gap-x-4">
              <div class="w-4/5 h-full">
                <!-- title -->
                <h1>
                  {{ todo.title }}
                </h1>
                <!-- date -->
                <span>截止日期：{{ formatDate(todo.dateRange[1]!) }}</span>
                <!-- description -->
                <span class="line-clamp-2">{{ todo.description }} </span>
              </div>

              <div
                v-if="todo.state === 'unfinished'"
                class="w-1/5 h-full flex justify-center items-center"
              >
                <button
                  class="w-1/2 h-full flex justify-center items-center rounded-lg text-lg transition-all ease-in-out hover:cursor-pointer hover:bg-(--el-green) hover:w-full hover:text-3xl"
                  @click="completeTodo(todo.id)"
                  aria-label="Complete todo"
                >
                  <el-icon><Check /></el-icon>
                </button>
                <button
                  class="w-1/2 h-full flex justify-center items-center rounded-lg text-lg transition-all ease-in-out hover:cursor-pointer hover:bg-(--el-red) hover:w-full hover:text-3xl"
                  @click="deleteTodo(todo.id)"
                  aria-label="Delete todo"
                >
                  <el-icon><Close /></el-icon>
                </button>
              </div>
            </div>
          </el-card>
        </TransitionGroup>

        <el-card v-if="toDoList.length === 0" class="w-full h-[100px] text-center">
          please add todo
        </el-card>
      </div>
    </el-card>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useDark } from "@vueuse/core";
import { useTodos, type NewToDoType, type NewToDoForm, formatDate } from "./composables/useTodos";

/** Reactive boolean driven by `@vueuse/core` dark-mode helper. */
const isDark = useDark();
/** Local toggle mirror used by the switch control. */
const toggleDark = ref(isDark.value);
/**
 * Toggle the global dark mode flag.
 * This flips `isDark.value` which is shared with `useDark()`.
 */
function toggleDarkMode() {
  isDark.value = !isDark.value;
}

/** Composable exposing the todo list and helpers. */
const { toDoList, addTodo, completeTodo, deleteTodo } = useTodos();
/** Drawer visibility. */
const drawer = ref(false);
/** Reference to the Element Plus form instance for validation/control. */
const ruleFormRef = ref<FormInstance>();
/** Form model bound to the New ToDo drawer. */
const ruleForm = reactive<NewToDoForm>({
  title: "",
  description: "",
  dateRange: [],
});


/** Form validation rules used by `ruleFormRef`. */
const rules = reactive<FormRules<NewToDoType>>({
  title: [
    { required: true, message: "Please input title", trigger: "blur" },
    { min: 1, max: 50, message: "Length should be 1 to 50", trigger: "blur" },
  ],
  description: [
    { required: false, message: "Please input description", trigger: "blur" },
    { min: 3, max: 200, message: "Length should be 3 to 200", trigger: "blur" },
  ],
  dateRange: [
    {
      type: "array",
      required: true,
      message: "Please select date range",
      trigger: "change",
    },
  ],
});

/**
 * Validate and submit the form, adding a todo if valid.
 * Closes the drawer and resets the form when submission succeeds.
 */
function submitForm() {
  if (!ruleFormRef) return;
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      addTodo(ruleForm);
      drawer.value = false;
      resetForm();
    } else {
    }
  });
}

/** Reset the form fields to their initial values. */
function resetForm() {
  ruleFormRef.value?.resetFields();
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(20px, 0);
  height: 0px;
}

.list-leave-active {
  position: absolute;
}
</style>
