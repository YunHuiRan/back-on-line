import { defineStore } from "pinia";
import { getButtonValueCategory } from "@/utils/getButtonValueCategory";

export const useCalculationFormulaStore = defineStore("calculationFormula", {
  state: () => ({
    rawString: "" as string,
  }),

  actions: {
    addToRawString(char: String): void {
      this.rawString += char;
    },

    // ac
    allClear(): void {
      this.rawString = "";
    },
  },
});
