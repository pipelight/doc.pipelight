# Master the Pipe

## Non-Blocking Step execution

A non_blocking step will not stop pipeline execution on failure.

Here **second** step will always be executed even if **first** step fails.

```ts
//pipelight.config.ts

pipelines: [
  {
    name: "my_test",
    steps: [
      {
        name: "first",
        non_blocking : true,
        commands: [...my_commands]
      }
      {
        name: "second",
        commands: [...my_commands]
      }
    ]
  }
];
```
