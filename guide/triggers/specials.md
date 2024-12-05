<script setup lang="ts">
import Sync from '@components/Sync.vue';
import ASync from '@components/ASync.vue';
</script>

# Trigger with special events

## Use forced flags (debugging)

Simulate a specific action to trigger associated pipelines.

```sh
p trigger --flag <action>
```

Or run a pipeline and pass the appropriate action flag.

```sh
p run --flag <action>
```

_You can use it for debugging purpose or simply as a way to create
unconventionnal pipelines._

## The blank flag (client/server synchronisation)

```ts
actions: ["blank"];
```

When you have pipelight installed **client and server side**, and you use
**detached** pipeline triggering with git.

A push to the (git)server triggers both client and server side pipelines nearly
simultaneously.

<Sync/>

What if you want to trigger a server side pipeline only **once a client side
pipeline has resolved** whitout having to bring it to the foreground?

A workaround is to send an ssh command to the server at some point in your
pipeline. `pipelight run <pipeline_name> --flag blank` or
`pipelight trigger --flag blank` to trigger the server side pipeline.

And add the required trigger to the pipeline to be executed server-side.

::: code-group

```toml
[[pipelines.triggers]]
actions = ["blank"]
```

```yaml
pipelines:
  - triggers:
      actions:
        - blank
```

```ts
// pipelight.ts
server_pipeline.triggers.push({
  actions: ["blank"]
});
```

```ts [ts(with helpers)]
// pipelight.ts
server_pipeline.add_trigger({
  actions: ["blank"]
});
```

:::

Emit the **trigger signal** from the client-side pipeline. Whether it be from a
fallback or from a regular pipeline step.

::: code-group

```toml
[[pipelines.on_success]]
name = "sync"
commands = """
  ssh $host -C "pipelight run server_side_pipeline --flag blank"
"""
```

```yaml
pipelines:
  on_success:
    name: sync
    commands:
      - ssh $host -C "pipelight run server_side_pipeline --flag blank"
```

```ts
// pipelight.ts
pipeline.on_success = {
  name: "sync",
  commands: `ssh ${host} -C "pipelight run server_side_pipeline --flag blank"`
};
```

```ts [ts(with helpers)]
// pipelight.ts
pipeline.on_success = step("sync", () => [
  ...ssh((host) => ["pipelight run server_side_pipeline --flag blank"])
]);
```

:::

and voilà, you have synced your detached pipelines.

<ASync/>
