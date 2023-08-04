# Write your first pipeline

Here we will write the **same pipeline in different formats**
and discuss the advantages and drawbacks.

## Pipelines in programming languages

### Typescript

Importing the Config type from the deno package will give you a pleasant typing support.

Create pipelines with steps and commands.
Add automatic triggers and have fun.

```ts
//pipelight.ts
import { Config } from "https://deno.land/x/pipelight/mod.ts";

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

Don't forget to update the deno library.

```sh
deno cache --reload pipelight.ts
```

### Javascript

It's the same syntax as Typescript bu t you don't benefit from Types linting.

No error will be shown on the linter level if you for example write `title: "test"` instead of `name; "test"`
to set the pipeline name.
You will get an error on a deeper level telling that you messed up somwhere in your javascript.

```ts
//pipelight.js

const config = {
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

## Pipelines in configuration languages

Configuration languages have proven to be great to define
small and unflexible pipelines.

They can replace the simplest bash scripts.

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
