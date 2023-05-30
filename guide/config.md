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

## Parallel steps execution

Trigger parallel execution by declaring a Parallel object that contains multiple Steps.

```ts{3}
steps: [
  {
    parallel: [
      {
        name: "first",
        commands: [...my_commands]
      },
      {
        name: "second",
        commands: [...my_commands]
      }
    ]
  }
];
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

## Triggers

Here is the part you were waiting for!
What is the point of writting pipelines if you still have to execute them by hand?

::: warning BETTER IN A GIT REPO

Only works in a Git repository.
Be sure to initialize a repo if you want to take advantage of triggers.

```sh
git init
```

:::

::: info ENABLE TRIGGERS

To enable triggers on a fresh directory, run at least one random pipelight command:

```sh
pipelight ls
```

:::

Make a combination of branches and actions for which to trigger the pipeline.

```ts
triggers: [
  {
    branches: ["main"],
    actions: ["pre-push"]
  }
];
```

Simply add triggers to your pipeline definition.

```ts{11}
//pipelight.ts
pipelines: [
  {
    name: "test",
    steps: [
      {
        name: "build",
        commands: ["yarn install", "yarn build"]
      }
    ],
    triggers: [
      {
        branches: ["main"],
        actions: ["pre-push"]
      }
    ]
  }
];
```

### Branch and Tags

Branches are your git project branches names (see: `git branch`).

Tags are the tag you added the commits you want to release with `git tag -a "v0.8"` (see: `git tag`).

You can set multiple branch and tag combinations with **globbing** patterns.

```ts
    triggers: [
      {
        branches: ["feature/*"],
        actions: ["pre-push"]
      }
      {
        tags: ["v*-dev"],
        actions: ["pre-commit"]
      }
    ]
```

### Actions (Git-hooks)

Actions are named according to [git-hooks](https://githooks.com/) names.
Plus some special flags like "manual".

### Security (Manual Flag)

When triggers are added to a pipeline, it will not be triggered util trigger requirements are met.
Which mean you'll have to checkout to the allowed branches, tags, and execute the allowed actions.

If you want to manually run a pipeline that has some triggers with `pipelight run`
you wiil have to add the **special flag** "manual" .

```ts
actions: ["manual"];
```

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
