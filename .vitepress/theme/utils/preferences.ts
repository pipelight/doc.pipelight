import { ref } from "vue";
import { useStorage } from "@vueuse/core";

const api = ref({
  compositions: useStorage("compositions", false)
});

export { api };
