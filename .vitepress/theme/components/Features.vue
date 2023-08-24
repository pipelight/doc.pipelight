<template lang="pug">
.my-container
  .feature(
      v-for="item in items",
      :class="{ 'big': !tailwind.md, 'small': tailwind.md }"
    )
    .title {{ item.title }}
    .details {{ item.details }}

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
const items = [
  {
    title: "⚡ Light and Fast",
    details:
      "Written in Rust to be as low level as possible and stick to bare script performances."
  },
  {
    title: "🫦 Pretty Logs",
    details:
      "Easily troubleshoot your scripts with pretty and verbose logs right in your terminal."
  },
  {
    title: "🚦 Automatic Triggers",
    details:
      "Your pipelines are executed in background on some events. You don't leave your editor."
  },
  {
    title: "🤌 Typescript { Bash }",
    details:
      "Enjoy wrapping your Bash with Typescript delicious and simple syntax. Uses Deno for its quick Typechecking."
  }
];
</script>

<style lang="postcss" scoped>
.my-container {
  /* layout */
  @apply flex flex-row flex-wrap justify-center gap-3 py-10;
  @apply transition-all;
}
.feature {
  @apply rounded-lg drop-shadow-md border border-solid;
  @apply bg-white text-gray-800 border-gray-300;
  @apply dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700;
  /* layout */
  @apply flex flex-col;
  @apply p-3 max-w-min;
  min-width: 17rem;
  .title {
    @apply whitespace-nowrap;
    @apply font-bold;
    @apply text-xl;
  }
  .details {
    @apply p-3;
  }
}
</style>
