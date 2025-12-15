import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

/**
 * The allowed states for a todo item.
 * @remarks
 * - `unfinished`: task is pending
 * - `completed`: task was finished
 * - `deleted`: task was removed (soft-delete)
 */
export type TodoState = "unfinished" | "completed" | "deleted";

export type NewToDoType = {
  id: string;
  title: string;
  description: string;
  dateRange: string[];
  state: TodoState;
  showDetail: boolean;
};

/**
 * Shape of the form used to create a new todo.
 * The `id` and `state` are filled-in by `addTodo` on creation.
 */
export type NewToDoForm = Omit<NewToDoType, "id" | "state" | 'showDetail'>;

/**
 * Format a date string into `YYYY-MM-DD hh:mm:ss` if valid.
 * If `dateStr` cannot be parsed, the original string is returned.
 * @param dateStr - An ISO or parseable date string
 * @returns Formatted date string or original input for invalid dates
 */
export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * Composable that manages a list of todos persisted to `Storage`.
 * @param options - Optional configuration
 * @param options.storageKey - Key used when persisting to storage (default: `todo-list`)
 * @param options.storage - Storage instance to use (default: `localStorage` when available)
 * @param options.initial - Optional initial list of todos
 * @returns An object containing the reactive `toDoList` and helper methods
 */
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
      showDetail: false,
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
        showDetail: t.showDetail || false,
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

  /** Persist current list to configured `storage`. Safe no-op on failure. */
  function save() {
    try {
      storage.setItem && storage.setItem(STORAGE_KEY, JSON.stringify(toDoList.value));
    } catch (e) {
    }
  }

  /** Sort the list by `state` order: unfinished -> completed -> deleted. */
  function sortList() {
    toDoList.value.sort((a, b) => {
      const stateOrder: Record<TodoState, number> = { unfinished: 0, completed: 1, deleted: 2 };
      return stateOrder[a.state] - stateOrder[b.state];
    });
  }

  /**
   * Create a new todo from a form value and persist it.
   * @param form - Partial todo values supplied by the create form
   * @returns The created `NewToDoType` with filled `id` and `state`
   */
  function addTodo(form: NewToDoForm) {
    const item: NewToDoType = { id: uuidv4(), ...form, state: "unfinished", showDetail: false };
    toDoList.value.push(item);
    sortList();
    save();
    return item;
  }

  /**
   * Mark a todo as `completed` by id.
   * @param id - Identifier of the todo to complete
   * @returns `true` if the item was found and updated, otherwise `false`
   */
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

  /**
   * Soft-delete a todo by setting its state to `deleted`.
   * @param id - Identifier of the todo to delete
   * @returns `true` if the item was found and updated, otherwise `false`
   */
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
