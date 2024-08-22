<script setup lang="ts">
import { api } from "@utils/preferences.ts";
import Sync from '@components/Sync.vue';
import ASync from '@components/ASync.vue';
</script>

# Detached pipelines everywhere

## Client-Server synchronisation (Blank Flag)

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

<div v-if="api.compositions">

```ts
// pipelight.ts
server_pipeline.add_trigger({
  action: ["blank"]
});
```

</div>
<div v-else>

```ts
// pipelight.ts
server_pipeline.triggers.push({
  action: ["blank"]
});
```

</div>

Emit the **trigger signal** from the client-side pipeline. Whether it be from a
fallback or from a regular pipeline step.

<div v-if="api.compositions">

```ts
// pipelight.ts
pipeline.on_success = step("sync", () => [
  ...ssh((host) => ["pipelight run server_side_pipeline --flag blank"])
]);
```

</div>
<div v-else>

```ts
// pipelight.ts
pipeline.on_success = {
  name: "sync",
  commands: `ssh ${host} -C "pipelight run server_side_pipeline --flag blank"`
};
```

</div>

and voilà, you have synced your detached pipelines.

<ASync/>

## Forced flags (Manually set trigger action)

Simulate a specific action to trigger associated pipelines.

```sh
pipelight trigger <action>
```

Or trigger a pipeline by simulating the appropriate action.

```sh
pipelight run --flag <action>
```

_You can use it for debugging purpose or simply as a way to create
unconventionnal pipelines._
