# Getting Started

## Install

Install cli

```bash
yarn gloabl add simpcicd
```

```bash
npm install -g simpcicd
```

And helpers

```bash
yarn add -D simpcicd
```

```bash
npm install --save-dev simpcicd
```

## Cli

### Usage

```bash
# in your favorite shell
simp <command> <options> <args>
```

For short.
This will trigger a pipeline execution

```bash
simp trigger --pipeline <pipeline name>
```

This will transform your pipelines in git hooks.
So that triggering is automated according to your git actions.

```bash
simp hooks
```

## Config

Here is an example of what could contain a basic config file (simp.config.mjs)

```js
//simp.config.mjs
export default {
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
```
