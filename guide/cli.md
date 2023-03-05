# Master the Cli

The cli is made on top of [clap](https://docs.rs/clap/latest/clap/).
So it is well self documented.

## Most useful commands

These are the 3 commands you'll combine to speed up your pipeline development process.

Lint your config file with

```sh
pipelight ls
```

Inspect your pipeline

```sh
pipelight ls <pipeline_name>
```

Run it in background

```sh
pipelight run <pipeline_name>
```

Abort pipeline execution

```sh
pipelight stop <pipeline_name>
```

Check logs

```sh
pipelight logs -vvv
```

## Other commands

Simulate the execution of a specified git-hook to trigger associated pipelines

```bash
pipelight trigger <git_hook_name>
```

Under the hood,
every command checks if hooks are enabled.
If git-hooks are not working on a fresh directory. At least run:

```bash
pipelight ls
```

Print colorful raw logs

```bash
pipelight logs --json | jq
```

Filter logs on pipeline logs

```bash
pipelight logs <pipeline_name>
```

Discover some options by using the help flag.

```bash
pipelight --help
```

on subcommands too.

```bash
pipelight run --help
```
