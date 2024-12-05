# Bootstrap a project

The only commands you need to type to be up and running are:

```sh
p init # Create a configuration file (default to toml)
# or
p run # Run a pipeline (interactive)
p logs -vv # Display logs (tree view)
p ls -vv # Get repo health overview
```

However you may want to take full advantages of git for your pipelines to
be executed automatcally.

## Add pipelight to a git repository

::: info Recommendations

Pipelight saves its activity inside the `.pipelight` hidden directory. You may
want to prevent the whole directory from being pushed by adding it in your
`.gitignore` file.

If you wish to keep record of the pipelines logs(Json) inside your repo, only
ignore `.pipelight/proc`.

:::

To create a template configuration file and immediately try
it out, run:

```sh
p init # Create a pipeline template
```

If they do not exists yet, you can see that two files have been created.

```sh
pipelight.toml # Your configuration file where your pipelines are.
.pipelight_ignore # Optional list of files to be ignored by the file watcher
```

### Enable git-hooks

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

### Enable the file watcher

Pipelight will watch for file changes in your repository.

```sh
pipelight enable watcher
```

Check that the watcher is running in the background.

```sh
ps aux | grep pipelight
```
