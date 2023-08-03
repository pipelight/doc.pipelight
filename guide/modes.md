# Pipeline execution modes

The step execution mode will define the pipeline or step behavior on failure.

There is actually 3 step execution modes:

- StopOnFailure (default)
- JumpNextOnFailure
- ContinueOnFailure

## Stop on failure

The default mode.

```ts
const defaultStep: Step = {
  name "stop pipeline and run on_failure hooks on failure",
  // mode: "stop"
};
```

If a command of the step fails. The whole step will fail and stop the Pipeline execution.

## Jump next on failure

```ts
// Those modes will not stop execution flow
// and allow next step to run.

const nonBlocking: Step = {
  name "jump to next step on failure",
  mode: "jump_next"
};
```

If a command of the step fails. The step execution will stop without interupting the pipeline execution.
The pipeline will simply jump to the next step.

## Continue on failure

```ts
const forcedStep: Step = {
  name "execute next command on failure",
  mode: "continue"
};
```

If a command of the step fails. The next command will still be executed, and son on until the last command of the step.
Then the next step will be executed.
