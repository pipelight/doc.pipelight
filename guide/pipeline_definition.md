# Pipeline definition

Choose your flavor.

You can either use an Object/JSON like declaration,
or a less verbose syntax with the provided functions.

Those easy on the eye syntaxes have been greatly inspired by [Vue](https://vue.com/) Option and Composition APIs.

## Option API

Import the Config interface for fast type-checking.

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

## Composition API

Import the provided common helper functions.

```ts
//pipelight.ts
import { pipeline, step } from "https://deno.land/x/pipelight/mod.ts";

const my_pipe = pipeline("test", () => [
  step("build", () => ["pnpm install"])
]).trigger({
  branches: ["master", "dev"],
  actions: ["pre-push", "pre-commit"]
});

export default {
  pipelines: [my_pipe]
};
```
