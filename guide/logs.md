# Log Files

## Print logs

Display pretty logs

```bash
simp logs
```

and increase verbosity to get your desired level of details.

```bash
simp logs -v
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/logs.png" alt="pretty verbose logs picture">
</p>

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
