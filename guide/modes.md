<script setup lang="ts">
import { api } from "@utils/preferences.ts";
</script>

# Pipeline execution modes

The step execution mode defines the pipeline or step behavior on failure.

There is actually 3 step execution modes:

- StopOnFailure (default)
- JumpNextOnFailure
- ContinueOnFailure

## Stop on failure (default)

::: info

You do not need to explicitly set it because it is the default step execution
mode.

:::

If a command of the step fails. The whole step fails and stop the pipeline
execution.

<div v-if="api.compositions">

```ts
import { Mode } from "https://deno.land/x/pipelight/mod.ts";

const defaultMode = step(
  "stop the pipeline and run on_failure hooks on pipeline failure",
  () => [],
)
  .set_mode(Mode.StopOnFailure);
  // or
  .set_mode("stop");
```

</div>
<div v-else>

```ts
const defaultMode: Step = {
  name: "stop the pipeline and run on_failure hooks on pipeline failure",
  options: {
    mode: "stop",
  },
};
```

</div>

## Jump next on failure

**This mode doesn't stop the execution flow and allows the next step to run.**

If a command of the step fails. The step execution stops without interupting the
pipeline execution. Then the following step is executed (the execution jumps to
the next step).

<div v-if="api.compositions">

```ts
import { Mode } from "https://deno.land/x/pipelight/mod.ts";

const nonBlocking = step("jump to next step on failure", () => [])
  .set_mode(Mode.JumpNextOnFailure);
  // or
  .set_mode("jump_next");
```

</div>
<div v-else>

```ts
const nonBlocking: Step = {
  name: "jump to next step on failure",
  options: {
    mode: "jump_next",
  },
};
```

</div>

## Continue on failure

**This mode doesn't stop the execution flow and allows the next step to run.**

If a command of the step fails. The next command is still executed, and so on
until the last command of the step. Then the following step is executed.

<div v-if="api.compositions">

```ts
import { Mode } from "https://deno.land/x/pipelight/mod.ts";

const forced = step("execute next command on failure", () => [])
  .set_mode(Mode.ContinueOnFailure);
  // or
  .set_mode("continue");
```

</div>
<div v-else>

```ts
const forced: Step = {
  name: "execute next command on failure",
  options: {
    mode: "continue",
  },
};
```

</div>
