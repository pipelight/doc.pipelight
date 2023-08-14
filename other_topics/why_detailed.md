# Why another CICD tool ?

## The software nindo(philosophy)

Pipelight follows some crucial guidelines:

- keep execution fast
- distribute lightweight binaries
- transparent in its logs and error messages
- beeing open-source
- and sovereign

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

## Why only a cli ?

Pipelight is made for efficency.
As of today it's a single executable that weighs under 6Mb.

In consequence, it is blazing fast.

It has the minimum required functions for a cicd tool
and delegate features to the already widely spread specialized softwares:

- Git for software versioning and event detection
- Linux for security and access rights
