<template lang="pug">
.downsize.pt-20.mx-auto
  .grid.grid-cols-3.justify-items-center.gap-4
    .relative
     p.title.absolute.-top-16 read config file and parse pipelines
     .card.exec.relative
        img.icon(src="/images/pipelight.png")
     .card.config.ontop 
        .line(v-for="i in 3" :key="i")
        .line.short
    .grid.grid-rows-2.gap-2
      .relative
        p.title.absolute.-inset-6 spawn subprocess
        ArrowRight.arrow
      .relative
        p.title.absolute.-inset-6 read from subprocess
        ArrowLeft.arrow
    .grid.grid-rows-3.gap-2.relative
     .card.process(v-for="i in 3" :key="i")
        .line
        .line.short
  .grid.grid-cols-3.justify-items-center
    .relative.py-2
      ArrowDown.arrow
      p.title write logs
  .grid.grid-cols-3.justify-items-center
   .card.logs
     .line(v-for="i in 4" :key="i")
     .line.short

</template>
<script setup lang="ts">
import {
  ArrowLongRightIcon as ArrowRight,
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongDownIcon as ArrowDown
} from "@heroicons/vue/24/solid";
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
