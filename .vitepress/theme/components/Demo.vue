<template lang="pug">
div(ref="target")
    transition-group(
      enter-active-class="fade-in-slow"
      leave-active-class="fade-out"
      @beforeEnter="fadeIn",
      @beforeLeave="fadeOut",
    )
      Term(
        v-if="targetIsVisible"
        v-for="(item,i) in items"
        :key="i"
        :id="i"
        :index="i"
        :value="item"
      )
      Term(
        v-if="targetIsVisible"
        :key="3"
        :id="2"
        :index="3"
      )
        component(:is="vnode")
    
</template>
<script setup lang="ts">
import { onMounted, ref, useSlots, shallowRef, watchEffect } from "vue";
// Components
import Term from "./Term.vue";
const item = ["pipelight run my_thing", "pipelight logs"];

// Animate
import { useAnimate, watchThrottled, useElementVisibility } from "@vueuse/core";
import type { MaybeElement } from "@vueuse/core";
// Begin animation only when element is visible
const target = ref();
const targetIsVisible = useElementVisibility(target);

// Markdown
import * as useMarkdown from "markdown-it";
import file from "./logs/verbosity_level1.md";
let md = useMarkdown();
const vnode = file.render();
// let result = md.render(file);

const items = ["pipelight run my", "pipelight logs"];
// Watcher
// const n = ref(0);
// const changeValue = (e: boolean) => {
//   if (e) {
//     if (n.value < items.length - 1) {
//       n.value++;
//     } else {
//       n.value = 0;
//     }
//   }
// };
// watchThrottled(
//   playState,
//   () => {
//     changeValue(playState.value == "finished");
//   },
//   { throttle: 1600 }
// );
const fadeIn = (el: any) => {
  const n = 2000 * Number(el.id);
  const delay = n + "ms";
  el.style.animationDelay = delay;
};
const fadeOut = (el: any) => {
  el.style.animationDelay = "0ms";
};
</script>
<style lang="postcss" scoped>
p {
  &.cmd {
    @apply max-w-min;
    @apply whitespace-nowrap;
    overflow: hidden;
  }
}
.cursor {
  @apply whitespace-nowrap inline;
  @apply w-2 my-4;
  @apply bg-gray-200;
  /* animation: blink 800ms step-end infinite;*/
}
@keyframes blink {
  from,
  to {
    background-color: var(--vp-c-text-1);
  }
  50% {
    background-color: transparent;
  }
}
.fixed-size {
  @apply w-full;
}
</style>
