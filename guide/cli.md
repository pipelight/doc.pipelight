# Command line usage

## Most used commands

List pipelines from your config file.
(debug: You can use this command to lint your config file)

```sh
pipelight ls
# or
pipelight ls -vvv
```

Inspect your pipeline definitions.

```sh
pipelight inspect <pipeline_name>
# same as
pipelight ls -vvv <pipeline_name>
```

Without an argument `inspect` shows an intercative prompt
with your pipeline names

```sh
pipelight inspect
```

```sh
> deploy_to_host
  tests
  build
```

Run a pipeline in the background (default)

```sh
pipelight run <pipeline_name>
```

Without an argument `run` shows an intercative prompt
with your pipeline names

```sh
pipelight run
```

```sh
> deploy_to_host
  tests
  build
```

Check pipelines execution states, and produced outputs.

```sh
pipelight logs
# or
pipelight logs -vvv
```

Abort a pipeline execution

```sh
pipelight stop <pipeline_name>
```

## Other useful commands

Discover some options by using the help flag.

```sh
pipelight --help
```

can be used on subcommands too.

```sh
pipelight run --help
```
