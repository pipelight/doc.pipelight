# Log Files

## Print logs

Every log is printed with [tslog](https://tslog.js.org/)
And it is saved as .json in the log folder **.simp/logs/**

Display last trigger logs with the CLI.

```bash
simp logs
```

The non-verbose "minimal" output looks actually like that.
And is likely to change for the better.

<p align="center">
  <img height="400" src="https://simp.areskul.com/images/logs.png" alt="pretty logs">
</p>

##File tree

Hooks execution generates log files.
Located in .simp/logs/[pipeline]/ and queriable with the cli.

It's just a the standard cli stdout.

## Comming soon

Or display logs by pipeline

```bash
simp logs --pipeline <pipeline name>
```
