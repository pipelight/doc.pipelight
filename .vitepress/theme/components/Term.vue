<template lang="pug">
div(ref="target")
  .language-sh
    pre.shiki.material-theme-palenight.whitespace-nowrap.w-64
      span.line.flex
        p.prompt $
        transition(
          enter-active-class="fade-in-slow"
          leave-active-class="fade-out"
        )
          .flex
            p.cmd(
              v-if="targetIsVisible"
              ref="source"
            ) {{ props.value }}
            .cursor
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, shallowRef, watchEffect } from "vue";
import {
  useElementVisibility,
  useTransition,
  useAnimate,
  TransitionPresets,
  watchThrottled
} from "@vueuse/core";
import type { MaybeElement } from "@vueuse/core";

//Props
const props = defineProps<{
  value: string;
}>();

// Animation
const target = ref();
const targetIsVisible = useElementVisibility(target);

const typing = ref([{ width: "0" }, { width: "100%" }]);
const blink = [{ class: "full" }, { class: "empty" }];

const source = shallowRef<MaybeElement>();
const cursor = shallowRef<MaybeElement>();
const { playState } = useAnimate(source, typing, {
  duration: 1200,
  easing: "steps(22,end)"
});

//Emits
const emit = defineEmits<{
  (e: "finished", value: boolean): void;
}>();

watchThrottled(
  playState,
  () => emit("finished", playState.value == "finished"),
  { throttle: 1600 }
);

const fadeIn = (el: any) => {
  const n = 25 * Number(el.id);
  const delay = n + "ms";
  el.style.animationDelay = delay;
};
const fadeOut = (el: any) => {
  el.style.animationDelay = "0ms";
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
  &.cursor {
    @apply whitespace-nowrap inline;
    @apply w-2 my-4;
    @apply bg-gray-200;
    /* animation: blink 800ms step-end infinite;*/
  }
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
