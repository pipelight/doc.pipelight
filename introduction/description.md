<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
import Schema from '@components/Schema.vue';
import Features from "@components/Features.vue";
</script>

# Introduction

## What is pipelight ?

**It's a tiny command line tool that executes a list of tasks you provided in a configuration file.**

Written in Rust (90%) and Typescript (10%)

Perfect for:

- Small repetitive task automation,
- CICD (Continuous Integration & Continuous Deployment),
- Machine provisionning
- Infrastructure creation.

## The core concept

The truth about the core of the tool is that it is absurdly simple.
**Pipelight only defines an execution worklow**, which is the order in which the commands will be executed
and what to do on the few possible exit status.

Basically, it **encapsulates your shell commands into another language.** (Typescript, Javascript, Toml and Yaml)
Commands are put inside a Pipeline and grouped by Steps.

```rs
// A pipeline in pseudo code
Pipeline {
    Step {
        Command
    }
}
```

This encapsulation brings you:

- verbose logging,
- automatic triggers,
- easy programming language abilities

So when you run a pipeline,

1. First, Pipelight read the config file.
   Typescript is executed and return a JSON pipeline definition.

2. Then only, it processes the pipeline definition.
   Pipelight spawns the commands into subprocesses while writting the outputs into log files.

<Schema/>

The pipeline is by default executed in the background and
you can check its state by printing the logs in your terminal.

## Delegate to the old fashioned tools

Pipelight is fast because it only implements basic functionnalities by beeing tightly coupled to Linux kernel,
and remains lightweight by delegating crucial functionnalities
to the appropriate specialized tools such as Git, Watchexec and Deno (Javascript engine),

<div class="flex justify-center">
    <img src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes" class="sm">
</div>

See the core of Pipelight as Ferris (rust mascot) making the heavy lift.

- On the first hand, it uses Javascript/Typescript to **manipulate bash strings**.
- And on the other it uses Git as an **event detector**.

For every others subsidiary tasks, pipelight heavily relays on popular rust crates (std, serde, rustix, watchexec, miette...)

## Who is it for ?

For every nerd that seeks fast and simple automation.

But simple doesn't mean simplistic.
Complexe pipelines and behavior can still be achived in easy ways
with Pipelight.

### Lazy programmers

Config is written in Javascript/Typescript to allow variables, loops and functions usage.
to end the struggle with CICD pipelines written in configuration optimised languages (YAML/TOML).
If you come from devOps, see it as Code as Config as Code.

### Frugal Power User

I've been working with quite small servers, that struggle to build docker images, forget about kubernetes, graphana and so on.
But I have powerful local computers.
Pipelight allows me to git-push from a machine, build on another, and send the result on my tiny server,
so I can decrease by two third the money I used to spend in Cloud ressources.

### Heavy workers

When I need to deploy a machine, install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools.

## Why using Pipelight ?

### Random task automation and parallelism

Can be used to automate everyday tasks.

### Software development

#### Continuous deployment (CD)

With a **single file** in your root directory, you can define pipelines that will run either
**client-side, server-side or both.**

#### Client side

On your computer, you can enable client side automation by using specific triggers (on pre-push, pre-commit...).

- **Enforce code quality**,

  You can write pipelines to test your code before pushing it to production branches.

- **Save cloud costs**,

  Make the **heavy computation locally**,
  Build and only send the resulting archive or image to your remote servers.

#### Server side

Server side automation is achieved by using specific triggers too (on update, pre-receive...).

- **Ease team work**,

  Trigger pipelines directly on the remote once git has resolved.
  Same as using a conventional cicd in cloud provider.

- **Better debugging**,

  Pipelight logs are verbose and easy to access.
  You won't ever miss a single byte of a pipeline execution (real commands, stdin, stdout and return statements).

### Server provisionning

Can be used to wrap ansible or to replace it.

## Best features

<Features/>

### Code in your config file

As a pipeline get complex, you want to add variables, conditions, loops and more.

While other tools are about Configuration as Code,
Pipelight gets one step further and allows you to **code in your configuration file** to create reusable configuration blocks (with Typescript).
You may call it as Code as Configuration as Code 🥴.

### Terminal friendly (CLI)

Run a pipeline and check logs without living your terminal.
Pipelight stays in the terminal, and is finally nothing more than a Command Line Tool/Interface.

```sh
pipelight run
```

### Quick Automation

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
