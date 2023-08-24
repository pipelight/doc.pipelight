# Triggers (Automation)

Here is the part you were waiting for!
What is the point of writting pipelines if you still have to execute them by hand?

## Prerequesits

### Enable git hooks (Optional)

Most of triggers only work inside a Git repository.
Be sure to initialize a repo if you want to take advantage of them all.

```sh
git init
```

To enable git triggers on a fresh directory, run at least one random pipelight command.

```sh
pipelight ls
```

::: warning

For now, this operation overwrites the .git/hooks folder.
Be sure to move your manually defined hooks elsewhere before enabling pipelight hooks

:::

## Define pipeline triggers

**Make a combination of branches and actions for which to trigger the pipeline.**

When triggers are added to a pipeline, the pipeline is not triggered until triggering requirements are met.
Which means you need to checkout to the allowed branches or tags, and execute the allowed actions for the pipeline to run.

(debug): _When verbosity is increased, the CLI tells you what to do if requirements are not met._

```ts
triggers: [
  {
    branches: ["main"],
    actions: ["pre-push"]
  }
];
```

```ts
type Trigger = TriggerBranch | TriggerTag;

type TriggerBranch = { branches?: string[]; actions?: Action[] };
type TriggerTag = { tags?: string[]; actions?: Action[] };
```

Then, add triggers to your pipeline definition.

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
Tags are the commits you made with `git tag -a "v0.8"` (see: `git tag`).

_It has become common to do stuffs like tests and build on new `tag` when releasing software._

Branch and Tag combinations are enhanced by **globbing**.

```ts
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

### Actions (Git-hooks)

Actions are named according to [git-hooks](https://githooks.com/) names,
plus special flags like `manual` and `watch`.

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
  Watch = "watch"
}
```

#### On file change (Watch Flag)

```ts
actions: ["watch"];
```

Trigger pipelines on file change.
Whether a file is created, deleted or modified the pipeline is triggered.

::: warning Ignore files

As of today, you can ignore folders or files by writting their names inside the `.gitignore`,
but this will also prevent git from saving changes made to those files.

:::

This flag rely on **[watchexec](https://github.com/watchexec/watchexec)**
So for further tweaking see the cli tool documentation.

#### Security (Manual Flag)

```ts
actions: ["manual"];
```

If you want to manually run a pipeline that has non-empty triggers, with the command `pipelight run`
you need to add the **special flag** `manual` to the pipeline trigger's actions.
This **avoids unintentionnal manual triggering** aspecialy on critical production branches.

## Forced flags

Simulate a specific action to trigger associated pipelines.

```sh
pipelight trigger <action>
```

Or trigger a pipeline by simulating the appropriate action.

```sh
pipelight run --flag <action>
```

You can use it for debugging purpose or simply as a way to create unconventionnal pipelines.
