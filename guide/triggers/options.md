# Triggers behavior

::: tip

The following options can be set globally and overwritten on a per pipeline
bases.

:::

## Set a per pipeline behavior (attach/detach)

By default, pipelines are triggered **attached** to the standard output.

For example, a git action like `git push` will wait for the pipeline
execution to complete before giving you a new prompt.

To prevent waiting forever when triggering heavy workloads, you can set the
pipeline to be executed **detached** from the standard output.

::: code-group

```toml [toml]
[[pipelines.options]]
attach = false
```

```yaml [yaml]
- pipelines:
    - options:
        attach: false
```

```hcl [hcl]
pipelines = [{
    options = {
        attach = false
    }
}]
```

```ts [ts]
const my_pipeline = {
  options: {
    attach: false
  }
};
```

```ts [ts(with helpers)]
const my_pipeline = pipeline("example", () => []).detach();
```

:::

When running a pipeline with the command `pipelight run`, this flag is not
interpreted and therefore the pipeline is triggered in the background unless you
attach it `pipelight run --attach`.

## Set a per pipeline log level

Triggering a pipeline in attached state will print the minimum pipeline log.

You can set the default log level Available levels are `error`, `warn`, `info`,
`debug` and `trace`.

::: code-group

```toml [toml]
[[pipelines.options]]
log_level = "warn"
```

```yaml [yaml]
- pipelines:
    - options:
        log_level: warn
```

```hcl [hcl]
pipelines = [{
    options = {
        log_level = "warn"
    }
}]
```

```ts [ts]
my_pipeline = {
  options: {
    attach: false;
    log_level: "warn",
  }
}
```

```ts [ts(with helpers)]
my_pipeline.set_options({
  log_level: "warn"
});
```

:::

## Set global defaults

You can set those defaults globally

::: code-group

```toml [toml]
[[options]]
attach = false
log_level = "warn"
```

```yaml [yaml]
- options:
    attach: false
    log_level: warn
```

```hcl [hcl]
options = {
    attach = false
    log_level = "warn"
}
```

```ts [ts]
my_config = {
  options: {
    attach: false,
    log_level: "warn"
  },
  pipelines: []
};
```

```ts [ts(with helpers)]
my_config.set_options({
  attach: false,
  log_level: "warn"
});
```

:::
