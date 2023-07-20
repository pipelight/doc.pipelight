<template lang="pug">
div(ref="target")
  .language-sh.terminal.px-8
    pre.shiki.material-theme-palenight.whitespace-nowrap
      span.line
        transition-group(
          enter-active-class="fade-in-slow"
          leave-active-class="fade-out"
          @beforeEnter="fadeIn",
          @beforeLeave="fadeOut",
        )
          Line(
            v-if="targetIsVisible"
            v-for="(line,i) in props.lines"
            :key="i"
            :id="i"
            :index="i"
            :value="line.cmd"
          )
            component(
              v-if="!!line.vnode"
              :is="line.vnode"
            )
    
</template>
<script setup lang="ts">
import { onMounted, ref, useSlots, shallowRef, watchEffect } from "vue";
// Components
import Line from "./Line.vue";
//Props
interface line {
  cmd?: string;
  vnode?: string;
}
const props = defineProps<{
  lines: line[];
}>();

// Animate
import { useAnimate, watchThrottled, useElementVisibility } from "@vueuse/core";
import type { MaybeElement } from "@vueuse/core";
// Begin animation only when element is visible
const target = ref();
const targetIsVisible = useElementVisibility(target);

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
  const n = 1200 * Number(el.id);
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
</style>
