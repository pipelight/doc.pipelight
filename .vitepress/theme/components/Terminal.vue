<template lang="pug">
.terminal.language-sh(ref="target")
  pre.shiki
    .skeleton
      Line(
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
    .content
      transition-group(
        enter-active-class="fade-in-slow"
        leave-active-class="fade-out"
        @beforeEnter="fadeIn",
        @beforeLeave="fadeOut",
      )
        Line(
          v-if="ready"
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
import {
  onMounted,
  ref,
  useSlots,
  shallowRef,
  watchEffect,
  computed
} from "vue";
// Components
import Line from "@components/Line.vue";
//Props
interface line {
  cmd?: string;
  vnode?: string;
}
interface Props {
  lines: line[];
  animate?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  animate: true
});

// Animate
import { watchThrottled, useElementVisibility } from "@vueuse/core";
import type { MaybeElement } from "@vueuse/core";
// Begin animation only when element is visible
const target = ref();
const targetIsVisible = useElementVisibility(target);

// Loop animation every intervall
import { useIntervalFn, promiseTimeout, useTimeout } from "@vueuse/core";

const ready = ref(false);

onMounted(async () => {
  if (props.animate) {
    ready.value = false;
    const loopAnimation = async () => {
      ready.value = true;
      await promiseTimeout(6000);
      ready.value = false;
      await promiseTimeout(200);
      await loopAnimation();
    };
    await loopAnimation();
  } else {
    ready.value = true;
    return;
  }
});

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
    /* overflow: hidden; */
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
.content {
  @apply absolute top-0 z-10;
  @apply w-full;
}
.skeleton {
  @apply opacity-0 z-0;
}
pre {
  @apply relative p-0 !important;
}
</style>
