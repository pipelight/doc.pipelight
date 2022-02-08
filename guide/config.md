# Master the Pipe

## Non-Blocking Step execution

Here 2nd step will always be executed even if 1st step fails.

The 1st step will stop and throw a warning whenever a command fails.

```ts
pipelines: [
  {
    name: "my_test",
    steps: [
      {
        name: "first",
        "non-blocking" : true,
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
