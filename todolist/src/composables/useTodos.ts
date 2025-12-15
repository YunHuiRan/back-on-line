import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

export type TodoState = "unfinished" | "completed" | "deleted";

export type NewToDoType = {
  id: string;
  title: string;
  description: string;
  dateRange: string[];
  state: TodoState;
};

export type NewToDoForm = Omit<NewToDoType, "id" | "state">;

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function useTodos(options?: { storageKey?: string; storage?: Storage; initial?: NewToDoType[] }) {
  const STORAGE_KEY = options?.storageKey || "todo-list";
  const storage = options?.storage || (typeof window !== "undefined" ? window.localStorage : ({} as Storage));

  const toDoList = ref<NewToDoType[]>(options?.initial ?? [
    {
      id: uuidv4(),
      title: "Sample To-Do",
      description:
        "This is a sample to-do item. You can add your own to-do items using the form.",
      dateRange: ["2024-06-01 10:00:00", "2024-06-05 18:00:00"],
      state: "unfinished",
    },
  ]);

  // load from storage
  try {
    const raw = storage.getItem && storage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as NewToDoType[];
      toDoList.value = parsed.map((t) => ({
        id: t.id || uuidv4(),
        title: t.title || "",
        description: t.description || "",
        dateRange: t.dateRange || [],
        state: t.state || "unfinished",
      }));
    }
  } catch (e) {
  }

  watch(
    toDoList,
    (val) => {
      try {
        storage.setItem && storage.setItem(STORAGE_KEY, JSON.stringify(val));
      } catch (e) {
      }
    },
    { deep: true }
  );

  function save() {
    try {
      storage.setItem && storage.setItem(STORAGE_KEY, JSON.stringify(toDoList.value));
    } catch (e) {
    }
  }

  function sortList() {
    toDoList.value.sort((a, b) => {
      const stateOrder: Record<TodoState, number> = { unfinished: 0, completed: 1, deleted: 2 };
      return stateOrder[a.state] - stateOrder[b.state];
    });
  }

  function addTodo(form: NewToDoForm) {
    const item: NewToDoType = { id: uuidv4(), ...form, state: "unfinished" };
    toDoList.value.push(item);
    sortList();
    save();
    return item;
  }

  function completeTodo(id: string) {
    const i = toDoList.value.findIndex((t) => t.id === id);
    if (i > -1) {
      toDoList.value[i]!.state = "completed";
      sortList();
      save();
      return true;
    }
    return false;
  }

  function deleteTodo(id: string) {
    const i = toDoList.value.findIndex((t) => t.id === id);
    if (i > -1) {
      toDoList.value[i]!.state = "deleted";
      sortList();
      save();
      return true;
    }
    return false;
  }

  return { toDoList, addTodo, completeTodo, deleteTodo, formatDate };
}
