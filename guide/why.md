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

- **Enforce code quality**,

  You can write pipelines to test your code before pushing it to production branches.

- **Save cloud costs**,

  Make the **heavy computation locally**,
  Build and only send the resulting archive or image to your remote servers.

### Server side

Server side automation is achieved by using specific triggers too (on update, pre-receive...).

- **Ease team work**,

  Trigger pipelines directly on the remote once git has resolved.
  Same as using a conventional cicd in cloud provider.

- **Better debugging**,

  Pipelight logs are verbose and easy to access.
  You won't ever miss a single byte of a pipeline execution (real commands, stdin, stdout and return statements).

## Made for efficency

Pipelight is written in [Rust](https://www.rust-lang.org/).
It is quite light when installed and uncompressed.
Binaries actually weights under 6Mb (decreased by 50% between v0.5.8 and v0.6.2).

In consequence, it is blazing fast.

It has the minimum required functions for a cicd tool
and delegate features to the already widely spread specialized softwares.

- Git for software versioning and event detection
- Linux for security and access rights

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets nor plugins.
It implements basic functionalities by keeping it's source code **tightly coupled to Linux and [Git](https://git-scm.com/)**.

## Typescript (Code as Configuration as Code)

As a pipeline get complex, you want to add variables, conditions, loops and more.
Check the [Cookbook](/cookbook/tips) for examples.

While other tools are about Configuration as Code,
Pipelight gets one step further and allows you to **code in your configuration file** to create reusable configuration blocks (with Typescript).

## Terminal friendly (CLI)

Run a pipeline and check logs without living your terminal.
Pipelight stays in the terminal, and is finally nothing more than a Command Line Tool/Interface.

```sh
pipelight run
```

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

## Pretty Logs in terminal / Json logs in files

Check the [Logs section](/guide/logs) for examples.

## Easy to install

Check the [Starting guide](/guide/).
