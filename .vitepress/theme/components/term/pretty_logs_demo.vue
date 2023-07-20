<template lang="pug">
Terminal(:lines="lines")
</template>
<script setup lang="ts">
import Terminal from "./Terminal.vue";
// Markdown
import * as useMarkdown from "markdown-it";
import file from "./logs/verbosity_level1.md";

const vnode = file.render();
const lines = [
  { cmd: "pipelight run my_test" },
  { cmd: "pipelight logs" },
  { vnode: vnode }
];
</script>
