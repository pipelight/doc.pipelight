<script setup lang="ts">
import { api } from "@utils/preferences.ts";
import Sync from '@components/Sync.vue';
import ASync from '@components/ASync.vue';
</script>

# Triggers (Automation)

Here is the part you were waiting for! What is the point of writing pipelines
if you still have to execute them by hand?

::: tip tl;dr

Triggers are a **set of conditions** that can **instantly launch multiple
pipelines** when they are met.

:::

## Prerequisites

In order to enable pipelight triggers these commands have to be executed
somewhere inside your project directory.

::: warning Triggers are opt-in

Triggers have to be explicitly enabled from the command line.

:::

### Enable git-hooks (Optional)

Most of triggers only work inside a Git repository. Make sure you initialize a repository
if you want to take advantage of them.

```sh
git init
```

To enable git triggers (pipelight managed git hooks) on a fresh directory run:

```sh
pipelight init
# or
pipelight enable git-hooks.
```

Disable them with:

```sh
pipelight disable git-hooks.
```

::: danger

For now, this operation overwrites the `.git/hooks` folder. Be sure to move your
manually defined hooks elsewhere before enabling pipelight hooks.

:::

Disable them with:

```sh
pipelight disable git-hooks
```

### Enable file watcher (Optional)

An instance of pipelight runs in the background and listens to filesystem events.

::: tip Computing resources consumption

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

## Define pipeline triggers

**Create a combination of branches and actions for which the pipeline is to be triggered.**

When triggers are added to a pipeline, the pipeline is not triggered until the
triggering requirements are met.
Which means that you need to checkout to the allowed
branches or tags, and execute the allowed actions for the pipeline to be executed.

<div v-if="api.compositions">
```ts
pipeline.add_trigger({
  branches: ["main"],
  actions: ["pre-push"],
});
```

</div>
<div v-else>

```ts
pipeline.triggers =
  {
    branches: ["main"],
    actions: ["pre-push"],
  },
];
```

(debug): _When verbosity is increased, the CLI tells you what to do if the
requirements are not met._

</div>

```ts
type Trigger = TriggerBranch | TriggerTag;

type TriggerBranch = { branches?: string[]; actions?: Action[] };
type TriggerTag = { tags?: string[]; actions?: Action[] };
```

Then, add triggers to your pipeline definition.

<div v-if="api.compositions">

```ts
//pipelight.ts
const my_pipeline = pipeline("test", () => [
  step("build", () => ["yarn install", "yarn build"])
]).add_trigger({
  branches: ["main"],
  actions: ["pre-push"]
});
```

</div>
<div v-else>

```ts
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

</div>

## Git environment (optional)

### Branch and Tags

Branches are your git project branches names (see: `git branch`).
Tags are the commits you made with `git tag -a "v0.8"` (see: `git tag`).

Branch and Tag combinations are enhanced by **globbing** pattern matching.

<div v-if="api.compositions">

```ts
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

</div>
<div v-else>

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

</div>

## Actions

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

### Git actions (Git-hooks)

Actions are named according to [git-hooks](https://githooks.com/) names, plus
special flags like `manual`, `watch` and `blank`.

## Special actions

### On file change (Watch Flag)

```ts
actions: ["watch"];
```

Trigger pipelines on file change. Whether a file is created, deleted or modified
the pipeline is triggered.

You can ignore folders or files by declaring them inside the `.pipelight_ignore`
hidden file which stick to the .gitignore file specifications.

### Security (Manual Flag)

```ts
actions: ["manual"];
```

If you want to manually run a pipeline that has non-empty triggers, with the
command `pipelight run` you need to add the **special flag** `manual` to the
pipeline trigger's actions. This **avoids unintentional manual triggering**
especially on critical production branches.
