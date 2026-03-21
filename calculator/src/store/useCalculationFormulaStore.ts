import { defineStore } from "pinia";

export type AngleUnit = "rad" | "deg";

export const useCalculationFormulaStore = defineStore("calculationFormula", {
  state: () => ({
    rawString: "",
    lastExpression: "",
    lastResult: null as number | null,
    angleUnit: "deg" as AngleUnit,
    isInverseMode: false,
  }),

  actions: {
    clear() {
      this.rawString = "";
      this.lastExpression = "";
      this.lastResult = null;
    },

    deleteLast() {
      if (!this.rawString) return;
      // if display shows an error or NaN or division-by-zero message, clear entirely
      const specialDisplays = new Set(["NaN", "Error", "0不能为除数"]);
      if (specialDisplays.has(this.rawString)) {
        this.clear();
        return;
      }
      // if the string ends with a function token like 'arcsin(' or '10^(', remove whole token
      const functionTokens = [
        "arcsin(",
        "arccos(",
        "arctan(",
        "asin(",
        "acos(",
        "atan(",
        "sin(",
        "cos(",
        "tan(",
        "log(",
        "ln(",
        "10^(",
        "e^(",
        "root(",
      ];

      // try longest matches first
      functionTokens.sort((a, b) => b.length - a.length);
      for (const tok of functionTokens) {
        if (this.rawString.endsWith(tok)) {
          this.rawString = this.rawString.slice(0, -tok.length);
          return;
        }
      }

      // default: delete single char
      this.rawString = this.rawString.slice(0, -1);
    },

    addToRawString(value: string, type: string) {
      // handle mode and modifier specially
      if (type === "mode") {
        // value is 'rad' or 'deg'
        this.toggleAngleUnit(value as AngleUnit);
        return;
      }

      if (type === "modifier" && value === "inv") {
        this.toggleInverseMode();
        return;
      }

      if (type === "action") {
        if (value === "ac") this.clear();
        if (value === "del") this.deleteLast();
        return;
      }

      if (type === "equal" || value === "=") {
        this.evaluate();
        return;
      }

      // if current display is a special error, start fresh when typing numbers
      const specialDisplays = new Set(["NaN", "Error", "0不能为除数"]);
      if (specialDisplays.has(this.rawString)) {
        this.clear();
      }

      // default append behavior
      const isNumberButton =
        type === "number" ||
        /(^\d+$)/.test(value) ||
        value === "00" ||
        value === ".";

      // insert functions with opening parenthesis
      const functionsWithParen = new Set([
        "sin",
        "cos",
        "tan",
        "arcsin",
        "arccos",
        "arctan",
        "log",
        "ln",
        "10^x",
        "e^x",
        "root",
      ]);

      if (functionsWithParen.has(value)) {
        // map display values to token forms
        if (value === "10^x") {
          this.rawString += "10^(";
        } else if (value === "e^x") {
          this.rawString += "e^(";
        } else if (value === "root") {
          this.rawString += "root(";
        } else {
          this.rawString += `${value}(`;
        }
        return;
      }

      // handle numeric input to avoid multiple leading zeros like 0000
      if (isNumberButton) {
        // find last continuous number token
        const m = this.rawString.match(/([0-9.]+)$/);
        const lastNum = m ? m[1] : null;

        // if there is no current number token and user pressed "00", treat as single "0"
        if (!lastNum && value === "00") {
          this.rawString += "0";
          return;
        }

        if (lastNum) {
          // if lastNum is only zeros (no dot) then prevent appending more zeros
          if (!lastNum.includes(".") && /^0+$/.test(lastNum)) {
            if (value === ".") {
              this.rawString += ".";
              return;
            }

            if (/^0+$/.test(value) || value === "00") {
              // keep a single zero
              this.rawString = this.rawString.replace(/0+$/g, "0");
              return;
            }

            // digit non-zero: replace leading zeros with the new digit
            if (/^\d+$/.test(value)) {
              this.rawString = this.rawString.replace(/0+$/g, "") + value;
              return;
            }
          }
        }

        // normal append for number/dot when not special-cased
        this.rawString += value;
        return;
      }

      // groups, operators, constants, etc.
      this.rawString += value;
    },

    toggleAngleUnit(newUnit: AngleUnit) {
      if (this.angleUnit === newUnit) return;
      this.angleUnit = newUnit;
      // if we have a lastExpression, recompute with new unit
      if (this.lastExpression) {
        this.evaluateExpression(this.lastExpression);
      }
    },

    toggleInverseMode() {
      this.isInverseMode = !this.isInverseMode;
      // inverse mode changes which functions are used when inserting — no immediate recompute
    },

    evaluate() {
      // auto-complete parentheses
      const expr = this.rawString;
      const open = (expr.match(/\(/g) || []).length;
      const close = (expr.match(/\)/g) || []).length;
      const missing = open - close;
      const completed = missing > 0 ? expr + ")".repeat(missing) : expr;

      this.lastExpression = completed;
      this.evaluateExpression(completed);
    },

    evaluateExpression(expression: string) {
      try {
        let expr = expression;

        // normalize tokens
        expr = expr.replace(/×|X/g, "*");
        expr = expr.replace(/÷/g, "/");
        expr = expr.replace(/\^/g, "**");
        expr = expr.replace(/Π/g, "(Math.PI)");
        // keep e as Math.E only when standalone or followed by non-letter
        expr = expr.replace(/(^|[^a-zA-Z])e(?![a-zA-Z])/g, "$1(Math.E)");

        // replace factorial postfix like 5! or (... )!
        // iteratively replace simple patterns until none left
        const factRe = /(\d+\.?\d*|\([^()]*\))!/;
        while (factRe.test(expr)) {
          expr = expr.replace(factRe, "fact($1)");
        }

        // map function names to helper names
        expr = expr.replace(/\bsin\(/g, "_sin(");
        expr = expr.replace(/\bcos\(/g, "_cos(");
        expr = expr.replace(/\btan\(/g, "_tan(");
        expr = expr.replace(/\barcsin\(/g, "_asin(");
        expr = expr.replace(/\barccos\(/g, "_acos(");
        expr = expr.replace(/\barctan\(/g, "_atan(");
        expr = expr.replace(/\blog\(/g, "_log10(");
        expr = expr.replace(/\bln\(/g, "Math.log(");
        expr = expr.replace(/root\(/g, "Math.sqrt(");

        // 10^(x) already converted when inserted

        // create helpers
        const angleUnit = this.angleUnit;
        const helpers = {
          _sin: (x: number) =>
            Math.sin(angleUnit === "deg" ? (x * Math.PI) / 180 : x),
          _cos: (x: number) =>
            Math.cos(angleUnit === "deg" ? (x * Math.PI) / 180 : x),
          _tan: (x: number) =>
            Math.tan(angleUnit === "deg" ? (x * Math.PI) / 180 : x),
          _asin: (x: number) => {
            const v = Math.asin(x);
            return angleUnit === "deg" ? (v * 180) / Math.PI : v;
          },
          _acos: (x: number) => {
            const v = Math.acos(x);
            return angleUnit === "deg" ? (v * 180) / Math.PI : v;
          },
          _atan: (x: number) => {
            const v = Math.atan(x);
            return angleUnit === "deg" ? (v * 180) / Math.PI : v;
          },
          _log10: (x: number) =>
            Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10,
          fact: (n: number) => {
            const nn = Math.floor(n);
            if (nn < 0) return NaN;
            let r = 1;
            for (let i = 2; i <= nn; i++) r *= i;
            return r;
          },
        } as const;

        // evaluate in Function with helpers injected
        const fn = new Function(
          ...Object.keys(helpers),
          "Math",
          `return (${expr});`,
        );
        const result = fn(...Object.values(helpers), Math);

        // detect division by zero (Infinity) and show localized message
        if (result === Infinity || result === -Infinity) {
          this.rawString = "0不能为除数";
          this.lastResult = null;
          return;
        }

        const numeric =
          typeof result === "number" && isFinite(result) ? result : NaN;
        this.lastResult = numeric as number;
        // show result in rawString for now
        this.rawString = String(numeric);
      } catch (e) {
        this.rawString = "Error";
        this.lastResult = null;
      }
    },
  },
});
