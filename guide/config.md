# Basic pipeline definition

## Configuration files

Pipelight will look into the present working directory for a config file named pipelight.<file_extension>

```sh
pipelight.ts;
# OR
pipelight.toml;
# OR
pipelight.yml;
```

And wil look into parents directory until it finds a config file.

It will first look for **typescript** file, then **toml** and then **yaml**.

There is no best file format to write pipelines.
But as you seek complexity, the strive for flexibility, simplicity and reusability will lead you to Typescript.

## Typescript or Javascript ?

If you are not at ease with Typescript, you can still write pipelines in Javascript in a .ts file.
Typescript only supercharge normal Javascript syntax with optional type definition.
It as something optional that you can still add later to strenghten your pipeline definition.

### Typings

Import type definition from the official deno package.

::: tip TYPES

[See the complete type definition on DenoLand](https://deno.land/x/pipelight/mod.ts)

:::

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
          commands: ["yarn install", "yarn build"]
        }
      ],
      trigger: {
        branches: ["master", "dev"],
        actions: ["pre-push", "pre-commit"]
      }
    }
  ]
};
export default config;
```
