<template lang="pug">
.flex(:class="{ line : !!props.value}")
  transition-group(
    enter-active-class="fade-in-slow"
    leave-active-class="fade-out"
    appear
  )
    p.prompt(
      v-if="!!props.value"
    ) [g@ku ~] 

  transition-group(
    enter-active-class="fade-in-slow"
    leave-active-class="fade-out"
    @before-enter="fadeIn"
    @before-leave="fadeOut"
    appear
  )
    slot
      p.cmd(
      :id="!!props.value ? props.index + 1 : props.index"
        v-if="!!props.value"
      ) {{ props.value }}
  transition-group(
    enter-active-class="fade-in-slow"
    leave-active-class="fade-out"
    @before-enter="fadeIn"
    @before-leave="fadeOut"
    appear
  )
    .cursor(
      :id="props.index + 1"
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

const fadeIn = (el: any, done: any) => {
  const n = 800 * Number(el.id);
  const delay = n + "ms";
  el.style.animationDelay = delay;
};
const fadeOut = (el: any, done: any) => {
  el.style.animationDelay = "0ms";
};
</script>

<style lang="postcss" scoped>
p {
  &.prompt {
    @apply whitespace-nowrap inline;
    @apply pr-2;
    @apply text-green-400;
    @apply dark:text-green-300;
    animation-fill-mode: both;
  }
  &.cmd {
    @apply max-w-min;
    @apply break-all;
    overflow: hidden;
    animation: typing 1000ms steps(22, end);
    animation-fill-mode: both;
  }
}
div {
  .cursor {
    @apply whitespace-nowrap inline;
    @apply w-2 h-6;
    animation: blink 1500ms step-end;
    /* animation: blink 800ms step-end infinite;*/
  }
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
