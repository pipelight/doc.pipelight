<template lang="pug">
.layout
  slot
</template>

<script setup></script>

<style lang="postcss" scoped>
.layout {
  @apply flex flex-col justify-center items-center gap-4;
  @apply lg:flex-row;
  @apply py-32;
}
</style>
