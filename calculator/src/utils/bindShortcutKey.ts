import { onKeyStroke } from "@vueuse/core";
import { useCalculationFormulaStore } from "@/store/useCalculationFormulaStore";

export function bindShortcutKey() {
  const calculationStore = useCalculationFormulaStore();
  const { addToRawString, deleteLast, clear, evaluate } = calculationStore;

  onKeyStroke(
    [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      "Escape",
      "Enter",
    ],
    (e) => {
      e.preventDefault();

      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          addToRawString(e.key, "number");
          break;

        case "Backspace":
          deleteLast();
          break;

        case "Escape":
          clear();
          break;

        case "Enter":
          evaluate();
          break;
      }
    },
  );
}
