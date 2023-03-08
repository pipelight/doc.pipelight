<template lang="pug">
.custom-code
  slot.my-width
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { ref } from "vue";
const breakpoints = useBreakpoints(breakpointsTailwind);
const tailwind = ref({
  xs: breakpoints.smaller("sm"),
  sm: breakpoints.greaterOrEqual("sm"),
  md: breakpoints.greaterOrEqual("md"),
  lg: breakpoints.greaterOrEqual("lg")
});
</script>

<style lang="postcss">
.custom-code {
  @apply flex justify-center align-middle items-center;
  @apply flex flex-col justify-center align-middle;
  .language-ts,
  .language-sh {
    @apply rounded-lg !important;
  }
}
</style>
