# Pipelight

A Lightweight CI/CD tool.

Write pipelines in Javascript.
And trigger them automatically on git action.

[Full Documentation](https://pipelight.areskul.com) in progress.

## What it is.

A Rust program that execute "js strings parsed as bash commands" on a git event.

## Motivation

### Lazy

Config is written in Js so lots of loops and variables can be used
to end the struggle with CI/CD pipelines written in configuration optimised languages.

### Frugal Power User

I've been working with quite small servers, that struggle to build docker images, forget about kubernetes, graphana and so on.
But I have local powerful computers.
Pipelight allows me to git-push from a machine, build on another, and send the result on my tiny server, so I don't have to spend much in Cloud ressources.

### Heavy work

When I need to deploy a machine and install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools and one click full deployement.

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

Here pipelines configuration sticks to standards raised by most known CICD tools (Drone.io, Gitlab CICD...)
