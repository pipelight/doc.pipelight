# Master the Cli

## Useful commands

Print config with:

```bash
simp --print-config
```

Trigger a pipeline execution

```bash
simp trigger --pipeline <pipeline name>
```

or use shorthand

```bash
simp trigger -p <pipeline name>
```

Verbose pipeline execution.

```bash
simp trigger --pipeline <pipeline name> --verbose
```

Generate hooks (Automation)

```bash
simp hooks
```

Print Logs

```bash
simp logs
```

or

```bash
simp logs --verbose
```

More options with help flag.

```bash
simp --help
```
