# Write a pipeline

Here after are the **same pipelines written in different languages**.

## Start from a template

You may want to generate a template config file with the following commands.

```sh
pipelight init
```

```sh
pipelight init --template toml
```

## Write in configuration languages

Configuration languages (or markup languages) have proven to be great to define
small pipelines in a blink. Those pipelines can replace the simplest bash
scripts for small and highly repetitive tasks.

::: code-group

```toml
[[pipelines]]
name = "test"

[[pipelines.steps]]
name = "build"
commands = ["bun install", "bun build"]

[[pipelines.triggers]]
branches = ["master","dev"]
actions= ["pre-push", "pre-commit"]
```

```yaml
pipelines:
  - name: test
    steps:
      - name: build
        commands:
          - bun install
          - bun build
  - triggers:
      - branches:
          - master
          - dev
        actions:
          - pre-push
          - pre-commit
```

```hcl
# A pipeline
pipelines = [{
  name = "test"
  steps = [{
    name     = "build"
    commands = ["bun install", "bun build"]
  }]
  triggers = [{
    branches = ["master","dev"]
    actions  = ["pre-push", "pre-commit"]
  }]
}]
```

```json
{
  "pipelines": [
    {
      "name": "test",
      "steps": [
        {
          "name": "build",
          "commands": ["bun install", "bun build"]
        }
      ],
      "triggers": [
        {
          "branches": ["master", "dev"],
          "actions": ["pre-push", "pre-commit"]
        }
      ]
    }
  ]
}
```

:::

Pipelines written in markup languages are less likely to become more complex
than this because pipelight complexity does not resides in its inner types.

The ability to write complex pipelines lays in the languages that are used to
write those pipelines.

As the documentation tries to showcase more and more flexible workflows, Toml
and Yaml are less documented in favor of programming languages.

## Write in a programming languages

Writting pipelines in programming languages enable the usage of variables, loops
and functions. A short file can then generate a base pipeline with its multiple
declinations.

### Javascript (discourage)

::: danger

Javascript is a **weakly typed** language, and so **highly prone to errors**. It
is **greatly recommended to use Typescript** instead, to take full advantage of
**types linting**.

:::

Typescript only supercharges Javascript syntax with optional type definition.

If you are not at ease with Typescript, you can still write pipelines in
Javascript in a `.ts` file and **use types later** to strenghten your pipeline
definition.

### Typescript

Importing the types from the deno package will give you a **pleasant linting
support**. Then create pipelines with steps and commands. Add automatic triggers
and have fun.

::: code-group

```ts [pipelight.ts]
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

```ts [pipelight.ts (with helpers)]
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

:::

## Run your pipeline

Run it from the terminal.

```sh
pipelight run test
```

Read the logs.

```sh
pipelight logs -vvv
```
