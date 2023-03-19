# Logs and States

## States

While reading logs, you will encouter some colors which define a state.
Each pipeline elements has a state which can be started, running, failed, aborted or succeedeed.
The Pipeline state is the global state.
Each of its steps have a state too.
and each of them commands have an individual state too.

### States in JSON logs

Here is a partial json log with a step whose state can be seen as the **status** key:

```json{3}
{
  "name": "update remote nginx configuration",
  "status": "Succeeded",
  "duration": { "secs": 3, "nanos": 55221486 }
}
```

### States in pretty logs

A state is render as a color when you check pretty logs.

Here, some commands in the step are still running.
The Running state is render as green.

<p align="center">
  <img class="terminal" src="/images/running_log_level_2.png" alt="pretty_verbose_logs_level_2_picture">
</p>

Here, one of the commands of the step failed.
With no surprise the failed state is rendered in red.

<p align="center">
  <img class="terminal" src="/images/failed_log_level_2.png" alt="pretty_verbose_logs_level_2_picture">
</p>

The Aborted state means that something stopped the pipeline execution.
It is eather a linux signal like SIGKILL or SIGTERM or a Ctrl-C on an attached pipeline running.
It's rendered in yellow.

<p align="center">
  <img class="terminal" src="/images/aborted_log_level_2.png" alt="pretty_verbose_logs_level_2_picture">
</p>

Finnaly if everything goes well, succeeded state is rendered in blue.
Here every command of every step has succeeded.

<p align="center">
  <img class="terminal" src="/images/log_level_2.png" alt="pretty_verbose_logs_level_2_picture">
</p>

## Log Files

### Display logs

You can either display **raw json logs** for further exploitation,

```sh
pipelight logs --json
```

```json
{
  "name": "update remote nginx configuration",
  "status": "Succeeded",
  "duration": { "secs": 3, "nanos": 55221486 },
  "commands": [
    {
      "status": "Succeeded",
      "duration": { "secs": 1, "nanos": 260966718 },
      "stdin": "scp ./public/pipelight.nginx.conf linode:/etc/nginx/sites-enabled/pipelight.conf",
      "output": {
        "status": "Succeeded",
        "stdout": null,
        "stderr": null
      }
    }
  ]
}
```

or display **pretty logs** which is the command default behavior.

```sh
pipelight logs
```

You get every last "RUN" every time you check logs.

<p align="center">
  <img class="terminal" src="/images/log_level_1.png" alt="pretty_verbose_logs_level_1_picture">
</p>

You can then increase verbosity to get your desired level of details.
Get steps state

```sh
pipelight logs -v
```

<p align="center">
  <img class="terminal" src="/images/log_level_2.png" alt="pretty_verbose_logs_level_2_picture">
</p>

Get steps state and their commands state

```sh
pipelight logs -vv
```

<p align="center">
  <img class="terminal" src="/images/log_level_3.png" alt="pretty verbose logs picture">
</p>

Get steps state, their commands state, and commands output.

```sh
pipelight logs -vvv
```

<p align="center">
  <img class="terminal" src="/images/log_level_4.png" alt="pretty verbose logs picture">
</p>

You can inspect logs by pipeline

```sh
pipelight logs <pipeline_name>
```

And delete old logs with

```sh
pipelight logs rm
```

### Generated files

Pipeline execution generates log files.
Located in .pipelight/logs/<pipeline_uuid>.json
Those are not meant to be used as is.
Prefer reading logs with the available commands.
