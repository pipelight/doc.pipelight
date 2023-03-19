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

## Typings

Supports Typescript.
Import type definition from npm package.

```ts
//pipelight.ts
import { Config } from "npm:pipelight";
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

```ts
//mod.ts from the npm package
type Config = {
  pipelines?: Pipeline[];
};
type Pipeline = {
  name: string;
  steps: StepOrParallel[];
  triggers?: Trigger[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};

type StepOrParallel = Step | Parallel;
type Parallel = {
  parallel: Step[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};
type Step = {
  non_blocking?: boolean;
  name: string;
  commands: string[];
  on_failure?: StepOrParallel[];
  on_success?: StepOrParallel[];
  on_abortion?: StepOrParallel[];
};
type Trigger = {
  branches?: string[];
  actions?: Action[];
};
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

export type {
  Config,
  Pipeline,
  StepOrParallel,
  Step,
  Parallel,
  Action,
  Trigger
};
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

## Non Blocking step execution

A non_blocking step will not stop pipeline execution on failure.

Here **second** step will always be executed even if **first** step fails.

```ts{4}
steps: [
  {
    name: "first",
    non_blocking: true,
    commands: [...my_commands]
  },
  {
    name: "second",
    commands: [...my_commands]
  }
];
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

- on_failure
- on_success
- on_abortion

### Pipeline fallbacks

```ts
const pipeline = {
  name: "my_test",
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
      on_failure: [...steps],
      on_success: [...steps],
      on_abortion: [...steps],
      commands: [...my_commands]
    }
  ]
};
```
