# For what tasks using Pipelight ?

For every nerd that seeks fast and simple automation.

But simple doesn't mean simplistic.
Complexe pipelines and behavior can still be achived in easy ways.

## Random task automation and parallelism

Can be used to automate everyday tasks.

## Software development

### Continuous deployment (CD)

You can define pipelines that will run client-side and/or server-side.

### Client side

On your computer, you can enable client side automation by using specific triggers (on pre-push, pre-commit...).

- **Enforce code quality**,

  You can write pipelines to test your code before pushing it to production branches.

- **Save cloud costs**,

  Make the **heavy computation locally**,
  Build and only send the resulting archive or image to your remote servers.

### Server side

Server side automation is achieved by using specific triggers too (on update, pre-receive...).

- **Ease team work**,

  Trigger pipelines directly on the remote once git has resolved.
  Same as using a conventional cicd in cloud provider.

- **Better debugging**,

  Pipelight logs are verbose and easy to access.
  You won't ever miss a single byte of a pipeline execution (real commands, stdin, stdout and return statements).

## Server provisionning

Can be used to wrap ansible or to replace it.
