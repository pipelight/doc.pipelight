<script setup lang="ts">
import LogsMulti from "@demos/LogsMulti.vue";
import Logs from "@demos/Logs.vue";
import LogsV from "@demos/LogsV.vue";
import LogsVV from "@demos/LogsVV.vue";
import LogsVVV from "@demos/LogsVVV.vue";
import LogsVVVV from "@demos/LogsVVVV.vue";
</script>

# The pipeline logs

::: tip Json support

For purist, there is a **Json** output available with `pipelight logs --json`.

:::

The default log output is the following **pretty tree** output.

## Pipeline status (global status)

**A pipeline can be either running, succeeded, failed or aborted.**

Other existing status are for internal purpopse and are only discussed in the
source code.

<LogsMulti/>

**Running** status is when a pipeline execution isn't finished yet.

**Succeeded** status is when a command of the pipeline normally succeeded with
an exit status.

**Failed** status is when a command of the pipeline normally failed with an exit
status (as opposed to aborted).

**Aborted** status means that something unexpected interupted the pipeline
execution.

It can be due to:

- a resource outage.
- a linux signal like SIGKILL or SIGTERM.
- a Ctrl-C on a running attached pipeline.
- litteraly everything that can abrubtly stop a process execution (coffee on
  keyboard, angry mother...)

::: warning Corrupted logs

Corrupted logs are rare but can occur on unsanitized aborted pipelines log files
or on a concurrent Read and Write operation.

They are actually removed from the log output (with a discrete warning message).
I am working on a way to recover them when possible and flag them as
`corrupted`.

:::

## Verbosity levels

A pipeline has **5** verbosity levels.

### Error level (default)

The first level displays global informations.

- pipeline status
- date it was triggered at
- environment in which it was triggered, which includes:
  - branch, or tag name if the project has a git repository.
  - [action](/guide/triggers/definition#actions) that triggered the pipeline execution
  - the commit number if the project has a git repository.
- pipeline name
- whole pipeline execution time

<Logs/>

### Warn level (-v)

The second level shows additional informations about the inside of the pipeline.
it adds:

- steps names
- steps execution time

<LogsV/>

### Info level (-vv)

Adds:

- command list (process stdin)
- command execution time

<LogsVV/>

### Debug level (-vvv)

Diplay the command output

- stdout on success

  or

- stderr on failure

<LogsVVV/>

### Trace level (-vvvv)

::: tip

Some tools such as linters, docker, nixos... usually print their activity/logs to stderr.
You may want to use the trace level log to checkout your command progress.

:::

Displays every command output.

- stdout
- stderr

Some processes default output on stderr, and doesn't display much on success.
This log level is practical if you want to see what happenned or what happens:

- when you run tests (cargo run tests)
- when you linte files (deno lint)
- on a docker command (docker build)

<LogsVVVV/>

## Raw logs (Json)

Logs are stored in your project root directory in the `.pipelight/logs` folder
in JSON format. You can checkout raw logs directly by inspecting the generated
files or with the following commands:

```sh
pipelight logs --json | jq
pipelight logs --json | jq -C | less
```

## Other commands

You can inspect logs by pipeline name.

```sh
pipelight logs <pipeline_name>
```

Keep a colorful output in pagers.

```sh
pipelight logs --color always | less
```

Print colorful raw json logs in pagers (debugging)

```sh
pipelight logs --json | jq -C | less
```

Prune/Remove logs

As of today, no log rotation has been implemented. The best way to remove
corrupted logs or to clean the log directory is with the following commands.

```sh
pipelight logs rm
```

Which does not erase the log of running pipelines.

```sh
rm -rf .pipelight
# pkill pipelight
```

Which erases every log files.
