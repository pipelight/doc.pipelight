<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# Why using pipelight ?

<Features />

## Typescript (Code as Configuration)

As a pipeline get complexe, you want to add variables, conditions, loops and more.
Check the [Cookbook](/cookbook/tips) for examples.

## Pretty Logs in terminal

Check the [Logs section](/guide/logs) for examples.

## Made for efficency

Pipelight is written in [Rust](https://www.rust-lang.org/), so it's fast!!

It has the minimum required functions for a cicd tool
and give up on features that should be run by specialized softwares.

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and [Git](https://git-scm.com/).

## Quick Automation

Add triggers to your pipeline definition.
It will automatically run in the background on matching event and git branch.

```ts
//pipelight.config.ts
triggers: [
  {
    actions: ["pre-push"],
    branches: ["master"],
  },
],
```

## Terminal friendly

Run a pipeline and check logs without living your terminal.
Pipelight stays in the terminal, and is nothing more than a Command Line Tool.

## Easy to install

Check the [Starting guide](/guide/).
