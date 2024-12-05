# Triggers (Automation)

Triggers are a **set of conditions** that can **instantly launch multiple
pipelines** when they are met.

Here is the part you were waiting for! What is the point of writing pipelines
if you still have to execute them by hand?

## Prerequisites

::: warning Opt in

Triggers have to be explicitly enabled from the command line.

:::

### Enable git-hooks (Optional)

Most of triggers only work inside a Git repository. Make sure you initialize a repository
if you want to take advantage of them.

```sh
git init
```

To enable git triggers (pipelight managed git hooks) on a fresh directory run:

::: danger

For now, this operation overwrites the `.git/hooks` folder. Be sure to move your
manually defined hooks elsewhere before enabling pipelight hooks.

:::

```sh
pipelight init
# or
pipelight enable git-hooks.
```

Disable them with:

```sh
pipelight disable git-hooks.
```

Disable them with:

```sh
pipelight disable git-hooks
```

### Enable file watcher (Optional)

The watcher is an instance of pipelight running in the background and listening to filesystem events.

::: info Low resources consumption

The listener remains easy on the OS and consumes very few resources by
once again using the kernel modules through Rust's most used crates.

:::

```sh
pipelight enable watcher
```

Disable it with:

```sh
pipelight disable watcher
```

You can blacklist or whitelist files by adding them to `.pipelight_ignore`.
They will be either watched or ignored by the watcher.

```sh
touch .pipelight_ignore
```

Whitelist a directory.

```pipelight_ignore
!./public
```

Blacklist a directory.

```pipelight_ignore
./public
```

This `.pipelight_ignore` file is not documented here as it follows exactly the same semantic as a `.gitignore` file, which documentation can be found at https://git-scm.com/docs/gitignore.

## Set the pipeline triggers

**Create a combination of branches and actions for which the pipeline is to be triggered.**

::: code-group

```toml [toml]
[[pipelines.triggers]]
branches= ["main"]
actions= ["pre-push"]
```

```yaml [yaml]
- pipelines:
    - triggers:
        -branches:
          - main
        -actions:
          - pre-push
```

```hcl [hcl]
pipelines = [{
    triggers = [{
        branches= ["main"]
        actions= ["pre-push"]
    }]
}]
```

```ts [ts]
pipeline.triggers = [
  {
    branches: ["main"],
    actions: ["pre-push"]
  }
];
```

```ts [ts(with helpers)]
pipeline.add_trigger({
  branches: ["main"],
  actions: ["pre-push"]
});
```

:::

When triggers are added to a pipeline, the pipeline can't be triggered/run unless the
triggering requirements are met.

This is also to avoid running a pipeline in the wrong environment.

You need to checkout to an authorized environment,
otherwise the pipeline won't run even when using `p run <pipeline_name>`
and the executable will yell at you this type of error.

<div class="flex justify-start">
    <img src="/images/trigger_alert.png" alt="trigger_alert" class="md">
</div>

::: tip

You can however force a condition with `p run <pipeline_name> --flag pre-commit`

Or if you want to run the pipeline manually, add the special flag `manual` to
the trigger action list.

:::

Add the triggers to your pipeline definition.

::: code-group

```toml [toml]
[[pipelines]]
name = "test"

[[pipelines.steps]]
name = "build"
commands = ["bun install", "bun build"]

[[pipelines.triggers]]
branches = ["master"]
actions= ["pre-push"]
```

```yaml [yaml]
pipelines:
  - name: test
    steps:
      - name: build
        commands:
          - bun install
          - bun build
  - triggers:
      - branches:
          - master
        actions:
          - pre-push
```

```hcl [hcl]
# A pipeline
pipelines = [{
  name = "test"
  steps = [{
    name     = "build"
    commands = ["bun install", "bun build"]
  }]
  triggers = [{
    branches = ["master"]
    actions  = ["pre-push"]
  }]
}]
```

```ts [ts]
//pipelight.ts
pipelines: [
  {
    name: "test",
    steps: [
      {
        name: "build",
        commands: ["bun install", "bun build"]
      }
    ],
    triggers: [
      {
        branches: ["master"],
        actions: ["pre-push"]
      }
    ]
  }
];
```

```ts [ts(with helpers)]
//pipelight.ts
const my_pipeline = pipeline("test", () => [
  step("build", () => ["bun install", "bun build"])
]).add_trigger({
  branches: ["master"],
  actions: ["pre-push"]
});
```

:::

## Git environment (optional)

### Branch and tags

Branches are your git project branches names (see: `git branch`).
Tags are the commits you made with `git tag -a "v0.8"` (see: `git tag`).

Branch and Tag combinations are enhanced by **glob** pattern matching.

::: code-group

```toml [toml]
[[pipelines.triggers]]
branches= ["feature/*"]
actions= ["pre-push"]

[[pipelines.triggers]]
tags= ["v*-dev"],
actions= ["pre-commit"]
```

```yaml [yaml]
- pipelines:
    - triggers:
        -branches:
          - feature/*
        -actions:
          - pre-push
    - triggers:
        -branches:
          - v*-dev
        -actions:
          - pre-commit
```

```hcl [hcl]
pipelines = [{
  triggers = [
    {
      branches= ["feature/*"]
      actions= ["pre-push"]
    },
    {
      branches= ["v*-dev"]
      actions= ["pre-commit"]
    }
  ]
}]
```

```ts [ts]
triggers: [
  {
    branches: ["feature/*"],
    actions: ["pre-push"]
  },
  {
    tags: ["v*-dev"],
    actions: ["pre-commit"]
  }
];
```

```ts [ts(with helpers)]
my_pipeline
  .add_trigger({
    branches: ["feature/*"],
    actions: ["pre-push"]
  })
  .add_trigger({
    tags: ["v*-dev"],
    actions: ["pre-commit"]
  });
```

:::

### Supported actions

Actions are named according to [git-hooks](https://githooks.com/) names, plus
special flags "manual", "watch" and "blank".

```ts
export enum Action {
  // mail hooks
  ApplypatchMsg = "applypatch-msg",
  PreApplypatch = "pre-applypatch",
  PostApplypatch = "post-applypatch",
  SendemailValidate = "sendemail-validate",
  // client hooks
  PreCommit = "pre-commit",
  PreMergeCommit = "pre-merge-commit",
  PrepareCommitMsg = "prepare-commit-msg",
  CommitMsg = "commit-msg",
  PostCommit = "post-commit",
  // other client hooks
  PreRebase = "pre-rebase",
  PostCheckout = "post-checkout",
  PostMerge = "post-merge",
  PrePush = "pre-push",
  PostRewrite = "post-rewrite",
  PreReceive = "pre-receive",
  PreAutoGc = "pre-auto-gc",
  FsmonitorWatchman = "fsmonitor-watchman",
  PostIndexChange = "past-index-change",
  // p4
  P4Changelist = "p4-changelist",
  P4PrepareChangelist = "p4-prepare-changelist",
  P4PostChangelist = "p4-post-changelist",
  P4PreSubmit = "p4-pre-submit",
  // server-side hooks
  PreReceive = "pre-receive",
  Update = "update",
  ProcReceive = "proc-receive",
  PostReceive = "post-receive",
  PostUpdate = "post-update",
  RefrenceTransaction = "reference-transaction",
  PushToCheckout = "push-to-checkout",
  // special flags
  Manual = "manual",
  Watch = "watch",
  Blank = "blank"
}
```

- On file change (Watch Flag)

  ```ts
  actions: ["watch"];
  ```

  Trigger pipelines on file change. Whether a file is created, deleted or modified
  the pipeline is triggered.

  You can ignore folders or files by declaring them inside the `.pipelight_ignore`
  hidden file which stick to the .gitignore file specifications.

* Security (Manual Flag)

  ```ts
  actions: ["manual"];
  ```

  If you want to manually run a pipeline that has non-empty triggers, with the
  command `pipelight run` you need to add the **special flag** `manual` to the
  pipeline trigger's actions. This **avoids unintentional manual triggering**
  especially on critical production branches.
