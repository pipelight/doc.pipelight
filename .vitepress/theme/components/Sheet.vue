<template lang="pug">
.layout
  slot
</template>

<script setup></script>

<style lang="postcss" scoped>
.layout {
  @apply flex flex-col;
  @apply md:flex-row;
  @apply justify-center items-center gap-4;
  @apply px-4 py-24;
}
</style>
