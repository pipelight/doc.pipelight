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
const { draw_pipelines } = useDraw();

import succeeded from "@logs/logs_test_succeeded.json";
import failed from "@logs/logs_test_failed.json";
import running from "@logs/logs_test_running.json";
import aborted from "@logs/logs_test_aborted.json";

const vnode = draw_pipelines(
  [
    // Status
    running,
    succeeded,
    failed,
    aborted
  ],
  Verbosity.Error
);

const lines = [{ cmd: "pipelight logs" }, { vnode: vnode }];
</script>
