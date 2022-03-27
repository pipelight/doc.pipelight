# Master the Pipe

## Non-Blocking Step execution

A non-blocking step will try to execute every commands.
If a command fails, it will not stop the pipeline exuecution.

Here 2nd step will always be executed even if 1st step fails.

```js
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
