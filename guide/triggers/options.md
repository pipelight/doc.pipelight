<script setup lang="ts">
import { api } from "@utils/preferences.ts";
import Sync from '@components/Sync.vue';
import ASync from '@components/ASync.vue';
</script>

# Triggers behavior

::: tip

The following options can be set globally and overwritten on a per pipeline
bases.

:::

## Set pipeline default I/O

By default, pipelines are triggerd **attached** to the standard output.

For example, a git action like `git push` will wait until the pipelines
execution is over before your shell gives you the control back and print another
prompt line.

To prevent waiting forever when triggering heavy workloads, you can set the
pipeline to be executed **detached** from the standard output.

<div v-if="api.compositions">

```ts
const my_pipeline = pipeline("always_detached_when_triggered_by_git", () => [])
  .detach();
```

or

```ts
const my_pipeline = pipeline("always_detached_when_triggered_by_git", () => [])
  .set_options(
    {
      attach: false,
    },
  );
```

</div>
<div v-else>

```ts
const my_pipeline = {
  name: "always_detached_when_triggered_by_git",
  steps: [],
  options: {
    attach: false,
  },
};
```

</div>

When running a pipeline with the command `pipelight run`, this flag is not
interpreted and therefore the pipeline is triggered in the background unless you
attach it `pipelight run --attach`.

## Set default log level

Triggering a pipeline in attached state will print the minimum pipeline log.

You can set the default log level Available levels are `error`, `warn`, `info`,
`debug` and `trace`.

<div v-if="api.compositions">

```ts
my_pipeline.set_options({
  log_level: "warn",
});
```

</div>
<div v-else>

```ts
pipeline: {
  options: {
    attach: false;
    log_level: "warn",
  }
}
```

</div>

## Set defaults globally

<div v-if="api.compositions">

```ts
my_config.set_options({
attach: false,
  log_level: "warn",
});
```

</div>
<div v-else>

```ts
config: {
  options: {
    attach: false;
    log_level: "warn",
  }
  pipelines:[]
}
```

</div>
