# In Depth

## Cli

### Useful commands

Print config with

```bash
simp --print-config
```

Verbose pipeline execution

```bash
simp trigger --pipeline <pipeline name> --verbose
```

## Config

### Non-Blocking Step execution

Here 2nd step will always be executed even if 1st step fails.

The 1st step will stop and throw a warning whenever a command fails.

```ts
pipelines: [
  {
    name: "my_test",
    steps: [
      {
        name: "first",
        try_catch : true,
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
