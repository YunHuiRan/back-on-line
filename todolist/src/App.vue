<template>
  <main class="flex justify-center items-start">
    <el-card
      shadow="always"
      class="max-w-[1200px] w-[70%] min-w-[500px] min-h-[500px] m-6 p-6 flex flex-col relative"
    >
      <template #header>
        <div class="relative flex justify-center">
          <el-affix :offset="0">
            <el-button type="primary" size="large" ref="addBtnRef" @click="drawer = true">
              add to-do
            </el-button>

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
                    @change="drawer = true"
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
      <div class="flex flex-col w-full h-full gap-y-2">
        <div
          v-for="(i, index) in toDoList"
          :index="index"
          class="w-full h-[100px] bg-amber-200"
        >
          {{ i }}
        </div>

        <div v-if="toDoList.length === 0" class="w-full h-[100px] bg-amber-200">
          please add todo
        </div>
      </div>
    </el-card>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const toDoList = ref<any>([]);
const drawer = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<NewToDoType>({
  title: "",
  description: "",
  dateRange: [],
});

type NewToDoType = {
  title: string;
  description: string;
  dateRange: Array<string>;
};

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

function submitForm() {
  if (!ruleFormRef) return;
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
    }
  });
}

function resetForm() {
  ruleFormRef.value?.resetFields();
}
</script>

<style></style>
