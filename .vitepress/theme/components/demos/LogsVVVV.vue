<template lang="pug">
Terminal(
  :lines="lines",
  :animate="false"
).sm
</template>
<script setup lang="ts">
import Terminal from "@components/Terminal.vue";
// Markdown
import useMarkdown from "markdown-it";
import { Verbosity } from "pipelight";

import { useDraw } from "@components/Draw.ts";
const { draw_pipeline } = useDraw();

import json from "@logs/logs_test_running.json";
const vnode = draw_pipeline(json, Verbosity.Trace);

const lines = [{ cmd: "pipelight logs -vvv" }, { vnode: vnode }];
</script>
