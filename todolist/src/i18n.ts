import { ref, computed } from "vue";

export type Lang = "en" | "zh";

const STORAGE_KEY = "i18n-lang";

export const detectLanguage = (): Lang => {
    if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === "zh" || saved === "en") return saved;
    }
    if (typeof navigator === "undefined") return "en";
    const raw = (navigator.language || (navigator as any).userLanguage || "en").toLowerCase();
    return raw.startsWith("zh") ? "zh" : "en";
};

export const messages = {
    en: {
        addTodo: "Add To-Do",
        newTodo: "New To-Do",
        title: "Title",
        description: "Description",
        dateRange: "Date Range",
        startPlaceholder: "Start Date",
        endPlaceholder: "End Date",
        submit: "Submit",
        reset: "Reset",
        pleaseInputTitle: "Please input title",
        pleaseInputDesc: "Please input description",
        lengthTitle: "Length should be 1 to 50",
        lengthDesc: "Length should be 3 to 200",
        pleaseSelectDate: "Please select date range",
        noTodos: "Please add todo",
        dueDatePrefix: "Due Date:",
    },
    zh: {
        addTodo: "添加待办",
        newTodo: "新建待办",
        title: "标题",
        description: "描述",
        dateRange: "日期范围",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        submit: "提交",
        reset: "重置",
        pleaseInputTitle: "请输入标题",
        pleaseInputDesc: "请输入描述",
        lengthTitle: "长度应为 1 到 50",
        lengthDesc: "长度应为 3 到 200",
        pleaseSelectDate: "请选择日期范围",
        noTodos: "请添加待办",
        dueDatePrefix: "截止日期：",
    },
} as const;

export function useI18n() {
    const lang = ref<Lang>(detectLanguage());
    const msgs = computed(() => messages[lang.value]);

    function setLang(l: Lang) {
        lang.value = l;
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.setItem(STORAGE_KEY, l);
            }
        } catch (e) {
        }
    }



    return { lang, msgs, setLang };
}
