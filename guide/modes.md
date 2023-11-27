# Pipeline execution modes

The step execution mode defines the pipeline or step behavior on failure.

There is actually 3 step execution modes:

- StopOnFailure (default)
- JumpNextOnFailure
- ContinueOnFailure

## Stop on failure (default)

If a command of the step fails.
The whole step fails and stop the pipeline execution.

```ts
const defaultStep: Step = {
  name: "stop the pipeline and run on_failure hooks on pipeline failure",
  // mode: "stop"
};
```

## Jump next on failure

**This mode doesn't stop the execution flow and allows the next step to run.**

If a command of the step fails.
The step execution stops without interupting the pipeline execution.
Then the following step is executed (the execution jumps to the next step).

```ts
const nonBlocking: Step = {
  name: "jump to next step on failure",
  mode: "jump_next"
};
```

## Continue on failure

**This mode doesn't stop the execution flow and allows the next step to run.**

If a command of the step fails.
The next command is still executed, and so on until the last command of the step.
Then the following step is executed.

```ts
const forcedStep: Step = {
  name: "execute next command on failure",
  mode: "continue"
};
```
