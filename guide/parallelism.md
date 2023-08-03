# Parallelism

Pipelight allows you to launch parallel tasks in one uniq way
that can be declined to your needs.

## Parallel steps execution

Parallel step execution by declaring a Parallel object
which is an array of multiple Steps.

Here first and second steps will run simultaneously.

```ts{3-10}
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
];
```

The third step will run once the whole parallel object has resolved.
Which means, when the first and second steps have both resolved.

```ts{14-17}
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
    name: "third",
    commands: [...my_commands]
  },
];
```

## Parallel pipelines execution

### Attached subprocess

Trigger pipelines in parallel by creating a pipeline that run them from inside parallel steps.
You just need to `--attach` them to the main pipeline.

The main pipeline will wait until both pipelines execution is completed
and then continue its execution.

```ts{3-10}
steps: [
  {
    parallel: [
      {
        name: "first",
        commands: ["pipelight run pipeline1 --attach"]
      },
      {
        name: "second",
        commands: ["pipelight run pipeline2 --attach"]
      }
    ]
  }
];
```

### Detached subprocess

Running them without the `--attach` flag will launch them in the default mode which is detached.
In detached mode, the main pipeline can not know the subpipelines status but only the process status.

It will therefor **instantly** return the process status:

- succeeded if the process is spawned
- failed if the process couldn't be spawned

You may want to run subpipelines in detached mode if you don't care about there result.
Like if you bulk send emails and don't need to wait for this process to finish
to continue the main pipeline execution.
