import { describe, it, expect, beforeEach } from "vitest";
import { useTodos } from "../composables/useTodos";

/** Storage key used for tests to isolate data. */
const KEY = "test-todos";

beforeEach(() => {
  // clean storage between tests
  localStorage.clear();
});

describe("useTodos composable", () => {
  it("adds a todo and sets default state", () => {
    const { toDoList, addTodo } = useTodos({ storageKey: KEY, storage: localStorage, initial: [] });
    const item = addTodo({ title: "t1", description: "d1", dateRange: ["2024-01-01"] });
    // created item should include an id and default state
    expect(item.id).toBeDefined();
    expect(item.state).toBe("unfinished");
    expect(toDoList.value.some((t) => t.id === item.id)).toBe(true);
  });

  it("completes and deletes todos and keeps order", () => {
    const { toDoList, addTodo, completeTodo, deleteTodo } = useTodos({ storageKey: KEY, storage: localStorage, initial: [] });
    const a = addTodo({ title: "a", description: "a", dateRange: ["2024-01-01"] });
    const b = addTodo({ title: "b", description: "b", dateRange: ["2024-01-02"] });

    // complete a
    expect(completeTodo(a.id)).toBe(true);
    expect(toDoList.value.find((t) => t.id === a.id)?.state).toBe("completed");

    // delete b
    expect(deleteTodo(b.id)).toBe(true);
    expect(toDoList.value.find((t) => t.id === b.id)?.state).toBe("deleted");

    // order should be unfinished (none) then completed then deleted
    expect(toDoList.value[0]!.state).toBe("completed");
    expect(toDoList.value[1]!.state).toBe("deleted");
  });

  it("persists to storage and loads on init", () => {
    const { addTodo } = useTodos({ storageKey: KEY, storage: localStorage, initial: [] });
    const x = addTodo({ title: "persist", description: "p", dateRange: ["2024-02-02"] });

    // create a new instance and expect to find x
    const { toDoList } = useTodos({ storageKey: KEY, storage: localStorage });
    expect(toDoList.value.some((t) => t.id === x.id)).toBe(true);
  });
});
