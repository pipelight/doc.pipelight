<template lang="pug">
.container.max-w-min.mx-auto.py-10
  .flex.flex-row.gap-20.items-center
    .flex.relative
     p.absolute.title.w-26.-top-16 read config file and parse pipelines
     .card.exec.relative
        img.icon(src="/images/pipelight.png")
     .card.config.ontop 
        .line(v-for="i in 3" :key="i")
        .line.short
    .flex.flex-row.items-center
      div
        div.py-2
          p.title spawn subprocess
          p.arrow 🠒
        div.py-2
          p.title read from subprocess
          p.arrow 🠐 
    .flex.flex-col.relative.gap-2
     .card.process(v-for="i in 3" :key="i")
        .line
        .line.short
  .flex.flex-row.pt-8
    .flex.flex-col
      .flex.h-24.py-2.items-center
        p.arrow 🠓
        p.title write logs
  .flex.flex-row.pt-6
    .flex.flex-col
     .card.logs
       .line(v-for="i in 4" :key="i")
       .line.short

</template>
<script setup lang="ts"></script>
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
p {
  @apply m-0;
  &.arrow {
    font-size: 100px;
    line-height: 2px;
    @apply block;
  }
  &.title {
    @apply text-center;
    font-size: 12px;
    line-height: 12px;
    @apply py-4;
  }
}
</style>
