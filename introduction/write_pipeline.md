<script setup lang="ts">
import { api } from "@utils/preferences.ts";
</script>

# Write and Run your first pipeline

## Write in programming languages

Writting pipelines in programming languages allows you the usage of variable, loops and functions.
A short file can then generate a base pipeline with its multiple declinations.

### Javascript (discourage)

::: danger

Javascript is a **weakly typed** language, and so **highly prone to errors**.
It is **greatly recommanded to use Typescript** instead,
to take full advantage of **types linting**.

:::

Typescript only supercharges Javascript syntax with optional type definition.

If you are not at ease with Typescript, you can still write pipelines in Javascript in a `.ts` file
and **use types later** to strenghten your pipeline definition.

### Typescript

Importing the types from the deno package will give you a **pleasant linting support**.

<div v-if="api.compositions">

```ts
//pipelight.ts
import type { pipeline, step } from "https://deno.land/x/pipelight/mod.ts";

const my_pipe = pipeline("test", () => [
  step("build", () => ["pnpm install", "pnpm build"])
]).add_trigger({
  branches: ["master", "dev"],
  actions: ["pre-push", "pre-commit"]
});

export default {
  pipelines: my_pipe
};
```

</div>
<div v-else>

```ts
//pipelight.ts
import type { Config } from "https://deno.land/x/pipelight/mod.ts";

const config: Config = {
  pipelines: [
    {
      name: "test",
      steps: [
        {
          name: "build",
          commands: ["pnpm install", "pnpm build"]
        }
      ],
      triggers: [
        {
          branches: ["master", "dev"],
          actions: ["pre-push", "pre-commit"]
        }
      ]
    }
  ]
};
export default config;
```

</div>

## Write in configuration languages

Configuration languages have proven to be great to define small pipelines in a blink.
Those pipelines can replace the simplest bash scripts for atomic (small) and highly repetitive tasks.

### Toml

```toml

[[pipelines]]
name =  "test"

[[pipelines.steps]]
name = "build"
commands = ["pnpm install", "pnpm build"]

[[pipelines.triggers]]
branches = ["master","dev"]
actions= ["pre-push", "pre-commit"]

```

### Yaml

```yml
pipelines:
  - name: test
    steps:
      - name: build
        commands:
          - pnpm install
          - pnpm build
  - triggers:
      - branches:
          - master
          - dev
        actions:
          - pre-push
          - pre-commit
```

## Run your pipeline

Run it from the terminal.

```sh
pipelight run test
```

Read the logs.

```sh
pipelight logs -vvv
```
