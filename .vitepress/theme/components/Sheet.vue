<template lang="pug">
.layout
  slot
</template>

<script setup></script>

<style lang="postcss">
.layout {
  @apply flex flex-col justify-center items-center gap-4;
  @apply 2xl:flex-row;
}
</style>
