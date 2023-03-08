# Disclaimer

Making software is about taking position. See [DarkFi manifesto](https://dark.fi/manifesto.html)

So let me do what a normal [Arch Linux](https://wiki.archlinux.org/title/Installation_guide) user would do.
I use arch btw.
I think that using Linux is the path to go to bettern ones programming skill.
And if you are not using it yet. You should give it a try.

I may be harsh on some software/OS but it's only for you to understand my motivations.
I don't realy hate those FOSS software.. But my hate against big techs is real.

If you feel offenced, remember that you are not the software you are using.
If you are not, and still reading, it means you belongs to the worthy.. This peace of greatness is for you!

# The Automation Desilusions

## Bash is fast but scripting gets uncomfortable.

I often need to automate tasks, and the fastest way to do it is by writting sh scripts.

For example, when I need to deploy a website, I write the following script.
This is a basic sh script to test, build and send a website online.

```sh
#deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

But even though it's

- quickly written
- rapidly tested

the drawbacks are:

- It has to be manualy executed everytime I update my website.
- It's difficult to troubleshoot when something goes wrong.
- It gets unreadable and unreusable as it grows.

## CICD tools steal my time!

### Installation is harsh

I came to the point where I took the time to install [Drone.io](https://www.drone.io/).
It was an exhausting process as I needed Gitea installed locally too.
But I enjoyed using it.

Drawbacks:

- Difficult to install
- Difficult to troubleshoot

### Running is Ressource intensive

My computer was on the verge of dying every time I had simultaneous pipelines running.
At some point it crashed,
And 4 hour of debugging later, I found out it was because I updated my nft-tables for some virtualization projects.

Drawbacks:

- Has ressource(cpu/ram) intensive event listeners
- The best GUI on the market but still not on point though

### YAML and TOML is exhausting

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

But it's a pain to write variables, loops and its's imposible to write functions.

# A brighter sky

## Stick to the basics

Pipelight is written in Rust, so it's fast!!

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and Git.

## A good cli > bad gui

It's practical to see every logs in a gui and trigger pipelines from a click on a window.
But what if that cli isn't on point.

Pipelight stays in the terminal, and is nothing more than a Command Line Tool.

## Typescript to the rescue

It can't be denied that Javascript success is due t's very appealing synthax.
This language is:

- weakly typed so very easy to use.
- It's possible to make variables, loops, and functions.

And finally, this script...

```sh
#deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

becomes the following

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

Wrap your commands into a Javascript Pipeline Object.
Then run the pipeline.

```sh
pipelight run <pipeline_name>
```

It enables:

- Automatic triggering on git event (pre-commit, pre-push...)
- Verbose logging.
- Easy variable declaration
- Easy scripting with typescript

Display pretty logs

```sh
pipelight logs
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level3.png" alt="pretty verbose logs picture">
</p>

**The actulal pipeline to deploy this website.**

Or get logs as json for further exploitation/integration

```sh
pipelight logs --json
```

# Who is it for ?

## Lazy programmers

Config is written in TS so loops and variables can be used
to end the struggle with CICD pipelines written in configuration optimised languages (YAML/TOML).
If you come from devOps, see it as Code as Config as Code.

## Frugal Power User

I've been working with quite small servers, that struggle to build docker images, forget about kubernetes, graphana and so on.
But I have local powerful computers.
Pipelight allows me to git-push from a machine, build on another, and send the result on my tiny server, so I don't have to spend much in Cloud ressources.

## Heavy workers

When I need to deploy a machine and install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools.

# Why another CICD tool ?

The need of something that keep it simple but allows for the great flexibility.

Pipelight does not use neither secrets nor plugins.
It directly loads your local environnement, so you can use your user ssh configuration, aliases and commands,
so you can easily couple it with Ansible, docker, Vagrant...

It takes Config as Code to another extend: Code as Config as Code!

### The power of Javascript (Code as configuration)

Javascrip is very good at writting object.
You can write functions in javascript to create multiple pipelines in a breeze.
Pipeline combines the speed and security of Rust with the easy scripting of Javascript.

## Needed something fast

Pipelight is written in Rust and tightly coupled to **Linux** and **Git**.

It doesn't reinvent the wheel by making cumbersom event listeners, secrets or plugins.
Only git-hooks and bash commands with syntaxic sugar.

Fast type checking due to deno instead of node for TS interpretation.

### Terminal friendly

Deploy, Backup, Restore... without living your terminal.

### Linux Only

The tradeoffs of being platefporm agnostic is:

- the installation process
- the execution speed
- the source code complexity
