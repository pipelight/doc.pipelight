# Write a pipeline

Here after are the **same pipelines written in different languages**.

## Start from a template

You may want to generate a template config file with

```sh
pipelight init
```

```sh
pipelight init --toml
```

## Pipelines in programming languages

### Typescript

Importing the Config type from the deno package will give you a pleasant typing
support.

Create pipelines with steps and commands. Add automatic triggers and have fun.

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
          commands: ["pnpm install", "pnpm build"],
        },
      ],
      triggers: [
        {
          branches: ["master", "dev"],
          actions: ["pre-push", "pre-commit"],
        },
      ],
    },
  ],
};
export default config;
```

Don't forget to update the deno library.

```sh
deno cache --reload pipelight.ts
```

### Javascript

It's the same syntax as Typescript but you don't benefit from Types linting.

No error will be shown on the linter level if you write ,for example
`title: "test"` instead of `name: "test"` to set the pipeline name. You will get
an error on a deeper level telling that you messed up somwhere in your
javascript.

```ts
//pipelight.js

const config = {
  pipelines: [
    {
      name: "test",
      steps: [
        {
          name: "build",
          commands: ["pnpm install", "pnpm build"],
        },
      ],
      triggers: [
        {
          branches: ["master", "dev"],
          actions: ["pre-push", "pre-commit"],
        },
      ],
    },
  ],
};
export default config;
```

## Pipelines in configuration languages

Configuration languages have proven to be great to define small and unflexible
pipelines.

Those pipelines can replace the simplest bash scripts.

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

Pipelines written in markup languages are less likely to become more complex
than this because pipelight complexity does not resides in its inner types.

The ability to write complex pipelines lays in the languages that are used to
writte those pipelines.

As the documentation tries to showcase more and more flexible workflows, Toml
and Yaml are less documented in favor of programming languages.
