# Triggers (git-hooks)

If you wan't to autodeploy on push.
And many more automation.

## Config

You can choose branches and actions for which to trigger the pipeline.

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

Add triggers to your pipeline definition.

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
