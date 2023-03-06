# Why Pipelight?

## What is it?

A Rust program that execute "js strings parsed as bash commands" on a git event.

## Motivations

### I am Lazy

Config is written in Js so loops and variables can be used
to end the struggle with CICD pipelines written in configuration optimised languages (YAML/TOML).
See it as Code as Config as Code.

### Frugal Power User

I've been working with quite small servers, that struggle to build docker images, forget about kubernetes, graphana and so on.
But I have local powerful computers.
Pipelight allows me to git-push from a machine, build on another, and send the result on my tiny server, so I don't have to spend much in Cloud ressources.

### Need to do Heavy work

When I need to deploy a machine and install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools.

## How it works

Think of it as a bash wrapper.

When we first deploy a project we quickly edit some raw bash scripts.
It's clearly the fastest way to test.

```sh
//deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

But at some point, this method lakes verbosity, and automation...

Just put your commands into a Pipeline object.

```ts
//pipelight.config.ts
import { Config } from "npm:pipelight";
const config: Config = {
  pipelines: [
    {
      name: "deploy",
      steps: [
        {
          name: "test",
          commands: ["vitest"]
        },
        {
          name: "build",
          commands: ["vite build"]
        },
        {
          name: "send",
          commands: ["rsync local_files to_my_remote_server"]
        }
      ]
    }
  ]
};
export default config;
```

Add triggers, appreciate logs, and bettern your deployment scripts.

## Why another CICD tool ?

The need of something that keep it simple but allows for the great flexibility.

Pipelight does not use neither secrets nor plugins.
It directly loads your local environnement, so you can use your user ssh configuration, aliases and commands,
In the end, you can easily couple it with Ansible, docker, Vagrant and others

It takes Config as Code to another extend: Code as Config as Code!

### The power of Javascript (Code as configuration)

Javascrip is very good at writting object.
You can write functions in javascript to create multiple pipelines in a breeze.
Pipelight combines the speed and security of Rust with the easy scripting of Javascript.

## Why so fast ?

Pipelight is written in Rust and tightly coupled to Linux and Git.
It doesn't reinvent the wheel by making cumbersom event listeners, secrets or plugins.
Only git-hooks and bash commands with syntaxic sugar.

### Terminal friendly

Deploy, Backup, Restore... without living your terminal.
