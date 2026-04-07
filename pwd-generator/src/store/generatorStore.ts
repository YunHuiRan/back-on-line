import { defineStore } from "pinia";

export const useGeneratorStore = defineStore("generator", {
  state: () => {
    return {
      length: 0 as number,
      includeUppercase: false as boolean,
      includeLowercase: false as boolean,
      includeNumbers: false as boolean,
      includeSymbols: false as boolean,
    };
  },
});
