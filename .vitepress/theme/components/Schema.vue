<template lang="pug">
.flex.flex-row.gap-20
  .flex.relative
   .card.exec
   .card.config.ontop 
      .line(v-for="i in 3" :key="i")
      .line.short
  .flex.flex-col.relative.gap-2
   .card.process(v-for="i in 3" :key="i")
      .line
      .line.short
.flex.flex-row.gap-20
  .flex.flex-col
   .card.logs
     .line(v-for="i in 3" :key="i")
     .line.short

</template>
<script setup lang="ts"></script>
<style lang="postcss" scoped>
.card {
  @apply rounded-lg h-24 w-20;
  @apply relative;
  @apply flex flex-col py-3 pl-2 gap-1;
  &.ontop {
    @apply absolute inset-6;
  }
  &.exec {
    @apply bg-blue-400;
  }
  &.logs {
    @apply border-2 border-gray-300 dark:border-gray-400;
  }
  &.process {
    @apply bg-green-400 dark:bg-green-500;
    @apply h-12;
  }
  &.config {
    @apply bg-purple-500;
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
</style>
