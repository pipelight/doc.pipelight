<template lang="pug">
.fixed-height(ref="target")
  Term(@finished="changeValue", :value="items[n]" :key="n")
  component(:is="vnode")
  
</template>
<script setup lang="ts">
import Term from "./Term.vue";
import * as useMarkdown from "markdown-it";
import file from "./logs/verbosity_level1.md";

import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

const target = ref();
const targetIsVisible = useElementVisibility(target);

let md = useMarkdown();
console.log(file.render());
const vnode = file.render();
// let result = md.render(file);

const items = ["pipelight run my", "pipelight logs"];

const n = ref(0);
const changeValue = (e: boolean) => {
  if (e) {
    if (n.value < items.length - 1) {
      n.value++;
    } else {
      n.value = 0;
    }
  }
};
</script>

<style lang="postcss" scoped>
p {
  &.prompt {
    @apply whitespace-nowrap inline;
    @apply px-2;
  }
  &.cmd {
    @apply max-w-min;
    @apply whitespace-nowrap;
    overflow: hidden;
  }
}
div {
  &.fixed-height {
    @apply h-24;
  }
}
</style>
