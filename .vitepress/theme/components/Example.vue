<template lang="pug">
.vp-doc.custom-code
  slot
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

<style lang="postcss" scoped>
.custom-code {
  @apply flex align-middle items-center;
  @apply flex flex-col align-middle;
}
</style>
