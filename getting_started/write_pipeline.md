# Getting Started

## Write a pipeline

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

::: danger Pitfall

Avoid `console.log()` statements inside your config file (only for debugging purpose).
This will mislead the Config Object creation and prevent pipelight from running.

:::
