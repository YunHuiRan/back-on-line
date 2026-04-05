import { defineStore } from "pinia";

export const useGeneratorStore = defineStore("generator", {
  state: () => {
    return {
      length: 0 as number,
    };
  },
});
