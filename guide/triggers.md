# Triggers (Automation)

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

## Branch and Tags

Branches are your git project branches names (see: `git branch`).

Tags are the tag you added the commits you want to release with `git tag -a "v0.8"` (see: `git tag`).

You can set multiple branch and tag combinations with **globbing** patterns.

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

## Actions (Git-hooks)

Actions are named according to [git-hooks](https://githooks.com/) names,
plus special flags "manual" and "watch".

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

### On file change (Watch Flag)

```ts
actions: ["watch"];
```

Trigger pipelines on file change.
Whether a file is created, deleted or modified the pipeline will be triggered.
You can ignore folders or files by putting them in the .gitignore file.

This flag rely on **[watchexec](https://github.com/watchexec/watchexec)**
So for further tweaking see the cli tool documentation.

### Security (Manual Flag)

```ts
actions: ["manual"];
```

When triggers are added to a pipeline, it will not be triggered until trigger requirements are met.
Which mean you'll have to checkout to the allowed branches, tags, and execute the allowed actions.

If you want to manually run a pipeline that has some triggers with `pipelight run`
you wiil have to add the **special flag** "manual" .
