# Fallbacks (Conditionnal hooks)

Fallbacks are steps to be executed on specific cases.

- `on_started`: when the pipeline/step starts and before any command is executed.
- `on_failure`: when the pipeline/step is finished and have failed.
- `on_success`: when the pipeline/step is finished and have succeeded.
- `on_abortion`: when the pipeline/step was abnormaly stopped during execution ([discourage usage](#on-abortion-fallback-discourage)).

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

The pipeline fallbacks are the global fallbacks.
They are steps that will be triggered whenever the pipeline starts, fails, succeeds or is aborted.

It can be use to:

- clean up a directory after tests
- launch a failsafe pipeline on unexpected errors
- create a reporting system (notifications)

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

The step fallbacks are the fine-grained fallbacks.
They are steps that will be triggered whenever the step starts, fails, succeeds or is aborted,
and right **before the global** fallbacks.

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

### Beware the fallback hell!

Fallbacks are made to execute commands on other commands status.
They are the **if/else** of a pipeline.

Concidering that every Step has Fallbacks, and Fallbacks have Steps,
managing your every conditionnal cases into fallbacks can lead to the following awefull pattern.

```rs
// Pseudo code that hurts less than a Javascript example
Step {
    Fallback {
        Step {
            Fallback {
                Step {
                    Command
                }
            }
        }
    }
}

```

It's not recommanded to overuse this pattern in pipeline definition for the sake of simplicity.
Indeed, a too deep level of fallbacks could make the pipeline, and its tree logs unreadable.

### Solutions against the fallback hell

Write your fallback logic into another pipeline,
and make an attached call to this pipeline from inside your fallback.

```rs
Step {
    Fallback {
        Step {
            Command { "pipeline run <pipeline_name> --attach" }
        }
    }
}

```

## On Abortion fallback discourage

::: warning

Don't use the `on_abortion` fallback without knowing its actual limitations.

:::

Notice that a pipeline is flagged as aborted whenever it is stopped while it was still running.
It can be aborted by an external signal like `Ctrl-C`, or a signal like `SIGTERM` ,`SIGKILL`...

- Soft signals

  In the case of the most soft signals that let the process end and exit properly (`SIGTERM`),
  pipelight will effectively trigger the `on_abortion` fallback.

- Hard signals

  However, if the pipeline execution is stopped or halted by a more abrupt signal (SIGKILL) or directly by your kernel for ressource exceeding,
  process panic reasons and a few more extrem but daily cases,
  the `on_abortion` fallback can't be executed by the ex-running pipelight instance.

::: info

Hard signal handling must be supported for Pipelight to get closer to its ideal.
A lockfile system is actually in work to optionnaly launch pipelines forbidden fallback steps when running a new Pipelight instance.

:::
