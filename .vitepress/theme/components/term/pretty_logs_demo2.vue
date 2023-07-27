<template lang="pug">
Terminal(:lines="lines").sm
</template>
<script setup lang="ts">
import Terminal from "./Terminal.vue";
// Markdown
import * as useMarkdown from "markdown-it";
import json from "./logs/logs.json";
import { Verbosity } from "pipelight";

import { json_to_html } from "./logs/utils";
const res = json_to_html(json, Verbosity.Error);

const lines = [
  { cmd: "pipelight run my_test" },
  { cmd: "pipelight logs -vv" },
  { vnode: res }
];
</script>
