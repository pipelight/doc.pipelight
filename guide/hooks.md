# Git Hooks (Here we are!)

If you wan't to autodeploy on push.
And many more automation.

## Config

You can choose branch and action for which to trigger the pipeline.
Actions are named according to [git-hooks](https://githooks.com/) names.

```js
//simp.config.mjs
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
