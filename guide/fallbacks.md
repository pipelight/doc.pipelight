# Fallbacks

Fallbacks are steps to be executed on specific cases.

- `on_started`: when the pipeline/step starts and before any command is executed.
- `on_failure`: when the pipeline/step is finished and have failed.
- `on_success`: when the pipeline/step is finished and have succeeded.
- `on_abortion`: when the pipeline/step was abnormaly stopped during execution.

```ts
const fallback: Step[];
```

```rs
let fallback: Vec<Step>;
```

Pipelines and Steps both have fallbacks.
Global fallbacks are defined on the pipeline level
and fine grained fallbacks can be defined on each step.

## Pipeline fallbacks

These are global fallbacks.
They are steps that will be triggered whenever the pipeline starts, fails, succeeds or is aborted.

It's not recommanded to overuse this pattern in pipeline definition for the sake of simplicity.
But still it exists and can be use to add global notifications or reporting system.

```ts
const pipeline = {
  name: "my_test",
  on_started: [...steps],
  on_failure: [...steps],
  on_success: [...steps],
  on_abortion: [...steps],
  steps: [
    {
      name: "first",
      commands: [...my_commands]
    },
    {
      name: "second",
      commands: [...my_commands]
    }
  ]
};
```

## Step fallbacks

```ts
const pipeline = {
  name: "my_test",
  steps: [
    {
      name: "first",
      on_started: [...steps],
      on_failure: [...steps],
      on_success: [...steps],
      on_abortion: [...steps],
      commands: [...my_commands]
    }
  ]
};
```

## On Abortion pitfall

Notice that a pipeline is flagged s aborted whenever it is stopped while it was still running.
It can be aborted by an external signal like `Ctrl-C`, or a signal like SIGTERM ,SIGKILL...

In the case of the most soft signals that let the process end and exit properly (SIGTERM),
pipelight will trigger the `on_abortion` fallback.
But if the pipeline execution is stopped by a more abrupt signal (SIGKILL) or directly by your kernel
for ressource exceeding reasons or else, the `on_abortion` fallback can't be executed by pipelight.

::: info Developper note
A way to trigger the `on_abortion` fallback after a hard kill would be:

- When cli is used after a pipeline abortion
- First sanitize log file
- Seek pipelines that have status running and compare to running processes
- Update logs and run the on_abortion hooks if any.

:::
