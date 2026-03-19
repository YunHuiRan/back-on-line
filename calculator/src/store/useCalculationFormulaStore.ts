import { defineStore } from "pinia";

type dataTypes =
  | "number"
  | "operator"
  | "function"
  | "modifier"
  | "action"
  | "mode";

export const useCalculationFormulaStore = defineStore("calculationFormula", {
  state: () => ({
    rawString: "" as string,
  }),

  actions: {
    addToRawString(value: String, type: dataTypes): void {
      this.rawString += value;
      console.log(value, type);
    },

    // ac
    allClear(): void {
      this.rawString = "";
    },
  },
});
