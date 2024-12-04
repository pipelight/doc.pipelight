# Bootstrap a project

The only commands you need to type to be up and running are:

```sh
p init # Create a configuration file
p run # Run a pipeline (interactive)
p logs -v # Display logs (tree view)
```

Read the following to enable pipelines automatic **triggers** with or without
git. These are optional, nonetheless pretty practical!

## Start a project with git

::: info Recommendations

Pipelight saves its activity inside the `.pipelight` hidden directory. You may
want to prevent the whole directory from being pushed by adding it in your
`.gitignore` file.

If you wish to keep record of the pipelines logs(Json) inside your repo, only
ignore `.pipelight/proc`.

:::

First, if you wish to create a template configuration file and immediately try
it out, run:

```sh
p init
```

If they do not exists yet, you can see to files are created.

```sh
pipelight.ts # Your configuration file where your pipelines lay
.pipelight_ignore # List of files to be ignored by the file watcher
```

Pipelines can be automatically triggered on git events (pipelight managed
git-hooks).

Whether it be client side in a regular repository or server side in a bare
repository, **triggers** needs to be manualy enabled.

::: danger

This operation overwrites the .git/hooks folder. Be sure to move your manually
defined hooks elsewhere before enabling pipelight hooks.

:::

Enable pipelight managed git-hooks:

```sh
pipelight enable git-hooks
```

You may want to check that the `.git/hooks` dierctory has been modified.

```sh
ls .git/hooks
# or
tree .git/hooks
```

Enable the file watcher

```sh
pipelight enable watcher
```

You may want to check that the event listener is running in the background

```sh
ps aux | grep pipelight
```

## Start a project without git

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
