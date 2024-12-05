# Parallel tasks execution

Pipelight allows you to launch parallel tasks in one uniq way
that can be declined to your needs.

## Usage

::: code-group

```toml
[[pipelines]]
name =  "test"

[[pipelines.steps]]
[[pipelines.steps.parallel]]
name = "first"
commands = ["my_commands"]
[[pipelines.steps.parallel]]
name = "second"
commands = ["my_commands"]
```

```yaml
pipelines:
  - name: test
    steps:
      - parallel:
          - name: first
            commands:
              - my_commands
          - name: second
            commands:
              - my_commands
```

```hcl
pipelines = [{
  name = "simple_example"
  steps = [{
     parallel = [
        {
          name     = "first"
          commands = ["my_commands"]
        },
        {
          name     = "second"
          commands = ["my_commands"]
        }
     ]
  }]
}]
```

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

```ts [ts(with helpers)]
const my_pipeline = pipeline("test", () => [
  parallel(() => [
    step("first", () => [...my_commands]),
    step("second", () => [...my_commands])
  ])
]);
```

```json
{
  "pipelines": [
    {
      "name": "test",
      "steps": [
        {
          "parallel": [
            {
              "name": "first",
              "commands": ["my_commands"]
            },
            {
              "name": "second",
              "commands": ["my_commands"]
            }
          ]
        }
      ]
    }
  ]
}
```

:::

## Parallel steps

Parallel step execution by declaring a Parallel object
which is an array of multiple Steps.

1. At start, first and second steps will run simultaneously.

::: code-group

```toml
[[pipelines]]
name =  "test"

[[pipelines.steps]]
[[pipelines.steps.parallel]]
name = "first" # [!code focus]
commands = ["my_commands"] # [!code focus]
[[pipelines.steps.parallel]]
name = "second" # [!code focus]
commands = ["my_commands"] # [!code focus]

[[pipelines.steps]]
name = "third"
commands = ["my_commands"]
```

```yaml
pipelines:
  - name: test
    steps:
      - parallel:
          - name: first # [!code focus]
            commands: # [!code focus]
              - my_commands # [!code focus]
          - name: second # [!code focus]
            commands: # [!code focus]
              - my_commands # [!code focus]
      - name: first
        commands:
          - my_commands
```

```hcl
pipelines = [{
  name = "simple_example"
  steps = [{
     parallel = [
        {
          name     = "first" # [!code focus]
          commands = ["my_commands"] # [!code focus]
        },
        {
          name     = "second" # [!code focus]
          commands = ["my_commands"] # [!code focus]
        }
     ]
  },
  {
      name     = "third"
      commands = ["my_commands"]
  }
  ]
}]
```

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

```ts [ts(with helpers)]
const my_pipeline = pipeline("test", ()=> [
    parallel(()=>[
        step("first", ()=> [...my_commands]) // [!code focus]
        step("second", ()=> [...my_commands]) // [!code focus]
    ]),
    step("third", ()=> [...my_commands])
])
```

:::

2. Then, the third step will run once the whole parallel object has resolved.
   Which means, when the first and second steps have both resolved.

::: code-group

```toml
[[pipelines]]
name =  "test"

[[pipelines.steps]]
[[pipelines.steps.parallel]]
name = "first"
commands = ["my_commands"]
[[pipelines.steps.parallel]]
name = "second"
commands = ["my_commands"]

[[pipelines.steps]]
name = "third" # [!code focus]
commands = ["my_commands"] # [!code focus]
```

```yaml
pipelines:
  - name: test
    steps:
      - parallel:
          - name: first
            commands:
              - my_commands
          - name: second
            commands:
              - my_commands
      - name: first # [!code focus]
        commands: # [!code focus]
          - my_commands # [!code focus]
```

```hcl
pipelines = [{
  name = "simple_example"
  steps = [{
     parallel = [
        {
          name     = "first"
          commands = ["my_commands"]
        },
        {
          name     = "second"
          commands = ["my_commands"]
        }
     ]
  },
  {
      name     = "third" # [!code focus]
      commands = ["my_commands"] # [!code focus]
  }
  ]
}]
```

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

```ts [ts(with helpers)]
const my_pipeline = pipeline("test", () => [
  parallel(() => [
    step("first", () => [...my_commands]),
    step("second", () => [...my_commands])
  ]),
  step("third", () => [...my_commands]) // [!code focus]
]);
```

:::

## Parallel pipelines

### Launch attached subpipelines

Trigger pipelines in parallel by creating a pipeline that run them from inside parallel steps.
You just need to `--attach` them to the main pipeline.

The main pipeline will wait until both pipelines execution is completed
and then continues its execution.

::: code-group

```toml
[[pipelines]]
name =  "test"

[[pipelines.steps]]
[[pipelines.steps.parallel]]
name = "first" # [!code focus]
commands = ["pipelight run pipeline1 --attach"] # [!code focus]
[[pipelines.steps.parallel]]
name = "second" # [!code focus]
commands = ["pipelight run pipeline2 --attach"] # [!code focus]
```

```yaml
pipelines:
  - name: test
    steps:
      - parallel:
          - name: first # [!code focus]
            commands: # [!code focus]
              - pipelight run pipeline1 --attach # [!code focus]
          - name: second # [!code focus]
            commands: # [!code focus]
              - pipelight run pipeline2 --attach # [!code focus]
```

```hcl
pipelines = [{
  name = "simple_example"
  steps = [{
     parallel = [
        {
          name     = "first" # [!code focus]
          commands = ["pipelight run pipeline1 --attach"] # [!code focus]
        },
        {
          name     = "second" # [!code focus]
          commands = ["pipelight run pipeline2 --attach"] # [!code focus]
        }
     ]
  }]
}]
```

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

```ts [ts(with helpers)]
const my_pipeline = pipeline("test", () => [
  parallel(() => [
    step("first", () => ["pipelight run pipeline1 --attach"]), // [!code focus]
    step("second", () => ["pipelight run pipeline2 --attach"]) // [!code focus]
  ])
]);
```

:::

### Launch detached subpipelines

Running a pipeline without the `--attach` flag will launch it in the **default mode** which is **detached**.
It means that the process will run in the background and closing the terminal won't halt the pipeline execution.

In detached mode, the main pipeline can only know if the pipeline process has been spawn or not.
There is no way to know the subpipeline status(running, succeeded, failed...).

The command `p run <pipeline_name>` will therefore **instantly** return the process status:

- succeeded if the process is spawned.
- failed if the process couldn't be spawned.

You may want to run subpipelines in detached mode if you don't care about the immediat result.

For example, if a pipeline step bulk sends emails
and you can not afford to wait until it is finished to resume the pipeline execution,
then you should consider using a detached pipeline.
The main pipeline execution will continue as soon as the emailing pipeline is spawned.
