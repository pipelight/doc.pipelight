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
    title: "🤌 Typescript { Bash }",
    details:
      "Enjoy wrapping your Bash with Typescript delicious and simple synthax."
  },
  {
    title: "🫦 Pretty Logs",
    details:
      "Easily troubleshoot your scripts with pretty and verbose logs right in your terminal."
  },
  {
    title: " 💡 Edit and Test pipelines quickly!",
    details:
      " As long as you know Typescript synthax and a bit of Bash,.. you are good to go."
  },
  {
    title: "🚦 Automatic Trigger",
    details:
      "Trigger your scripts in background on certain events without living your editor or terminal."
  },
  {
    title: " 🏡 Keep it Local",
    details: "Doesn't need you to host your code on big tech hubs"
  },
  {
    title: " 🛠️ Easy Install/Uninstall",
    details: " From source or from your distro repos."
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
  @apply flex flex-col justify-center align-middle;
  @apply rounded-lg;
  @apply bg-gray-800 p-3 m-2 w-1/2;
  .title {
    @apply font-bold;
    @apply text-xl;
  }
  .details {
    @apply p-3;
  }
}
</style>
