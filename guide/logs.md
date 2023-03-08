# Log Files

## Print logs

You can either display **raw json logs** for further exploitation,

```sh
pipelight logs --json
```

or display **pretty logs** which is the command default behavior.

```sh
pipelight logs
```

You get every last "RUN" every time you check logs.

<p align="center">
  <img class="terminal" src="/images/log_level1.png" alt="pretty_verbose_logs_level_1_picture">
</p>

You can then and verbosity to get your desired level of details.

```sh
pipelight logs -v
```

<p align="center">
  <img class="terminal" src="/images/log_level2.png" alt="pretty_verbose_logs_level_2_picture">
</p>

```sh
pipelight logs -vv
```

<p align="center">
  <img class="terminal" src="/images/log_level3.png" alt="pretty verbose logs picture">
</p>

The maximum log level displays commands result.

```sh
pipelight logs -vvv
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level4.png" alt="pretty verbose logs picture">
</p>

You can inspect logs by pipeline

```sh
pipelight logs <pipeline_name>
```

And delete old logs with

```sh
pipelight logs rm
```

## Generated files

Pipeline execution generates log files.
Located in .pipelight/logs/<pipeline_uuid>.json
