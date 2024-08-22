<script setup lang="ts">
import { h, ref } from "vue";
// Components
import Terminal from "@components/Terminal.vue";

const vnode_inspect = h("div", [
    h("div", {
      innerHTML: "> deploy_to_host"
    }),
    h("div", {
      class: "indented",
      innerHTML: "test"
    }),
    h("div", {
      class: "indented",
      innerHTML: "build"
    })
]);
const lines_inspect = [
  { cmd: "pipelight inspect" },
  { vnode: vnode_inspect }
];

const vnode_run = h("div", [
    h("div", {
      innerHTML: "> deploy_to_host"
    }),
    h("div", {
      class: "indented",
      innerHTML: "test"
    }),
    h("div", {
      class: "indented",
      innerHTML: "build"
    })
]);
const lines_run = [
  { cmd: "pipelight run" },
  { vnode: vnode_run }
];
</script>

<style lang="postcss">
.terminal {
    .indented {
        @apply pl-4;
    }
}
</style>

# Command line usage

## Most used commands

List pipelines from your config file.

(debug): _You can use this command to lint your config file._

```sh
pipelight ls
# to
pipelight ls -vvvv
```

Inspect and pretty print your pipeline definitions.

```sh
pipelight inspect <pipeline_name>
# same as
pipelight ls -vvv <pipeline_name>
```

Without an argument `inspect` shows an interactive prompt
with your pipeline names.

<Terminal
class="sm"
:animate=false
:lines="lines_inspect"
/>

Run a pipeline in the background (default).

```sh
pipelight run <pipeline_name>
```

Without an argument `run` shows an interactive prompt
with your pipeline names.

<Terminal
class="sm"
:animate=false
:lines="lines_run"
/>

Compulsively check pipelines execution states, and produced outputs.

```sh
pipelight logs
# or
pipelight logs -vvv
```

Clean log folder. Remove logs.

```sh
pipelight logs rm
```

Abort a pipeline execution.

```sh
pipelight stop <pipeline_name>
```

## Other useful commands

Discover some options by using the help flag.

```sh
pipelight --help
```

Can be used on subcommands too.

```sh
pipelight run --help
```
