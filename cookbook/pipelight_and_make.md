# Getting the most out of Make/Just.

You already have a favorite built tool in **Make** or **Just**,
and want to take advantage of pipelight **git hooks** and **logging** abilities.

Gess what.
You do not need to change any of your Makefiles/Justfiles.

Add a `pipelight.toml` file in your repo root with `p init --template toml`.

In this file, simply call make from a pipeline.

```toml
# pipelight.toml
[[pipelines]]
name = "deploy"

[[pipelines.steps]]
name = "build"
commands = ["make build"]

[[pipelines.triggers]]
branches = ["dev"]
actions= ["pre-push"]
```

This pipeline can be executed in the background on a push to master.
or with `p run deploy`

Read its logs with the following commands

```sh
p ls -vv
```

```sh
p logs -vv
```
