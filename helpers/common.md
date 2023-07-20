# Common helpers <Badge type="warning" text="beta" />

## Pipeline definition helpers

Pipeline definition helpers are syntaxic sugar for minimalists.
Here, both code blocks **do exactly the same thing**.

```ts
// With helper
const my_pipeline = pipeline("example", () => my_steps);
```

```ts
// Without helper
const my_pipeline: Pipeline = {
  name: "example",
  steps: my_steps
};
```

Here is a complete working example using **pipeline** and **step** helpers.

```ts
const compositionPipe = pipeline("composition", () => [
  step("do something", () => my_commands),
  step("do something else", () => my_commands)
]);
```

## Remote operations helper

For when you execute commands on remote servers.

Instead of prefixing every command with `ssh -C` like you will normaly do
in bash, the **ssh** helper wrap them for you.

```ts
step("replace containers", () => ssh([host], my_commands));
```

## Early execution helper

When you need to retrieve data **before** your pipeline execution.

We don't do this anymore...

```ts
const res = await exec(my_command);
```

The helper has been replace with the **DAX** module allowing more customisation and type safety.

```ts
import $ from "https://deno.land/x/dax/mod.ts";

const res = await $`my_command`.text();
```

Can be used to retrieve git infos, like your latest tag and use it in your pipeline declaration.

```ts
const version = await $`git describe --tags --abbrev=0 | sed s/v//`.text();
// version = "0.8"
```
