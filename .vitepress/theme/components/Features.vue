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
    title: "🛠️ Lightweight and Easy to Install",
    details: "Has a very low footprint, with no minimal hardware requirements."
  },
  {
    title: "Intuitive commands and configuration.",
    details:
      "Sticks to the actual pipeline paradigm with a practical command line interface(cli). Nothing new if you've already use Drone.io, GitlabCICD or GiteaCICD"
  },
  {
    title: "🫦 Pretty Logs",
    details:
      "Easily troubleshoot your scripts with pretty and verbose logs right in your terminal."
  },
  {
    title: "⚡ Blazing Fast",
    details:
      "Written in Rust to be as low level as possible and stick to bare script performances."
  },
  {
    title: "🚦 Automatic Trigger",
    details:
      "Your pipelines are executed in background on some events. You don't leave your editor."
  },
  {
    title: "🤌 Typescript { Bash }",
    details:
      "Enjoy wrapping your Bash with Typescript delicious and simple synthax. Uses Deno for its quick Typechecking."
  },
  {
    title: "Free and Open-source",
    details:
      "Because many of other tools are cloud based or freemium, some need not to be."
  }
];
</script>

<style lang="postcss" scoped>
.my-container {
  @apply flex flex-wrap flex-col sm:flex-row align-middle;
  @apply py-4;
}
.feature {
  &.big {
    @apply justify-center;
    min-width: 90%;
    max-width: 90%;
  }
  &.small {
    min-width: 40%;
    max-width: 40%;
  }
  @apply flex flex-col justify-center align-middle transition-all;
  @apply rounded-lg drop-shadow-md p-3 m-2 w-1/2 border border-solid;
  @apply bg-white text-gray-800 border-gray-300;
  @apply dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700;
  @apply hover:scale-105;
  .title {
    @apply font-bold;
    @apply text-xl;
  }
  .details {
    @apply p-3;
  }
}
</style>
