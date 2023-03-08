<template lang="pug">
.my-layout
  p Makes Bash scripting more fun by wrapping it into Typescript..
.layout
  slot
</template>

<script setup></script>

<style lang="postcss" scoped>
.my-layout {
  @apply flex justify-center items-center text-center gap-4;
}
.layout {
  @apply flex flex-col justify-center items-center text-center gap-4;
  @apply lg:flex-row;
  @apply py-10;
}
</style>
