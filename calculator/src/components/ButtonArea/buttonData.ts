export type ButtonDef = {
  key: string;
  value: string;
  altValue?: string;
  type: string;
  class: string;
  slider?: boolean;
  left?: string;
  leftHtml?: string;
  right?: string;
  rightHtml?: string;
  display?: string;
  label?: string;
  onClickType?: "toggleAngleUnit" | "toggleInverseMode";
  onClickParam?: string;
  shiftWith?: "inverse" | "angle";
  shiftParam?: string;
  shiftDirection?: "left" | "right";
};

export const buttons: ButtonDef[] = [
  {
    key: "sin",
    value: "sin",
    altValue: "arcsin",
    type: "function",
    class: "advance-operation-button",
    slider: true,
    left: "sin",
    right: "arcsin",
    shiftWith: "inverse",
  },
  {
    key: "cos",
    value: "cos",
    altValue: "arccos",
    type: "function",
    class: "advance-operation-button",
    slider: true,
    left: "cos",
    right: "arccos",
    shiftWith: "inverse",
  },
  {
    key: "tan",
    value: "tan",
    altValue: "arctan",
    type: "function",
    class: "advance-operation-button",
    slider: true,
    left: "tan",
    right: "arctan",
    shiftWith: "inverse",
  },
  {
    key: "rad",
    value: "rad",
    type: "mode",
    class: "advance-operation-button",
    slider: true,
    left: "rad",
    rightHtml: '<span class="selected-angle-unit-button">rad</span>',
    onClickType: "toggleAngleUnit",
    onClickParam: "rad",
    shiftWith: "angle",
    shiftParam: "rad",
    shiftDirection: "left",
  },
  {
    key: "deg",
    value: "deg",
    type: "mode",
    class: "advance-operation-button deg-slider",
    slider: true,
    leftHtml: '<span class="selected-angle-unit-button">deg</span>',
    right: "deg",
    onClickType: "toggleAngleUnit",
    onClickParam: "deg",
    shiftWith: "angle",
    shiftParam: "deg",
    shiftDirection: "right",
  },
  {
    key: "log",
    value: "log",
    altValue: "10^x",
    type: "function",
    class: "advance-operation-button",
    slider: true,
    left: "log",
    rightHtml: "10<sup>^</sup>",
    shiftWith: "inverse",
  },
  {
    key: "ln",
    value: "ln",
    altValue: "e^x",
    type: "function",
    class: "advance-operation-button",
    slider: true,
    left: "ln",
    rightHtml: "e<sup>x</sup>",
    shiftWith: "inverse",
  },
  { key: "(", value: "(", type: "group", class: "advance-operation-button" },
  { key: ")", value: ")", type: "group", class: "advance-operation-button" },
  {
    key: "inv",
    value: "inv",
    type: "modifier",
    class: "advance-operation-button",
    slider: true,
    left: "inv",
    right: "inv",
    onClickType: "toggleInverseMode",
    shiftWith: "inverse",
  },
  { key: "!", value: "!", type: "function", class: "advance-operation-button" },
  { key: "ac", value: "ac", type: "action", class: "ac-button" },
  { key: "del", value: "del", type: "action", class: "del-button" },
  { key: "%", value: "%", type: "operator", class: "basic-operation-button" },
  { key: "÷", value: "÷", type: "operator", class: "basic-operation-button" },
  { key: "^", value: "^", type: "operator", class: "advance-operation-button" },
  { key: "7", value: "7", type: "number", class: "number-button" },
  { key: "8", value: "8", type: "number", class: "number-button" },
  { key: "9", value: "9", type: "number", class: "number-button" },
  { key: "×", value: "×", type: "operator", class: "basic-operation-button" },
  {
    key: "root",
    value: "root",
    type: "function",
    class: "advance-operation-button",
    display: "√",
  },
  { key: "4", value: "4", type: "number", class: "number-button" },
  { key: "5", value: "5", type: "number", class: "number-button" },
  { key: "6", value: "6", type: "number", class: "number-button" },
  { key: "-", value: "-", type: "operator", class: "basic-operation-button" },
  {
    key: "PI",
    value: "Π",
    type: "constant",
    class: "advance-operation-button",
  },
  { key: "1", value: "1", type: "number", class: "number-button" },
  { key: "2", value: "2", type: "number", class: "number-button" },
  { key: "3", value: "3", type: "number", class: "number-button" },
  { key: "+", value: "+", type: "operator", class: "basic-operation-button" },
  { key: "e", value: "e", type: "constant", class: "advance-operation-button" },
  { key: "0", value: "0", type: "number", class: "number-button" },
  { key: "00", value: "00", type: "number", class: "number-button" },
  // note: preserve original typo for data-type
  { key: ".", value: ".", type: "numbrer", class: "dot-button" },
  { key: "=", value: "=", type: "equal", class: "equal-button" },
];
