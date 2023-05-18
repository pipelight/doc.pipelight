# Configuration and Pipelines in depth

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
Typescript only supercharge normal Javascript syntax with optional type definition,
so see it as something optional that you will add later to strenghten your pipelines definitions.

### Typings

Supports Typescript.
Import type definition from the official deno package.

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

## Typescript types definition

Here is the complete type definition.
The question mark "?" means that a property is optional.

See https://deno.land/x/pipelight/mod.ts for complete types definition! 😌

```ts
// Types definition from the official deno package

type Config = {
  pipelines?: Pipeline[];
};
type Pipeline = {
  name: string;
  steps: StepOrParallel[];
  triggers?: Trigger[];
  on_started?: StepOrParallel[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};

type StepOrParallel = Step | Parallel;
type Parallel = {
  mode?: Mode;
  parallel: Step[];
  on_started?: StepOrParallel[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};
type Step = {
  mode?: Mode;
  name: string;
  commands: string[];
  on_started?: StepOrParallel[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};
type Trigger = {
  branches?: string[];
  actions?: Action[];
};
type Mode = "stop" | "jump_next" | "continue";
type Action =
  | "applypatch-msg"
  | "pre-applypatch"
  | "post-apply-patch"
  | "pre-commit"
  | "prepare-commit-msg"
  | "commit-msg"
  | "post-commit"
  | "pre-rebase"
  | "post-checkout"
  | "post-merge"
  | "pre-receive"
  | "update"
  | "post-receive"
  | "post-update"
  | "pre-auto-gc"
  | "post-rewrite"
  | "pre-push"
  | "manual";
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

```ts{4}
const defaultStep: Step = {
  name "stop pipeline and run on_failure hooks on failure",
  mode: "stop"
};

// Those modes will not stop execution flow
// and allow next step to run.

const nonBlocking: Step = {
  name "jump to next step on failure",
  mode: "jump_next"
};

const forcedStep: Step = {
  name "execute next command on failure",
  mode: "continue"
};
```

## Triggers (git-hooks)

Here is the part you were waiting for!
What is the point of writting pipelines if you still have to execute them by hand?

::: warning

Only works in a Git repository.
Be sure to initialize a repo if you want to take advantage of triggers.

```sh
git init
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

Actions are named according to [git-hooks](https://githooks.com/) names.
And Branches are your git project branches names.

Simply add triggers to your pipeline definition.
Nothing more to do.

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

## Fallbacks

Pipelines and steps have special fallbacks:

- on_started
- on_failure
- on_success
- on_abortion

### Pipeline fallbacks

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
