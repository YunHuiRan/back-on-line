import { beforeEach, describe, it, expect } from "vitest";
import { useI18n } from "../i18n";

beforeEach(() => {
  localStorage.clear();
});

describe("useI18n", () => {
  it("initializes from localStorage", () => {
    localStorage.setItem("i18n-lang", "zh");
    const { lang, msgs } = useI18n();
    expect(lang.value).toBe("zh");
    expect(msgs.value.newTodo).toBe("新建待办");
  });
});
