# Why another CICD tool ?

CICD: Stands for **C**ontinuous **I**ntegration and **C**ontinuous
**D**elivery/**D**eployment, aims to streamline and accelerate the software
development lifecycle.
[from redhat](https://www.redhat.com/en/topics/devops/what-is-ci-cd)

## Deeper convictions

Knowing with which philosophy the software was built will for sure help you
understand many architectural choices.

Born from the following philosohies:

- [The Anti Mediocracy Manifesto for Software Development](https://gist.github.com/mathiasrw/cb3b15630a418f5cff3035463a048a59)
- [The LunarDAO manifesto](https://lunardao.net/manifesto.html)

### The software telos

As of today, the majority of CICD software are cloud native and unflexible
behemoth, the actual landscape lakes of solutions for self-hosted easy
replicable deployments.

The open-source world direly needs a tool to deploy and share virtuous project
faster. CICD shouldn't be a luxury. We need a solid free common ground to
elevate FOSS.

_I don't do it because I like it. I do it because we need it now._

Pipelight ultimate goal is to be a community owned ubiquitary solution for
automation.

### The software nindo (The path taken to achieve)

To reach this goal pipelight follows some crucial guidelines:

- keep execution fast by remaining minimal (suckless)
- distribute lightweight binaries (for fast installation)
- transparent in its logs and error messages
- beeing and remaining open-source
- community driven

### The Automation for everyone

Pipelight ought to be the fastest and least painfull solution to set up if you
seek to automate things.

There is many ways ones can achieved automation, and Pipelight chose to
**leverage bash**, the every programmer common ground. Therefore, Pipelight
integrates well with every existing tools.

If you are a bash guy, it will bring simplicity to your scripts. If you do
devOps stuffs, it will bring flexibility to your pipelines.

Whatever your skills in programming are, automation should be accessible. It
would result in project early automation implementation for you to focus only on
the code that matters.

### Bypass the classic harsh automation path

::: tip tl;dr

The solution Pipelight brings is to **bettern already existing shell scripts**.

:::

We usualy seek automation because we face repetitive thus painful tasks of
varied nature. So we go down the automation road:

1. **Edite a shell script**

   ```sh
   #deploy.sh
   vitest
   vite build
   rsync local_files to_my_remote_server
   ```

   [+] Bash is quick to set up, and very appaeling when scripting simple tasks.

   [-] Bash syntax isn't easy. It lakes primitives/structures like Array,
   Object, Map... It can quickly become unreadable as it get complex.

2. **Then, write a python script**

   [+] More readable.

   [-] It is too specific - not reusable between projects without many efforts.

3. **Finally, set up a CICD pipeline with its entire ecosystem**

   [+] It's easy to reuse pipelines. Has logging.

   [-] Ressource and time consuming for full fledged solution installation and
   configuration.

On the automation road, Pipelight comes right after the shell script(1) in term
of simplicity, while doing the heavy lift of a CICD ecosystem(3)

1. Shell script

- **Pipelight**

2. Python script
3. CICD ecosystem

## Technical choices

### Why Typescript over already wide spread TOML/ YAML ?

::: tip tl;dr

For flexibility and reusability

:::

Usual configuration optimised languages (TOML/ YAML) are not easy to tweak.

**Variables**, **structs** and **loops** does not exist natively in those
languages. Consequently, those features depends on the automation tool
implementing them resulting in different syntax for every tools.

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

To create another version of this pipeline with slightly different env
variables. The pipeline will need to be entirely cloned, going against
reusability and comfort.

**Typescript to the rescue**

The most flexible way to write a configuration file is finally to write it in a
programming language. Tailwind, Vite and many other web frameworks have already
taken down this path.

Pipelight is about **executing bash strings** so, it needed a popular language
well suited for **string manipulation**, with an appaeling syntax and an as soft
as possible learning curve.

Typescript was indeed well-suited for this mission. It realy shines when it
comes to do simple things.

### Why not another programming language ?

Internally, pipelight calls the language interpreter to generate a Json Object
and pass it to the rust code. Since a language can generate Json, Yaml or Toml,
it can be used to generate pipelines interpretable by pipelight.

In short, every language can be used to generate pipelines.

### Why only a cli ?

::: tip tl;dr

To remain lightweight and familiar.

:::

Pipelight is made for **efficency**. As of today it's a single executable that
weighs under 13Mb.

It has the minimum required functions for a cicd tool and delegates features to
the already widely spread specialized softwares:

- Git for software versioning and event detection.
- Linux for security and access rights.

In consequence, it is blazing fast.

Pipelight has also been built with **comfort** in mind.

Most developers only feel soothed when in front of a terminal emulator.
Pipelight avoids the disconfort of leaving the terminal by exposing a standard
minimal cli.

### Why not container native ?

There actually is helpers to enable container support if you don't want to
implement a custom solution yourself.

Pipelight intend to run wherever bash runs. It should by default permit the
execution of nude pipelines for:

- constraints environment that can't afford containers.
- atomic tasks like one line scripts that usually resides in package.json.
