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

## Step execution modes

The step execution mode will define the pipeline or step behavior on failure.

There is actually 3 step execution modes:

- StopOnFailure (default)
- JumpNextOnFailure
- ContinueOnFailure

### Stop on failure

The default mode.

```ts
const defaultStep: Step = {
  name "stop pipeline and run on_failure hooks on failure",
  // mode: "stop"
};
```

If a command of the step fails. The whole step will fail and stop the Pipeline execution.

### Jump next on failure

```ts
// Those modes will not stop execution flow
// and allow next step to run.

const nonBlocking: Step = {
  name "jump to next step on failure",
  mode: "jump_next"
};
```

If a command of the step fails. The step execution will stop without interupting the pipeline execution.
The pipeline will simply jump to the next step.

### Continue on failure

```ts
const forcedStep: Step = {
  name "execute next command on failure",
  mode: "continue"
};
```

If a command of the step fails. The next command will still be executed, and son on until the last command of the step.
Then the next step will be executed.

## Fallbacks

Pipelines and steps have special fallbacks:

- on_started
- on_failure
- on_success
- on_abortion

### Pipeline fallbacks

These are global fallbacks.
They are steps that will be triggered whenever the pipeline starts, fails, succeeds or is aborted.

It's not recommanded to overuse this pattern in pipeline definition for the sake of simplicity.
But still it exists and can be use to add global notifications or reporting system.

```ts
const pipeline = {
  name: "my_test",
  on_started: [...steps],
  on_failure: [...steps],
  on_success: [...steps],
  on_abortion: [...steps],
  steps: [
    {
      name: "first",
      commands: [...my_commands]
    },
    {
      name: "second",
      commands: [...my_commands]
    }
  ]
};
```

### Step fallbacks

```ts
const pipeline = {
  name: "my_test",
  steps: [
    {
      name: "first",
      on_started: [...steps],
      on_failure: [...steps],
      on_success: [...steps],
      on_abortion: [...steps],
      commands: [...my_commands]
    }
  ]
};
```
