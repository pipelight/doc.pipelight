<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# Why using pipelight ?

Pipelight ought to be the least painfull solution to set up if you seek automation.

## Bettern your shell scripts

People usualy seek automation because they face repetitive thus painful tasks of varied nature.
And they go down the road of automation:

- 1: edit a shell script (quick but lacks logging)
- **Pipelight**
- 2: make a python,javascript or either perl script (too specific, not reusable without effort)
- 3: set up a cicd pipeline with its ecosystem (ressource and time consumming)

Running a pipeline instead of a shell script will provide you logging features and automation.
Writting a pipeline instead of a shell script will bring Typescript, Toml or Yaml syntax/abilities to your script.
Basicaly it encapsulate your shell commands into another language.

## Software development and deployment (CICD)

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

Generate automation scripts by using pipelight a first time on this repo with.

```sh
pipelight ls
```

## Why using pipelight over other tools?

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
