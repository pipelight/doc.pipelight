<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
import Schema from '@components/Schema.vue';
import Features from "@components/Features.vue";
import Logs from "@demos/Logs.vue";
</script>

# What is Pipelight ?

**Pipelight is a tiny command line tool that executes a list of tasks you
provided in a configuration file.**
Its ultimate goal is to automate your most boring tasks by enhancing
**your** favorite tools.

Mainly written in Rust.

::: warning

Pipelight is a young software, therefore it has some early features
flagged as beta(yellow) and alpha(red).

Its caveats are discussed into
warning(yellow) and danger(red) containers like this one.

:::

## Alternatives

You can have a quick idea of where pipelight stands in the automation ecosystem if
you know some of its alternatives.

Mature Command runners:

- [Just](https://github.com/casey/just) with a justfile
- [Make](https://makefiletutorial.com/) with a makefile

Bigger software suits with Gui:

- [Drone](https://www.drone.io/) which uses a .drone.yml
- [Gitlab](https://docs.gitlab.com/ee/ci/)

Pipelight has a syntax pretty close to:

- [Cicada](https://github.com/cicadahq/cicada)
- [Katoa](https://github.com/katoahq/katoa)

## The core concept

The truth about the core of the tool is that it is absurdly simple.

**Pipelight only defines an execution worklow**, which is the order in which the commands
will be executed and what to do on the few possible outcomes (exit status).

Basically, it **encapsulates your shell commands into another language**
and executes them in the given order.
Currently supported languages are Toml, Hcl, Yaml, Javascript and Typescript.

Commands are grouped by Steps and put inside a Pipeline.

::: code-group

```rs [pseudo-code]
// A pipeline written in pseudo-code
Pipeline {
    Step {
        Command {
            // Bash string
            echo $PWD
        }
    }
}
```

```toml [toml]
# A working pipeline written in toml
[[pipelines]]
name = "example"
[[pipelines.steps]]
name = "step1"
commands = [
    # Bash string
    "echo $PWD"
]

```

```yaml [yaml]
# A working pipeline written in yaml
pipelines:
  - name: example
    steps:
      - name: "step1"
        commands:
          # Bash string
          - echo $PWD
```

```hcl
# A working pipeline written in hcl
pipelines = [{
  name = "example"
  steps = [{
    name     = "step1"
    commands = [
      # Bash string
      "echo $PWD"
    ]
  }]
}]
```

```js [javascript]
export default {
  pipelines: {
    name: "example",
    steps: [
      {
        name: "step1",
        commands: [
          // Bash string
          "echo $PWD"
        ]
      }
    ]
  }
};
```

:::

Encapsulating bash commands into a **structure** and even in a **programming language**
brings us some significant advantages over a simple script.

- You can enjoy writting in your preferred programming languages.
- Have a better debugging experience with verbose logging that display duration, exit status,...
- Your workflow benefits from automatic triggers (git events, on file change...).
  _Practical if you can't exit vim_ 😁

## The execution workflow

So what happens internally when you run this pipeline with for example: `p run example`?

1. First, the pipelight executable **reads your config** file `pipelight.toml` and parses it into a convenient internal structure.

2. Then, it processes the parsed pipeline definition.
   The executable **spawns the commands into subprocesses**,
   read their outputs and write them into json log files (stored in `.pipelight/`).

<Schema/>

3. Finally, it parses the json logs from `.pipelight/` into a something more readable and with well-thought verbosity levels.
   The pipeline is by default executed in the background and you can check its
   status by printing the logs in your terminal.
   Print them with `p logs -vv`.

## Delegate to the old fashioned tools.

Pipelight is light because it only implements basic functionnalities by
delegating crucial functionnalities to the appropriate specialized tools such as
Git, Watchexec and Deno (typescript/javascript runtime).

<div class="flex justify-center">
    <img loading="lazy" src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes" class="sm">
</div>

See the core of Pipelight as Ferris (rust mascot) making the heavy lift.

- On the first hand, it uses wichever language like Javascript/Typescript to **manipulate bash
  strings**.
- And on the other it uses Git as an **event listener**.

For every internal tasks, pipelight relies on well known rust crates (std,
serde, rustix, watchexec, miette, tabled, gix...).

## As close to the kernel as possible.

Pipelight uses the provided **kernel functions for process management**.

Being this tightly coupled to the Linux kernel allows us to have very few
software internal code that could disrupt processes execution without reporting.

Resulting in **highly verbose** and **transparent logs**.

## Best features!

### Code in your config file.

As a pipeline gets complex, you want to add variables, conditions, loops and
more. Pipelight allows you to **code in your configuration file** to create
reusable configuration blocks (with Typescript).

### Terminal friendly (CLI)

Run a pipeline and check logs **without leaving your terminal**. Pipelight
remains in the terminal, and is finally nothing more than a Command Line
Tool/Interface.

```sh
# CLI feels like home
pipelight run
```

### Project global state

Get a quick glimps of the project health.

```sh
pipelight ls -vv
```

<div class="flex justify-start">
    <img loading="lazy" src="/images/list_vv.png" alt="list_vv" class="md">
</div>

### Quick Automation

Add triggers to your pipeline definition.
The pipeline automatically runs in the background on matching event (a triggering action and/or a git branch or tag).

```toml
[[pipelines.triggers]]
actions = ["pre-push"]
branches = ["master"]
```

```ts
triggers: [
  {
    actions: ["pre-push"],
    branches: ["master"],
  },
],
```

### Pretty logs

```sh
pipelight logs
```

<Logs/>

You also can increase verbosity and get an exhaustive tree view of the pipeline.
