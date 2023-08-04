<template lang="pug">
.layout
  slot
</template>

<style lang="postcss" scoped>
.layout {
  @apply flex flex-col;
  @apply md:flex-row;
  @apply justify-center items-center gap-4;
  @apply py-24;
  @apply min-w-full;
}
</style>
