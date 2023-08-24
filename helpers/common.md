# Common helpers <Badge type="warning" text="beta" />

## Pipeline definition helpers

Pipeline definition helpers are syntaxic sugar for minimalists.

Here, both code blocks **do exactly the same thing**.

```ts
// Without helper
const my_pipeline: Pipeline = {
  name: "example",
  steps: my_steps
};
```

```ts
// With helper
const my_pipeline = pipeline("example", () => my_steps);
```

Use [**pipeline**](https://deno.land/x/pipelight/mod.ts?s=pipeline)
and [**step**](https://deno.land/x/pipelight/mod.ts?s=step) helpers.

```ts
const my_pipe = pipeline("composition", () => [
  step("do something", () => my_commands),
  step("do something else", () => my_commands)
]);
```

Use the [**parallel**](https://deno.land/x/pipelight/mod.ts?s=parallel) helper as well.

```ts
const my_pipe = pipeline("composition", () => [
  parallel(() => [
    step("do something", () => my_commands),
    step("do something else", () => my_commands)
  ])
]);
```

### Pipeline methods

Add a trigger to the `Pipeline`.

```ts
const my_pipe = pipeline("composition", () => [
  step("do something", () => my_commands)
])
  // add a trigger
  .add_trigger({
    branches: [],
    actions: []
  });
```

### Step methods

Set the `Step` execution mode.

```ts
step("do something", () => my_commands)
  // set the step execution mode
  .set_mode("continue");
```

## Remote operations helper

For when you execute commands on remote servers.

Instead of prefixing every command with `ssh -C` like you will normaly do
in bash, the **ssh** helper wrap them for you.

```ts
ssh(host, () => [...my_commands]);
```

```ts
step(
  "do things on remote",
  ssh(host, () => [...my_commands])
);
```

## Early execution helper

When you need to retrieve data **before** your pipeline execution.
The helper has been replace with the [**DAX**](https://deno.land/x/dax@0.34.0) module allowing more customisation and type safety.

```ts
import $ from "https://deno.land/x/dax/mod.ts";

const res = await $`my_command`.text();
```

Can be used to retrieve git infos, like your latest tag and use it in your pipeline declaration.

```ts-vue
const version = await $`git describe --tags --abbrev=0`.text()
// version = "{{ version }}"
```

<script lang="ts" setup>
const version = `v${import.meta.env.VITE_GIT_VERSION}`;
</script>
