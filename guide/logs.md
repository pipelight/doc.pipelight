# Log Files

## Print logs

Every log is printed with tslog in stdout when triggering pipeline..
And it is saved under the log folder under.

.simp/logs/

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
