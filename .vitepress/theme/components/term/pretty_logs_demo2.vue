<template lang="pug">
Terminal(:lines="lines")
</template>
<script setup lang="ts">
import Terminal from "./Terminal.vue";
// Markdown
import * as useMarkdown from "markdown-it";
import file from "./logs/verbosity_level2.md";
import json from "./logs/logs.json";

import { json_to_html } from "./logs/utils";
const res = json_to_html(json);

const vnode = file.render();
const lines = [
  { cmd: "pipelight run my_test" },
  { cmd: "pipelight logs -vv" },
  { vnode: res }
];
</script>
