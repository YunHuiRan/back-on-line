import { defineStore } from "pinia";

type numberTypes =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "00"
  | "dot"
  | "pi";
type actionTypes = "allclear" | "delete";
type operatorTypes =
  | "plus"
  | "minus"
  | "multiply"
  | "divide"
  | "power"
  | "modulo";
type functionTypes =
  | "sin"
  | "cos"
  | "tan"
  | "log"
  | "ln"
  | "arcsin"
  | "arccos"
  | "arctan"
  | "10^x"
  | "e^x"
  | "factorial"
  | "root";
type groupTypes = "(" | ")";
type constantsTypes = "pi";

type dataTypes =
  | numberTypes
  | actionTypes
  | operatorTypes
  | functionTypes
  | groupTypes
  | constantsTypes;

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
