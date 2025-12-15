<template>
  <el-config-provider :locale="locale">
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
                :aria-label="msgs.addTodo"
              >
                {{ msgs.addTodo }}
              </el-button>

              <div class="absolute top-0 right-0 flex items-center gap-2">
                <el-select
                  v-model="lang"
                  size="small"
                  @change="setLang"
                  placeholder="Lang"
                  class="mr-2"
                  style="width: 92px"
                >
                  <el-option label="中文" :value="'zh'" />
                  <el-option label="EN" :value="'en'" />
                </el-select>

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
                :title="msgs.newTodo"
              >
                <el-form
                  ref="ruleFormRef"
                  :model="ruleForm"
                  :rules="rules"
                  style="max-width: 1000px"
                  label-width="auto"
                >
                  <el-form-item :label="msgs.title + ':'" prop="title">
                    <el-input
                      v-model="ruleForm.title"
                      :placeholder="msgs.pleaseInputTitle"
                      clearable
                    />
                  </el-form-item>

                  <el-form-item :label="msgs.description + ':'" prop="description">
                    <el-input
                      v-model="ruleForm.description"
                      :placeholder="msgs.pleaseInputDesc"
                      autosize
                      type="textarea"
                      clearable
                    />
                  </el-form-item>

                  <el-form-item :label="msgs.dateRange + ':'" prop="dateRange">
                    <el-date-picker
                      v-model="ruleForm.dateRange"
                      type="datetimerange"
                      :start-placeholder="msgs.startPlaceholder"
                      :end-placeholder="msgs.endPlaceholder"
                    />
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm">
                      {{ msgs.submit }}
                    </el-button>

                    <el-button @click="resetForm">{{ msgs.reset }}</el-button>
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
                  <span
                    >{{ msgs.dueDatePrefix }} {{ formatDate(todo.dateRange[1]!) }}</span
                  >
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
            {{ msgs.noTodos }}
          </el-card>
        </div>
      </el-card>
    </main>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useDark } from "@vueuse/core";
import { useTodos, type NewToDoType, type NewToDoForm, formatDate } from "./composables/useTodos";
import { useI18n } from "./i18n";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import enLocale from "element-plus/es/locale/lang/en";

const isDark = useDark();
const toggleDark = ref(isDark.value);
function toggleDarkMode() {
  isDark.value = !isDark.value;
}

const { toDoList, addTodo, completeTodo, deleteTodo } = useTodos();
const { lang, msgs, setLang } = useI18n();
const locale = computed(() => (lang.value === "zh" ? zhCn : enLocale));
const drawer = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<NewToDoForm>({
  title: "",
  description: "",
  dateRange: [],
});

const rules = computed<FormRules<NewToDoType>>(() => ({
  title: [
    { required: true, message: msgs.value.pleaseInputTitle, trigger: "blur" },
    { min: 1, max: 50, message: msgs.value.lengthTitle, trigger: "blur" },
  ],
  description: [
    { required: false, message: msgs.value.pleaseInputDesc, trigger: "blur" },
    { min: 3, max: 200, message: msgs.value.lengthDesc, trigger: "blur" },
  ],
  dateRange: [
    {
      type: "array",
      required: true,
      message: msgs.value.pleaseSelectDate,
      trigger: "change",
    },
  ],
}));

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
