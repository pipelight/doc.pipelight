<template lang="pug">
.layout
  slot
</template>

<script setup></script>

<style lang="postcss" scoped>
.layout {
  @apply flex flex-col justify-center items-center gap-4;
  @apply md:flex-row;
  @apply px-4 py-32;
}
</style>
