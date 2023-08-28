<template lang="pug">
.downsize.pt-20.mx-auto
.container.h-72
  .flex.flex-row.justify-around
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
    .justify-between.gap-10
      .relative
       p.absolute.-top-16 server
       p.title.absolute.-top-8 on update
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
.arrow {
  @apply w-12 sm:w-16;
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
</style>
