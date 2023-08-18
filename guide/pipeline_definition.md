# Define a pipeline

## The only rule

Pipelight only restricting rule is that a configuration file has to default export an Object of [`type Config`](https://deno.land/x/pipelight/mod.ts?s=Config).
Everything else that happens inside this script is up to you.

With such a wide rule, the pipeline definition process gives way to creativity and imagination.

Where this freedom can be really enjoyable, it might sometimes be frustrating.
That is why you are provided with some empirical **guidelines**, **patterns** and [**helpers**](/helpers/overview) to speed up your pipeline creation.

Thus you remain free in your creation process, but you are not helpless.

## Typescript or Javascript ?

Keep in mind that types are something optional
that you can still add later to strenghten your pipeline definition.

If you are not at ease with Typescript, you can still write pipelines in Javascript in a .ts file

```js
//pipelight.js
const config = {};
```

and use types later.

```ts
//pipelight.ts
import { Config } from "https://deno.land/x/pipelight/mod.ts";
const config: Config = {};
```

Typescript only supercharge Javascript syntax with optional type definition.
Explore the complete type definition on [DenoLand](https://deno.land/x/pipelight/mod.ts)

## Syntax flavors

You can either use an Object declaration or a less verbose syntax with the provided helpers functions.
Those easy on the eye syntaxes have been greatly inspired by [Vue](https://vuejs.org/) Option and Composition APIs.

They are meant to be use **together** to improve readability where it is needed.

### Option API <Badge type="tip" text="stable" />

The Option API is unlikely to change in minor updates, so it is concidered as stable.
Define your pieline in an object sythax.

Simply import the `Config interface` for fast type-checking.

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

### Composition API <Badge type="warning" text="beta" />

The Composition API is built on top of the Option API.
It is a group of functions, class and methods that

- shorten the pipeline definition
- enable fine-grained modularity

Simply import the provided common helper functions.

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
