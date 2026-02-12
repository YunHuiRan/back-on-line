import { defineStore } from 'pinia'

type CalculatorState =
    | "basic"
    | "scientific";

type ThemeState =
    | "light"
    | "dark";

export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        mode: "basic" as CalculatorState,
        theme: "light" as ThemeState
    }),

    actions: {
        toggleMode() {
            this.mode = this.mode === "basic" ? "scientific" : "basic";
        },

        toggleTheme() {
            this.theme = this.theme === "light" ? "dark" : "light";
        },

        isDarkMode(): boolean {
            return this.theme === "dark";
        }
    }
})