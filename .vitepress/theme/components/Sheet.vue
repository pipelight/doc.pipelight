<template lang="pug">
.container
  slot
</template>

<style lang="postcss" scoped>
.container {
  &.sm {
    @apply py-10;
  }
  @apply flex flex-col;
  @apply md:flex-row;
  @apply justify-center items-center gap-4;
  @apply py-24;
  @apply min-w-full;
}
</style>
