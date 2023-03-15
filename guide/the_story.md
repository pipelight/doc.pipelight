# The Automation for newbies

People will usualy automate a process beginning with Bash, then python and install a Continuous Development tool.

I made Pipelight because I needed more than shell script to deploy my software.
But I couldn't find a cicd tool that suit my need.

## Why typescript over Bash or YAML/TOML for configuration

### Better than Bash

Bash is very appaeling when scripting simple tasks, but...

```sh
#deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

- Syntax isn't easy.
- Lakes primitives/structures like Array, Object, Map...
- Quickly becomes awefull.

### Better than YAML

Usual configuration optimised languages like YAML and TOML are not easy to tweak.
The way to add variables, struct and loops is very tight to the automation tool you are using.
So there is a different synthax for every tool.
Pipelines are most of the time defnied in YAML

```yaml
kind: pipeline
type: docker
name: default
steps:
  - name: greeting
    image: alpine
    commands:
      - vitest
      - vite build
```

### Typescript to the rescue

Any application that can be written in Javascript, will eventually be written in Javascript.
What can be more flexible as a config file, than a progrmmaing language.
Tailwind, Vite and many other Web Frameworks have taken down this path.
And now some cli follow...

## Why only a cli ?

Actual CICD tools steal are cumbersome in time and ressources.
There is a whole ecosystem to install and troubleshoot before one can reach automation with most known tools.
They try to be compatible with every OS, preaching when efficency and simplicity is needed.

Pipelight sticks to the basics

It is written in Rust, so it's fast!
It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and Git.

## Who is it for ?

### Lazy programmers

Config is written in TS so loops and variables can be used
to end the struggle with CICD pipelines written in configuration optimised languages (YAML/TOML).
If you come from devOps, see it as Code as Config as Code.

### Frugal Power User

I've been working with quite small servers, that struggle to build docker images, forget about kubernetes, graphana and so on.
But I have local powerful computers.
Pipelight allows me to git-push from a machine, build on another, and send the result on my tiny server, so I don't have to spend much in Cloud ressources.

### Heavy workers

When I need to deploy a machine and install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools.
