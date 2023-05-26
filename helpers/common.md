# Common helpers <Badge type="warning" text="beta" />

::: info TYPES

If something is missing, or if you seek deeper customization,
[See the complete type definition on DenoLand](https://deno.land/x/pipelight/mod.ts)

:::

## Pipeline definition helpers

Pipeline definition helpers are syntaxic sugar for minimalists.
Here, both code blocks **do exactly the same thing**.

```ts
// With helper
import { pipeline } from "https://deno.land/x/pipelight/mod.ts";

const my_pipeline = pipeline("example", () => my_steps);
```

```ts
// Without helper
import type { Pipeline } from "https://deno.land/x/pipelight/mod.ts";

const my_pipeline: Pipeline = {
  name: "example",
  steps: my_steps
};
```

Here is a complete working example using **pipeline** and **step** helpers.

```ts
import { pipeline, step } from "https://deno.land/x/pipelight/mod.ts";

const my_commands = ["cd", "ls"];

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
import { ssh } from "https://deno.land/x/pipelight/mod.ts";

step("replace containers", () => ssh([host], my_commands));
```

## Exec helper

When you need to retrieve data **before** your pipeline execution.

```ts
import { exec } from "https://deno.land/x/pipelight/mod.ts";

const res = await exec(my_command);
```

Can be used to retrieve git infos, like your latest tag and use it in your pipeline declaration.

```ts
const version = await exec("git describe --tags --abbrev=0 | sed s/v//");
// version = "v0.8"
```
