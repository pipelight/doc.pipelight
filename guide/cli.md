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

### Chande Working directory

Commands run in project root folder by default.
You can change it like so:

```ts
steps: [
  {
    name: "changeDir",
    cwd: "./bin",
    commands: [...commands]
  }
];
```

### Parallele pipeline execution

By default pipelines or independants.
But you can change this behavior.

Pipeline "second" will execute if "first" succeeds.

```ts
pipelines: [
  {
    name: "second",
    depends_on: "first",
    steps: [...steps]
  },
  {
    name: "first",
    steps: [...steps]
  }
];
```
