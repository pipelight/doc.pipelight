## Cli

### Useful commands

Print config with

```bash
simp
```

Set config file with (.json only)

```bash
simp --config <file>
```

## Module

## Chande Working directory

Commands run in project root folder by default.
You can change it like so:

```ts
steps: [
  {
    name: changeDir,
    cwd: "./bin",
    commands: [...]
  }
];
```
