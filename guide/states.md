# States

The pipeline have a global state.
But every step and commands have a state too.

Here is a partial json log containing a step with a single command.
The state can be as the **status** key:

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

State is render as a color in pretty logs.

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

The Aborted status means that something stopped the pipeline execution.
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
