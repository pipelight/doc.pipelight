<template lang="pug">
Terminal(:lines="lines").md
</template>
<script setup lang="ts">
import Terminal from "@components/Terminal.vue";
// Markdown
import useMarkdown from "markdown-it";
import { Verbosity } from "pipelight";

import { useDraw } from "@components/Draw.ts";
const { draw_pipelines } = useDraw();

import json_docker from "@logs/logs_deploy_docker.json";
import json_test from "@logs/logs_test.json";
const vnode = draw_pipelines([json_test, json_docker], Verbosity.Error);

const lines = [
  { cmd: "pipelight run my_test" },
  { cmd: "pipelight logs" },
  { vnode: vnode }
];
</script>
