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
