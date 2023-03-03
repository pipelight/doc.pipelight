# Why Pipelight ?

## What it is

It's a tool to execute routines.
Like deploying your site online, executing tests...

Basically it's just a glue between all your preexisting tools.

## What it does

It takes "bash" commands.
And triggers it when you decide.

## Who is it for

For power users.
Because, it's easy to install, easy on computer ressources, and it's easy to dive into

For lazy devs.
Who don't want to mess with cumbersom CICD sofware for now.

Devs who need simplicity but efficency though.

## Yes but how ?

It uses a config file and executes the commands it contains.

```ts
//pipelight.config.ts;
pipelines: [
  {
    name: "test",
    steps: [
      {
        name: "build",
        commands: ["yarn install", "yarn build"]
      }
    ],
    triggers: [
      {
        branches: ["master", "main"],
        actions: ["push"]
      }
    ]
  }
];
```

I won't make the affront to explain you how a pipeline works.
But it sticks to standards raised by most known CICD tools (Drone.io, Gitlab CICD...)
The normal execution flow stops whenever a command fails. (pipeline -> step -> command)
