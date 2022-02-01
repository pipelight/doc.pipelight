# Git Hooks (Here we are!)

That is what interest you if you wan't to autodeploy on push.
And many more...

## Principle

You can choose branch and action for which to trigger the pipeline.

```js
//simp.config.js
...

pipelines: [
  {
    name: "test",
    steps: [
      {
        name: "build",
        commands: ["yarn install", "yarn build"]
        // See ?! Here are your bash commands! :D
      }
    ],
    trigger: {
      branch: ["main"],
      event: ["push"]
    }
  }
];

...
```

Those files are processed in commonjs through rollup.
And symlinked from .simp/hooks/cjs to .git/hooks

Note: git hooks have no file extension.

```js
//simp.hook.template
#!/usr/bin/node

console.log('done')

```
