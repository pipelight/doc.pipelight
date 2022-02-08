# Git Hooks (Here we are!)

If you wan't to autodeploy on push.
And many more automation.

## Config

You can choose branch and action for which to trigger the pipeline.
Actions are named according to [git-hooks](https://githooks.com/) names.

```ts
//simp.config.ts
...

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
      branches: ["main"],
      actions: ["pre-push"]
    }
  }
];

...
```

# Comming Soon

## Create custom script hooks

### Manually

You can put a scrit under .simp/hooks/src/${git-hook name}.${branch name}.ts

Example : The file pre-commit.master.ts will be executed each time you commit to master

It will be executed if conditions are met

### Or with the api

Using a callback function and params

```ts
toHook();
```
