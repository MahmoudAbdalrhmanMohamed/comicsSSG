// stores/thinkStore.js
import { defineStore } from "pinia";

export const useThinkStore = defineStore("thinkStore", {
  state: () => ({
    header: "",
    content: "",
    show: false,
  }),
  actions: {
    setData(header, content) {
      this.header = header;
      this.content = content;
    },
    setShow(show) {
      this.show = show;
    },
   
  },
});
