<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# The tasks you want to use pipelight for

## Bettern your bash scripts

People usualy seek automation because they face repetitive thus painful tasks of varied nature.
And they go down the road of automation

- 1: edit a shell script (quick)
- **Pipelight**
- 2: make a python,javascript or either perl script (too specific, not reusable without effort)
- 3: set up a cicd pipeline with its ecosystem (cumbersome)

Pipelight ought to be the least painfull solution to set up, after you made a bash srcipt.

## Software devlopment and deployment

### Client side

Client side automation (on pre-push, pre-commit...) to build and test before pushing to production branches.

If you can't do the heavy work on your servers, you may want to do it localy with the latent power that resides in your PC.
Build your software locally and send the result to your remote servers as:

- an archive
- a docker image
- whatever your fantasy is

It allows me to stick to [linode](https://www.linode.com/pricing/#compute-shared) minimum server costs.

### Server side

Deploy (on pre-receive)

# Why using pipelight over other tools

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
