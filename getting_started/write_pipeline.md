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

### Linting and Formatting

You may have enabled **lsp** or wathever formatter/linter compatible with your file editor, but if you don't
Pipelight use the deno built in linter and got you cover on every `pipelight <whatever_command>`.

If `pipelight ls` doesn't yell any error. It's all good.

### Troubleshoot

Like for every javascript script, you can use `console.log()` statements inside your config file to troubleshoot it.
Run it with `deno run -A ./pipeight.ts` to check the output.
