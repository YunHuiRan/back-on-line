import { defineStore } from "pinia";

type CalculatorState = "basic" | "scientific";

type ThemeState = "light" | "dark";

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    mode: "scientific" as CalculatorState,
    theme: "light" as ThemeState,
  }),

  actions: {
    currentMode(): CalculatorState {
      return this.mode;
    },

    toggleMode() {
      this.mode = this.mode === "basic" ? "scientific" : "basic";
    },

    currentTheme(): ThemeState {
      return this.theme;
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
});
