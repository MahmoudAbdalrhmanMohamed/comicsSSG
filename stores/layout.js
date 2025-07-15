import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    lay: "",
  }),
  actions: {
    setData(lay) {
      this.lay = lay;
    },
  },
});
