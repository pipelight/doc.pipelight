# Log Files

## Print logs

Display pretty logs

```bash
simp logs
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level1.png" alt="pretty verbose logs picture">
</p>

and increase verbosity to get your desired level of details.

```bash
simp logs -v
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level2.png" alt="pretty verbose logs picture">
</p>

```bash
simp logs -vv
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level3.png" alt="pretty verbose logs picture">
</p>

The maximum log level displays commands result.

```bash
simp logs -vvv
```

You can inspect logs by pipeline

```bash
simp logs <pipeline_name>
```

And delete old logs with

```bash
simp logs rm
```

## Generated files

Pipeline execution generates log files.
Located in .pipelight/logs/<pipeline_uuid>.json
