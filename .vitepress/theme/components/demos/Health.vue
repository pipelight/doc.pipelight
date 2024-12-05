<style lang="css" scoped>
.better_line {
  @apply leading-3;
}
</style>
<template lang="pug">
Terminal(
  :lines="lines",
  :animate="true"
).md
</template>
<script setup lang="ts">
import Terminal from "@components/Terminal.vue";
// Markdown
import useMarkdown from "markdown-it";

import { useDraw } from "@components/Draw.ts";
const { draw_string } = useDraw();


const nodes = [
"╭────────────────────────────┬─────────────┬────────────┬─────────────────╮",
"│ name                       │ status      │ branch/tag │ action          │",
"├────────────────────────────┼─────────────┼────────────┼─────────────────┤",
"│ cargo_tests                │ -           │ -          │ -               │",
"│ test                       │ ● Succeeded │ dev        │ Special(Manual) │",
"│ test_attached_pipelines    │ -           │ -          │ -               │",
"│ test_git_hook              │ ● Succeeded │ master     │ Hook(PrePush)   │",
"│ test_long_running_pipeline │ ● Succeeded │ dev        │ Hook(PrePush)   │",
"│ test_parallel_modes        │ -           │ -          │ -               │",
"╰────────────────────────────┴─────────────┴────────────┴─────────────────╯"
];

let res = "";
const lines = [
  { cmd: "p ls -vv" },
  { vnode: draw_string(nodes.join("\n")) }
];
</script>
