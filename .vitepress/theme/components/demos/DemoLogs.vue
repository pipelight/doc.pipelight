<template lang="pug">
Terminal(:lines="lines")
</template>
<script setup lang="ts">
import Terminal from "@components/Terminal.vue";
// Markdown
import useMarkdown from "markdown-it";
import json from "@logs/logs.json";
import { Verbosity } from "pipelight";

import { useDraw } from "@components/Draw.ts";
const { draw_pipeline } = useDraw();
const vnode = draw_pipeline(json, Verbosity.Error);

const lines = [
  { cmd: "pipelight run my_test" },
  { cmd: "pipelight logs" },
  { vnode: vnode }
];
</script>
