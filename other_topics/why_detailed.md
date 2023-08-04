# Why another CICD tool ?

## The software nindo(philosophy)

Pipelight follows some crucial guidelines:
Beeing:

- fast
- open-source
- and sovereign
  **two years later**

## The Automation for everyone

Pipelight ought to be the fastest and least painfull solution to set up if you seek to automate things.

Other CI/CD tools make usage of runners and multiple internal instances that interacts between them without you noticing, and can therefore
lead to hard to find bugs.
Pipelight chose to leverages bash, the every programmer common ground.
By beeing a one and only executable and letting scaling decisions up to the user.

Pipelight can integrate well with every tool.

If you are a bash guy, it will bring simplicity to your scripts.
If you do devOps stuffs, it will bring flexibility to your pipelines.

Whatever your skills in programming are, automation should be accessible.
It would result in project early automation implementation for you to focus only on the code that matters.

## Bypass the classic harsh automation path

::: tip tl;dr

The solution Pipelight brings is to **bettern already existing shell scripts**.

:::

We usualy seek automation because we face repetitive thus painful tasks of varied nature.
So we go down the automation road:

1. **Edite a shell script**

   ```sh
   #deploy.sh
   vitest
   vite build
   rsync local_files to_my_remote_server
   ```

   [+]
   Bash is quick to set up, and very appaeling when scripting simple tasks,

   [-]
   Syntax isn't easy.
   It lakes primitives/structures like Array, Object, Map...
   It uickly becomes unreadable as it get complex.

2. **Then, write a python script**

   [+]
   More readable.

   [-]
   It is too specific - not reusable between projects without many efforts.

3. **Finally, set up a CICD pipeline with its entire ecosystem**

   [+]
   It's easy to reuse pipelines. Has logging.

   [-]
   Ressource and time consuming.

On the automation road, Pipelight comes
right after the shell script(1) in term of simplicity,
while doing the heavy lift of a CICD ecosystem(3)

1. Shell script

- **Pipelight**

2. Python script
3. CICD ecosystem

## Why typescript over classic TOML/ YAML ?

### Flexibility and reusability

Usual configuration optimised languages (TOML/ YAML) are not easy to tweak.

**Variables**, **structs** and **loops** does not exist natively in those languages.
Consequently, those features depends on the automation tool implementing them resulting in different synthax for every tool.

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

To create another version of this pipeline with slightly different env variables.
The pipeline will need to be entirely cloned, going against reusability and comfort.

### Typescript to the rescue

The most flexible way to write a config file is finally to write it in a programming language.
Tailwind, Vite and many other web frameworks have already taken down this path.

Pipelight is about **executing strings** so, it needed a popular, language for **string manipulation**,
with an appaeling syntax and an as simple as possible learning curve.

## Why is it only a cli ?

Actual CICD tools still are cumbersome in time and ressources.

There is a whole ecosystem to install and troubleshoot before one can reach automation with most known tools.
They try to be compatible with every OS, preaching when efficency and simplicity is needed.

Pipelight sticks to the basics.

It is written in Rust, so it's fast!
It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and Git.

## Who is it for ?

### Lazy programmers

Config is written in Javascript/Typescript to allow variables, loops and functions usage.
to end the struggle with CICD pipelines written in configuration optimised languages (YAML/TOML).
If you come from devOps, see it as Code as Config as Code.

### Frugal Power User

I've been working with quite small servers, that struggle to build docker images, forget about kubernetes, graphana and so on.
But I have powerful local computers.
Pipelight allows me to git-push from a machine, build on another, and send the result on my tiny server,
so I can decrease by two third the money I used to spend in Cloud ressources.

### Heavy workers

When I need to deploy a machine, install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools.

## The Story

### Chapter 1 - The harder the fall

#### My Requirements

I needed something I can install quickly as typing `pacman -S tool` and play with it with `tool run`
with no further environment configuration.

I like to see what happens on my computer with full transparency, so I needed a tool that runs a good reporting system.
If a VM or a container is twisted I need to know it. If a network is brought up I want to know.

And something fast that runs as close to the kernel as possible.

#### The state of automation in 2023

I have been using and tweaking the existing CI/CD and automation tools but faced difficulties.

- Did I really have to trade my privacy for simplicity?
- The software transparency for simplicity?

During my journey, I faced Bad GUI, Bad log files, network rules colision,
exhausting GUI configuration, Heavy packages installation, slow execution, unflexible syntax.

But I can't blame the author of those software.
Automation was like the far west of those last years.
Some where corporate software and this world isn't always rational.

#### My Motivations

By the end of the month, the young adult that had been suck into software by the beauty of FOSS wasn't anymore.

- Had they lost their will to ship good software?

There was no one to look up to at this time.

After the pain, the sadness, came the rage that pushed me forging my own tools in the dark.
I was as desperate for better tools as disdainful towards what had been built before.

This fever pushed me to the work.
