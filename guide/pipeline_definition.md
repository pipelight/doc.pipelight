<script lang="ts" setup>
import { inject } from "vue";
const Badge = inject("Badge");
</script>

# Define a pipeline (Typescript)

## Syntax flavors 🍦

You can either use an Object declaration or a less verbose syntax with the
provided helpers functions. Those easy on the eye syntaxes have been greatly
inspired by [Vue](https://vuejs.org/) Option and Composition APIs.

They are meant to be used **together** to improve readability where it is
needed.

### Object API <Badge type="tip" text="stable" />

::: tip

The Option API is concidered as stable because it is unlikely to change in the
comming updates. It has become complete enough to allow creation of every
pipeline a man can dream of with mindfull combination of a small set of options.

:::

Simply import the `Config interface` for fast type-checking and define your
pielines in an **Object syntax**.

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

```ts
export type Config = {
  pipelines?: Pipeline[];
};
```

### Helpers API <Badge type="tip" text="stable" />

The Composition API is built on top of the Option API. It is a group of
functions, class and methods that:

- shorten the pipeline definition;
- enable fine-grained modularity.

This syntax is the result of [**helpers**](/helpers/overview) adoption.

Simply import the provided common helper functions.

```ts
//pipelight.ts
import { pipeline, step } from "https://deno.land/x/pipelight/mod.ts";

const my_pipe = pipeline("test", () => [
  step("build", () => ["pnpm install"]),
]).trigger({
  branches: ["master", "dev"],
  actions: ["pre-push", "pre-commit"],
});

export default {
  pipelines: [my_pipe],
};
```

## The only rule

Pipelight only restricting rule is that a configuration file has to default
export an Object of
[`type Config`](https://deno.land/x/pipelight/mod.ts?s=Config). In other words,
your config file must contain a line like this:

```ts
//pipelight.ts
export default config: Config;
```

Everything else that happens inside this script is up to you.

With such a wide rule, the pipeline definition process gives way to creativity
and imagination.

Where this freedom can be really enjoyable, it might sometimes be frustrating.
That is why you are provided with some empirical **guidelines**, **patterns**
and [**helpers**](/helpers/overview) to speed up your pipeline creation.

Thus you remain **free** in your creation process, but you are **not helpless**.

## Types in depth

You can see the complete type definition on
[DenoLand](https://deno.land/x/pipelight/mod.ts).

There is some options that are discussed further in the documentation but that
you can already explore by going through the
[self documented deno documentation](https://deno.land/x/pipelight/mod.ts)

A **pipeline** is an object that has an **array of steps**, optionnal
[triggers](/guide/triggers/definition) for automatique execution, and optionnal
global [fallbacks](/guide/fallbacks) for out of the flow step execution.

```ts
export interface Pipeline {
  name: string;
  steps: StepOrParallel[];
  triggers?: Trigger[];
  // Execution flow ptions
  options?: PipelineOpts;
  // Fallbacks
  on_started?: StepOrParallel[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
}

export interface PipelineOpts {
  attach?: boolean;
  log_level?: LogLevel | string;
}
```

A **step** is an object that has an **array of commands**, an optional
[execution](/guide/modes) mode and optionnal [fallbacks](/guide/fallbacks) for
more specific out of the flow step execution.

```ts
export type Step = {
  name: string;
  commands: string[];
  // Execution flow ptions
  options?: StepOpts;
  // Fallbacks
  on_started?: StepOrParallel[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};

export interface StepOpts {
  mode?: Mode | string;
}
```
