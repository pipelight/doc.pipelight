<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
import Schema from '@components/Schema.vue';
</script>

# What is pipelight ?

## In a few words

**It's a tiny command line tool that executes a list of tasks you provided in a configuration file.**

Tasks are grouped by steps which together result in a pipeline, as represented in the following pseudo-code.

```rs
// This is a pipeline in Pseudo code
Pipeline {
    Step {
        Command {"echo test" },
        Command { "cat .gitignore" }
    }
    Step {
        Command {"other bash command" }
    }
}
```

The pipeline is by default executed in the background and
you can check its state by printing the logs in your terminal.

### It's a rust based cli

It is made in Rust.
Mainly build on top of Deno and Rust most known crates (std, serde, rustix, watchexec, miette...)

## Best features

### Code as Configuration as Code

As a pipeline get complex, you want to add variables, conditions, loops and more.

While other tools are about Configuration as Code,
Pipelight gets one step further and allows you to **code in your configuration file** to create reusable configuration blocks (with Typescript).

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

## How it works ?

### TL;DR

Basically, it **encapsulates your shell commands into another language.**

This encapsulation provides you logging features and automatic triggers.
Moreover it adds easy programming language abilities by bringing Javascript/Typescript (Toml and Yaml) syntax to your script.

### The core concept

The truth about the core of the tool is that it is absurdly simple.
**Pipelight only defines an execution worklow**, which is the order in which the commands will be executed
and what to do on the few possible exit status.

Your config file whatever language it is written in, only have to return an **Object** of type Pipeline.
And this Object will be handled by Pipelight.

<Schema/>

### Delegate to the old fashioned tools

Things like event listening, code linting, process spawning, logging and so on isn't really handled by pipelight.
It heavily rely on old well known preexisting tools.
If Pipelight is only a framework to glue commands together, it's code isn't much different.
It is good old fashioned commands glued together by a few lines of code.
It brings nothing new exept the way it uses those tools together.

To summarize:

See the core of Pipelight as Ferris (rust mascot) making the heavy lift.

- On the first hand, it uses Javascript/Typescript to **manipulate bash strings**.
- And on the other it uses Git as an **event detector**.

<div class="flex justify-center">
    <img src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes" class="sm">
</div>
