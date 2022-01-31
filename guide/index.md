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
## in your terminal
simp <command> <options> <args>
```

For short.
This will trigger a pipeline execution

```bash
simp trigger --pipeline <pipeline name>
```

This will transform your pipelines in git hooks

```bash
simp hooks
```

### Config

Here is a simple example of what could contain simp.config.json

```js
//simp.config.js
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
      branch: ["master", "dev"]
    }
  }
];
```
