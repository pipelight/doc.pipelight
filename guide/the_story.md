# Why another CICD tool ?

## The Automation for everyone

Pipelight ought to be the fastest and least painfull solution to set up if you seek to automate things.

If you are a bash guy, it will bring simplicity to your scripts.
If you do devOps stuffs, it will bring flexibility to your pipelines.

Whatever your skills in programming are, automation should be accessible.
It would result in project early automation implemention for you to focus only on the code that matters.

## Bypass the classic harsh automation path

::: tip Spoiler
The solution pipelight brings is to bettern existing shell scripts
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
so I can decrease by two third the money i used to spend in Cloud ressources.

### Heavy workers

When I need to deploy a machine, install and configure everything to deploy my apps in different envs..
I use it with docker, ansible, vagrant and others.
It becomes pretty simple to share variables/env between tools.

## How is it different from...

Following softwares an Pipelight aim to automate tasks but in different ways.

### CircleCI

Pipelight is born from Free and Open Source Softwares, it is meant to be self-hosted by organisations.
Opposed to

### Dagger.io

Dagger runs commands in containers making it more ressource consuming than Pipelight
who runs commands in a simple subprocess by default

### Drone.io
