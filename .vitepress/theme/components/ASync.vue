<template lang="pug">
.downsize.pt-20.mx-auto
.responsive-container
  .responsive-flex
    .justify-between.gap-10
      .relative
       p.absolute.-top-16 client
       p.title.absolute.-top-8 on pre-push
       .card.exec.relative
          img.icon(src="/images/pipelight.png")
       .card.config.ontop 
          .line(v-for="i in 3" :key="i")
          .line.short
      .grid.grid-rows-2.gap-2.relative.pt-10
        transition-group(
          enter-active-class="fade-in-slow"
          leave-active-class="fade-out"
          @beforeEnter="fadeIn",
          @beforeLeave="fadeOut",
        )
          .card.process(
            v-if="ready"
            v-for="i in 2"
            :key="i"
            :id="i"
          )
            .line
            .line.short
    .flex.flex-col.justify-items-center.align-items-center.h-72.responsive-arrow
      p.title trigger --flag blank
      ArrowRight.arrow.mx-auto
      p.title ssh
    .justify-between
      .relative
       p.absolute.-top-16 server
       p.title.absolute.-top-8 on blank
       .card.exec.relative
          img.icon(src="/images/pipelight.png")
       .card.config.ontop 
          .line(v-for="i in 3" :key="i")
          .line.short
      .grid.grid-rows-2.gap-2.relative.pt-10
        transition-group(
          enter-active-class="fade-in-slow"
          leave-active-class="fade-out"
          @beforeEnter="fadeIn",
          @beforeLeave="fadeOut",
        )
          .card.process(
            v-if="ready"
            v-for="i in 2"
            :key="i"
            :id="i+2"
          )
            .line
            .line.short
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
import {
  ArrowLongRightIcon as ArrowRight,
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongDownIcon as ArrowDown
} from "@heroicons/vue/24/solid";
import { tailwind } from "@utils/breakpoints.ts";
//Props
interface Props {
  animate?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  animate: true
});

// Loop animation every intervall
import { useIntervalFn, promiseTimeout, useTimeout } from "@vueuse/core";

const ready = ref(false);

onMounted(async () => {
  if (props.animate) {
    ready.value = false;
    const loopAnimation = async () => {
      ready.value = true;
      await promiseTimeout(7000);
      ready.value = false;
      await promiseTimeout(100);
      await loopAnimation();
    };
    await loopAnimation();
  } else {
    ready.value = true;
    return;
  }
});
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
.card {
  @apply rounded-lg h-24 w-20;
  @apply relative;
  @apply flex flex-col py-3 pl-2 gap-1;
  .icon {
    @apply absolute inset-0 h-10 rounded-lg;
  }
  &.ontop {
    @apply absolute inset-8;
  }
  &.exec {
    background-color: var(--vp-c-brand);
  }
  &.logs {
    @apply border border-gray-300 dark:border-gray-500;
    .line {
      @apply bg-gray-300 dark:bg-gray-500;
    }
  }
  &.process {
    @apply bg-green-400 dark:bg-green-400;
    @apply h-12;
    .line {
      @apply bg-gray-200 dark:bg-gray-300;
    }
  }
  &.config {
    @apply bg-gray-600 dark:bg-white;
  }
  .line {
    @apply rounded-lg w-16;
    @apply bg-gray-300 dark:bg-gray-400;
    height: 6px;
    &.short {
      @apply w-10 self-start;
    }
  }
}
.arrow {
  @apply w-10 sm:w-16;
}
p {
  @apply m-0;
  &.title {
    @apply text-center;
    @apply text-xs;
  }
}
.downsize {
  @apply md:w-2/3;
}
.responsive-arrow {
  @apply w-20 md:w-32;
}
.responsive-container {
  @apply h-72;
}
.responsive-flex {
  @apply flex flex-row justify-around;
}
</style>
