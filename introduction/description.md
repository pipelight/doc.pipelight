<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
import Schema from '@components/Schema.vue';
import Features from "@components/Features.vue";
</script>

# Introduction

## What is pipelight ?

**Pipelight is a tiny command line tool that executes a list of tasks you
provided in a configuration file.**

Written in Rust (90%) and Typescript (10%)

Perfect for:

- Small repetitive task automation,
- CICD (Continuous Integration & Continuous Deployment),
- Machine provisionning
- Infrastructure creation.

## Alternatives

You can make a quick idea of where is pipelight in the automation ecosystemif if
you know some of its alternatives.

Mature Command runners:

- [Just](https://github.com/casey/just) with justfile
- [Make](https://makefiletutorial.com/) with makefile

Bigger software suits with Gui:

- [Drone](https://www.drone.io/) which uses a .drone.yml
- [Gitlab](https://docs.gitlab.com/ee/ci/)

Pipelight has a syntax pretty close to:

- [Cicada](https://github.com/cicadahq/cicada)

## The core concept

Pipelight ultimate goal is to automate your most boring tasks by enhancing
**your** favorite tools.

The truth about the core of the tool is that it is absurdly simple. **Pipelight
only defines an execution worklow**, which is the order in which the commands
will be executed and what to do on the few possible exit status.

Basically, it **encapsulates your shell commands into another language**
(Typescript, Javascript, Toml and Yaml). Commands are put inside a Pipeline and
grouped by Steps.

```rs
// A pipeline in pseudo code
Pipeline {
    Step {
        Command
    }
}
```

This encapsulation brings you:

- easy programming language abilities,
- automatic triggers,
- verbose logging

So when you run a pipeline:

1. First, Pipelight read the config file. Typescript is executed and return a
   JSON pipeline definition.

2. Then only, it processes the JSON pipeline definition. Pipelight spawns the
   commands into subprocesses while writting the outputs into log files.

<Schema/>

The pipeline is by default executed in the background and you can check its
state by printing the logs in your terminal.

## Delegate to the old fashioned tools

Pipelight is fast because it only implements basic functionnalities by beeing
tightly coupled to Linux kernel, and remains lightweight by delegating crucial
functionnalities to the appropriate specialized tools such as Git, Watchexec and
Deno (Javascript engine),

<div class="flex justify-center">
    <img src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes" class="sm">
</div>

See the core of Pipelight as Ferris (rust mascot) making the heavy lift.

- On the first hand, it uses Javascript/Typescript to **manipulate bash
  strings**.
- And on the other it uses Git as an **event detector**.

For every internal tasks, pipelight heavily relays on popular rust crates (std,
serde, rustix, watchexec, miette...)

## Who is it for ?

**For every nerd that seeks fast and simple automation that can keep up to their
needs and adapt quick.**

But simple doesn't mean simplistic. Although you will first encounter simple
pipelines definitions, complex and avant-gardist pipeline behaviors can still be
achived with a minimal overhead.

### Pragmatic Programmers

It end the struggle with configuration optimised languages (YAML/TOML).

Instead of combining multiple keywords and flags, the pipeline logic can be
written in Javascript/Typescript. You van then define pipelines with concepts
you are already comfortable with like variables, loops and functions.

### Frugal Power User

Decrease by two third the money spent in the Cloud by using local computing
ressources.

You can push code from a machine, build on another, and send the resulting
archive on hosting servers. It allows you to use the latent computing power
where it resides and drastically diminish cloud computing costs.

### Manianimous Builders

Glue your synergetic tools together within a pipeline (Libvirt, Docker, Ansible,
pure Bash...). It then becomes pretty simple to share variables and environments
between them.

The result is you can dig out of the ground complete infrastructures, deploy
multiple virtual machines, containers, and provision them with different
environments with a uniq and on the fly configurable pipeline.

## For which tasks using Pipelight ?

### Software development

With a **single file** in your root directory, you can define pipelines that
will run either **client-side, server-side or both.**

#### Client side

On your computer, you can enable client side automation by using specific
triggers (on pre-push, pre-commit...).

- **Enforce code quality**,

  You can write pipelines to test your code before pushing it to production
  branches.

- **Save cloud costs**,

  Make the **heavy computation locally**, Build and only send the resulting
  archive or image to your remote servers.

#### Server side

Server side automation can be achieved by using server-side triggers (on update,
pre-receive...).

- **Ease team work**,

  Trigger pipelines directly on the remote once git has resolved. Same as using
  a conventional cicd in cloud provider.

- **Better debugging**,

  Pipelight logs are verbose and easy to access. You won't ever miss a single
  byte of a pipeline execution (real commands, stdin, stdout and return
  statements).

### Others

- Everyday tasks automation,
- Server provisionning,
- Run heavy workloads, parallelize tasks on your servers

## Best features

### Code in your config file

As a pipeline get complex, you want to add variables, conditions, loops and
more.

While other tools are about Configuration as Code, Pipelight gets one step
further and allows you to **code in your configuration file** to create reusable
configuration blocks (with Typescript). You may call it as Code as Configuration
as Code 🥴.

### Terminal friendly (CLI) & Pretty logs

Run a pipeline and check logs without living your terminal. Pipelight stays in
the terminal, and is finally nothing more than a Command Line Tool/Interface.

```sh
pipelight run
```

```sh
pipelight logs
```

### Quick Automation

Enable triggers, and ddd triggers to your pipeline definition. The pipeline will
automatically run in the background on matching events.

```ts
triggers: [
  {
    actions: ["pre-push"],
    branches: ["master"],
  },
],
```
