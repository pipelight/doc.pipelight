# Triggers (git-hooks)

If you wan't to autodeploy on push.
And many more automation.

::: warning

Only works in a Git repository.
Be sure to initialize a repo if you want to enable automation.

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

```ts
//pipelight.config.ts
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
