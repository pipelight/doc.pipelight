# Git hooks for 100x devs.

You are a developer, a creator, a pragmatic builder!

As your multiple projects grow, the **need of automation** first pushes you toward git-hooks.
They basically are scripts triggered whenever you make changes to your code base.
So you write scripts in whichever language comes handy at the moment.

However, git doesn't natively support saving hooks across your repository clones,
so you must build or use a **custom solution to persist and manage your scripts**.

As a solution [Pipelight](https://github.com/pipelight/pipelight) has come very, very handy.
Is is a pretty small executable written in Rust that comes with great capabilities.

[Install it](https://pipelight.dev/introduction/install.html) then write this file at your project root.

```toml
# pipelight.toml
[[pipelines]]
name = "my_deployment_pipeline"

[[pipelines.steps]]
name = "my_script"
commands = ["./scrips/deploy.sh"]

[[pipelines.triggers]]
branches = ["master"]
actions= ["pre-push"]
```

Running the following command will **enable** hooks defined in your configuration.

```sh
pipelight enable git-hooks
```

It creates a hook that triggers your script at `./scrips/deploy.sh` whenever you **push to master**.
Yes, you heard me well.
You can restrain hook execution to the desired branches.
It furthermore supports globing (ex: `["feat/*"]`);

It enables some other very practical features like logging your hook results.

```sh
pipelight logs -vvv
```

You can display your project global health like so and quickly see what
works and what doesn't.

```sh
pipelight ls -vv
```

As we seek to build software for us, that benefit our community and free the individuals,
Pipelight is one of this tools that leverage one's strike force.
No doubt it will leverage yours.
