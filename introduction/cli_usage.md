# Getting Started

## Command line usage

::: info 

Pipelight seeks the nearest configuration file

:::

```sh
# in your favorite shell
pipelight <command> <options> <args>
```

Here is the set of most used commands.

List available pipelines:

```sh
pipelight ls
```

Pretty print a pipeline definition on stdout:

```sh
# Display a selection prompt
pipelight inspect
# or
pipelight inspect <pipeline_name>
```

Trigger a pipeline execution:

```sh
# Display a selection prompt
pipelight run
# or
pipelight run <pipeline_name>
```

Compulsively check execution state:

```sh
pipelight logs -vvv
```

<p align="center">
  <img class="terminal" src="/images/log_level_4.png" alt="pretty verbose logs picture">
</p>

_The actulal pipeline to deploy this website._
