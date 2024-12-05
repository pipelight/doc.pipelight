<template lang="pug">
.container
  slot
</template>

<style lang="postcss" scoped>
.container {
  &.sm {
    @apply py-8;
  }
  @apply flex flex-col;
  @apply lg:flex-row;
  @apply justify-center items-center gap-4;
  @apply py-12;
  @apply min-w-full;
}
</style>
