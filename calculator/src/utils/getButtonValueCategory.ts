type ButtonCategory = "regular" | "function" | "advanced" | "equal";

export const BUTTON_VALUE_CATEGORIES = {
  number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00"],
  regular: ["%", "÷", "X", "-", "+"],
  dot: ["."],
  delete: ["del"],
  ac: ["ac"],
  radian: ["rad"],
  degree: ["deg"],
  brackets: ["(", ")"],
  advance: [
    "sin",
    "cos",
    "tan",
    "log",
    "ln",
    "inv",
    "!",
    "^",
    "root",
    "Π",
    "e",
  ],
  equal: ["="],
} as const;

const CATEGORY_MAP = Object.entries(BUTTON_VALUE_CATEGORIES).map(
  ([key, value]) => [key, new Set(value)],
) as [ButtonCategory, Set<string>][];

export function getButtonValueCategory(value: string): ButtonCategory {
  for (const [category, set] of CATEGORY_MAP) {
    if (set.has(value)) {
      return category;
    }
  }
  return "regular";
}
