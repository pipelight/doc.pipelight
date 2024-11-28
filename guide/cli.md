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

::: tip Alias

Consider aliasing pipelight to something shorter.
Some of the following command line example will make use of the shorter form
**p** for **pipelight**.

:::

## tl;dr

```sh
# List pipelines
p ls
# Run pipelines
p run
# Show logs
p logs
```

## Most used commands

Here is the list of the commands you will spam the most.

If you do not provide a pipeline name, most commands will yield an interactive prompt
for you to select between **availble** pipelines.

### General project health

List every pipelines.

_You can use this command to safely lint your configuration file._

```sh
pipelight ls
```

<div class="flex justify-start">
    <img src="/images/list.png" alt="list_vv" class="xs">
</div>

Increase verbosity to get a good project grasp of your project current health.

```sh
pipelight ls -vv
```

<div class="flex justify-start">
    <img src="/images/list_vv.png" alt="list_vv" class="md">
</div>

Show additional informations:

- the date and time when last run occured.
- the commit id

```sh
pipelight ls -vvvv
```

<div class="flex justify-start">
    <img src="/images/list_vvvv.png" alt="list_vvvv" class="md">
</div>

### Inspect pipeline definition

Inspect and pretty print your pipeline definitions.

```sh
pipelight inspect <pipeline_name>
# same as
pipelight ls -vvv <pipeline_name>
```

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
