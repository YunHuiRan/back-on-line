/**
 * RegularButtonDef represents a simple numeric/operator button used in the
 * calculator's regular (non-advanced) mode.
 */
export type RegularButtonDef = {
  value: string;
  type: string;
  class: string;
  label?: string;
};

export const buttons: RegularButtonDef[] = [
  { value: "ac", type: "action", class: "ac-button" },
  { value: "del", type: "action", class: "del-button" },
  { value: "%", type: "operator", class: "basic-operation-button" },
  { value: "÷", type: "operator", class: "basic-operation-button" },
  { value: "7", type: "number", class: "number-button" },
  { value: "8", type: "number", class: "number-button" },
  { value: "9", type: "number", class: "number-button" },
  { value: "×", type: "operator", class: "basic-operation-button" },
  { value: "4", type: "number", class: "number-button" },
  { value: "5", type: "number", class: "number-button" },
  { value: "6", type: "number", class: "number-button" },
  { value: "-", type: "operator", class: "basic-operation-button" },
  { value: "1", type: "number", class: "number-button" },
  { value: "2", type: "number", class: "number-button" },
  { value: "3", type: "number", class: "number-button" },
  { value: "+", type: "operator", class: "basic-operation-button" },
  { value: "00", type: "number", class: "number-button" },
  { value: "0", type: "number", class: "number-button" },
  { value: ".", type: "number", class: "dot-button" },
  { value: "=", type: "equal", class: "equal-button" },
];
