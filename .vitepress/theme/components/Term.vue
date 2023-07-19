<template lang="pug">
div
  .language-sh
    pre.shiki.material-theme-palenight.whitespace-nowrap
      span.line.flex
            slot
            .flex
              p.prompt $
              transition(
                enter-active-class="fade-in-slow"
                leave-active-class="fade-out"
                @before-enter="fadeIn"
                @before-leave="fadeOut"
                appear
              )
                p.cmd(
                  v-if="!!props.value"
                  :id="props.index"
                ) {{ props.value }}
              .cursor(
                  v-if="!!props.value"
              )
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, shallowRef, watchEffect } from "vue";
import {
  useTransition,
  useAnimate,
  TransitionPresets,
  watchThrottled
} from "@vueuse/core";
import type { MaybeElement } from "@vueuse/core";

//Props
const props = defineProps<{
  value?: string;
  index?: number;
}>();

// Emits
const emit = defineEmits<{
  (e: "finished", value: boolean): void;
}>();

const fadeIn = (el: any) => {
  const n = 2000 * Number(el.id);
  const delay = n + "ms";
  el.style.animationDelay = delay;
  console.log(el.style);
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
    animation: typing 1200ms steps(22, end);
  }
}
.cursor {
  @apply whitespace-nowrap inline;
  @apply w-2 my-4;
  @apply bg-gray-200;
  /* animation: blink 800ms step-end infinite;*/
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
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
