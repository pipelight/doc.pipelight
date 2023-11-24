# Bootstrap a project

## With git

Create a template config file.

```sh
pipelight init
```

Enable pipelight managed git-hooks.


::: danger

This operation overwrite the .git/hooks folder. Be sure to move your manually
defined hooks elsewhere before enabling pipelight hooks.

:::

```sh
pipelight enable git-hooks
```

Check that the `.git/hooks` dierctory has been modified.

```sh
ls .git/hooks
# or
tree .git/hooks
```

Enable the file watcher

```sh
pipelight enable watcher
```

Check that the event listener is running in the background

```sh
ps aux | grep pipelight
```

## Without git

Create a template config file.

```sh
pipelight init
```

Enable the file watcher

```sh
pipelight enable watcher
```

Check that the event listener is running in the background

```sh
ps aux | grep pipelight
```
