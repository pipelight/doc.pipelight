# Command line usage

The cli is made on top of [clap](https://docs.rs/clap/latest/clap/).
So it is well self documented.

## Most useful commands

**Lint** and List pipelines from your Config file with

```sh
pipelight ls
```

Inspect your pipeline

```sh
pipelight inspect
# or
pipelight inspect <pipeline_name>
# same as
pipelight ls <pipeline_name>
```

Run it in background (default)

```sh
pipelight run <pipeline_name>
```

Or without any argument, you'll be able to browse through your pipeline list.

```sh
pipelight run
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

Simulate a specified git-hook triggering, to trigger associated pipelines

```sh
pipelight trigger <git_hook_name>
```

Print colorful raw json logs

```sh
pipelight logs --json | jq
```

Filter logs on pipeline name

```sh
pipelight logs <pipeline_name>
```

Discover some options by using the help flag.

```sh
pipelight --help
```

can be used on subcommands too.

```sh
pipelight run --help
```
