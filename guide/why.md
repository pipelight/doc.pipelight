<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# Why using pipelight ?

Pipelight ought to be the fastest and least painfull solution to set up if you seek to automate things.
If you are a Bash guy, it will bring simplicity to your scripts.
If you do DevOps stuffs, it will bring flexibility to your pipelines.

It will furthermore keep big techs out of your code, while creating basic to powerful automation scripts/pipelines.

## The solution to the harsh automation path -> Bettern your shell scripts

People usualy seek automation because they face repetitive thus painful tasks of varied nature.
And they go down the road of automation:

- 1: They edit a shell script (it is quick but lacks logging)
- 2: Then they write a python,javascript or either perl script (but it is too specific, not reusable without many efforts)
- 3: Finally they set up a CICD pipeline with its entire ecosystem (ressource and time consumming)

On the automation road Pipelight comes
write after the shell script in term of simplicity while still being the same kind of software used in the third step.

- 1: edit a shell script (quick but lacks logging)
- **Pipelight**
- 2: make a python,javascript or either perl script (too specific, not reusable without effort)
- 3: set up a cicd pipeline with its ecosystem (ressource and time consumming)

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

## Why using pipelight over other tools?

<Features />

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
