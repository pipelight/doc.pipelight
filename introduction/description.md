<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
</script>

# What is pipelight ?

**It's a tiny command line tool that executes a list of tasks you provided in a configuration file.**

# What is it made of ?

It is mainly made in Rust.
Made on top of Deno, and Rust most known crates (std, serde, rustix, watchexec, miette...)

# What it brings on the table!

## Code as Configuration as Code

As a pipeline get complex, you want to add variables, conditions, loops and more.

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
