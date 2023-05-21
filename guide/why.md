<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# Why using pipelight ?

## TL;DR

<Features />

## Software development and deployment (CICD)

You can define pipelines that will run client-side and/or server-side.

### Client side

On your computer, you can enable client side automation by using specific triggers (on pre-push, pre-commit...).

To **enforce code quality**,
you can write pipelines to build and test your code before pushing it to production branches.

For financial reasons:
If you can't do the heavy work on your servers, you may want to do it localy with the latent power that resides in your PC.
Make the **heavy computation locally**, like building your software and then only send the resulting archive or image to your remote servers as

It allows me to stick to my provider **minimum server costs**.

### Server side

Server side automation is achieved by using specific triggers too (on update, pre-receive...).

Let's say:

- you host your code on Gitea and have a pipelight config file on the root of this repo.
- you run a linux server.

To execute pipelines server-side, you need to add another remote url to your git repository.
This url must point to the repo clone hosted on your linux server.

## Typescript (Code as Configuration as Code)

As a pipeline get complexe, you want to add variables, conditions, loops and more.
Check the [Cookbook](/cookbook/tips) for examples.

Where other tools are about Configuration as Code,
Pipelight get on step further and allows you to code in your configuration file to create reusable configuration blocks (with Typescript).
So it becomes Code as Configuration as Code.

## Pretty Logs in terminal / Json logs in files

Check the [Logs section](/guide/logs) for examples.

## Made for efficency

Pipelight is written in [Rust](https://www.rust-lang.org/), so it's fast!!

It has the minimum required functions for a cicd tool
and give up on features that should be run by specialized softwares. (like git for software versionning)

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnalities by keeping it's source code tightly coupled to Linux and [Git](https://git-scm.com/).

## Quick Automation

Add triggers to your pipeline definition.
It will automatically run in the background on matching event and git branch.

```ts
triggers: [
  {
    actions: ["pre-push"],
    branches: ["master"],
  },
],
```

## Terminal friendly

Run a pipeline and check logs without living your terminal.
Pipelight stays in the terminal, and is finally nothing more than a Command Line Tool. (>12M binaries)

## Easy to install

Check the [Starting guide](/guide/).
