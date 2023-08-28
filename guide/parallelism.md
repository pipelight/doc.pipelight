<script setup lang="ts">
import { api } from "@utils/preferences.ts";
</script>

# Parallel tasks execution

Pipelight allows you to launch parallel tasks in one uniq way
that can be declined to your needs.

## Usage

<div v-if="api.compositions">

```ts
const my_pipeline = pipeline("test", () => [
  parallel(() => [
    step("first", () => [...my_commands]),
    step("second", () => [...my_commands])
  ])
]);
```

</div>
<div v-else>

```ts
const my_pipeline = {
  name: "test",
  steps: [
    {
      parallel: [
        {
          name: "first",
          commands: [...my_commands]
        },
        {
          name: "second",
          commands: [...my_commands]
        }
      ]
    }
  ]
};
```

</div>

## Parallel steps

Parallel step execution by declaring a Parallel object
which is an array of multiple Steps.

1. At start, first and second steps will run simultaneously.

<div v-if="api.compositions">

```ts
const my_pipeline = pipeline("test", ()=> [
    parallel(()=>[
        step("first", ()=> [...my_commands]) // [!code focus]
        step("second", ()=> [...my_commands]) // [!code focus]
    ]),
    step("third", ()=> [...my_commands])
])
```

</div>
<div v-else>

```ts
const my_pipeline = {
  name: "test",
  steps: [
    {
      parallel: [
        {
          name: "first", // [!code focus]
          commands: [...my_commands] // [!code focus]
        },
        {
          name: "second", // [!code focus]
          commands: [...my_commands] // [!code focus]
        }
      ]
    },
    {
      name: "third",
      commands: [...my_commands]
    }
  ]
};
```

</div>

2. Then, the third step will run once the whole parallel object has resolved.
   Which means, when the first and second steps have both resolved.

<div v-if="api.compositions">

```ts
const my_pipeline = pipeline("test", () => [
  parallel(() => [
    step("first", () => [...my_commands]),
    step("second", () => [...my_commands])
  ]),
  step("third", () => [...my_commands]) // [!code focus]
]);
```

</div>
<div v-else>

```ts
steps: [
  {
    parallel: [
      {
        name: "first",
        commands: [...my_commands]
      },
      {
        name: "second",
        commands: [...my_commands]
      }
    ]
  },
  {
    name: "third", // [!code focus]
    commands: [...my_commands] // [!code focus]
  }
];
```

</div>

## Parallel pipelines

### Attached subprocess

Trigger pipelines in parallel by creating a pipeline that run them from inside parallel steps.
You just need to `--attach` them to the main pipeline.

The main pipeline will wait until both pipelines execution is completed
and then continue its execution.

<div v-if="api.compositions">

```ts
const my_pipeline = pipeline("test", () => [
  parallel(() => [
    step("first", () => ["pipelight run pipeline_1 --attach"]), // [!code focus]
    step("second", () => ["pipelight run pipeline_2 --attach"]) // [!code focus]
  ])
]);
```

</div>
<div v-else>

```ts
const my_pipeline = {
name: "test",
steps: [
  {
    parallel: [
      {
        name: "first", // [!code focus]
        commands: ["pipelight run pipeline1 --attach"] // [!code focus]
      },
      {
        name: "second", // [!code focus]
        commands: ["pipelight run pipeline2 --attach"] // [!code focus]
      }
    ]
  }
];
}
```

</div>

### Detached subprocess

Running them without the `--attach` flag will launch them in the default mode which is detached.
In detached mode, the main pipeline can not know the subpipelines status but only the process status.

It will therefor **instantly** return the process status:

- succeeded if the process is spawned
- failed if the process couldn't be spawned

You may want to run subpipelines in detached mode if you don't care about there result.
Like if you bulk send emails and don't need to wait for this process to finish
to continue the main pipeline execution.
