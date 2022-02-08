# Log Files

## Print logs

Every log is printed with [tslog](https://tslog.js.org/)
in stdout/stderr when triggering a pipeline..
And it is saved in the log folder **.simp/logs/**

## Comming soon

Display last logs of every triggers with the CLI.

```bash
simp logs
```

Or display logs by pipeline

```bash
simp logs --pipeline <pipeline name>
```

## File tree

Hooks execution generates log files.
Located in .simp/logs/[pipeline]/ and queriable with the cli.

It's just a the standard cli stdout.
