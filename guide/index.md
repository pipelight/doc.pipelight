# Getting Started

::: tip Hardware requirements
Pipelight is a very small software that has nearly no footprint, so it can run on any device.
:::
::: warning Software requirements
Pipelight high performances are due to it being tightly coupled to Linux and Git.
So it is only available on **Linux distributions** like [Arch Linux](https://wiki.archlinux.org/title/Installation_guide).
:::

## Install/Uninstall

### With Arch Linux

Install from the [AUR](https://aur.archlinux.org/packages?O=0&K=pipelight) with your favorite package manager.

```sh
paru -S pipelight
```

And uninstall.

```sh
paru -Rcns pipelight
```

Remove generated files

```sh
rm -rf /<my_git_repo>/.git/hooks/
rm -rf /<my_git_repo>/.pipelight/
```

### From sources

First, install dependencies.

```sh
apt-get install deno
```

Then clone and build source code.

```sh
git clone <this_repo>
cd pipelight
cargo build --release
cp target/release/pipelight* /<my_bin_directory>/
```

Uninstall by deleting binaries.

```sh
rm /<my_bin_directory>/pipelight*
```

Remove generated files

```sh
rm -rf /<my_git_repo>/.git/hooks/
rm -rf /<my_git_repo>/.pipelight/
```

## Config file

The only rule is to export a **Config object**.
More details in the [in depth section](/guide/config).

Importing the Config type from the npm package will give you a pleasant typing support.
Create pipelines with steps and commands.
Add automatic triggers and have fun.

```ts
//pipelight.ts
import type { Config } from "npm:pipelight";
const config: Config = {
  pipelines: [
    {
      name: "test",
      steps: [
        {
          name: "build",
          commands: ["pnpm install", "pnpm build"]
        }
      ],
      trigger: {
        branches: ["master", "dev"],
        actions: ["pre-push", "pre-commit"]
      }
    }
  ]
};
export default config;
```

## Usage

It's a simple command line tool (CLI) that sticks to what you are accustomed to.

```sh
# in your favorite shell
pipelight <command> <options> <args>
```

Here is the set of most used commands.

List available pipelines:

```sh
pipelight ls
```

Trigger a pipeline execution:

```sh
pipelight run <pipeline_name>
```

Compulsively check execution state:

```sh
pipelight logs -vvv
```

<p align="center">
  <img class="terminal" src="/images/log_level_4.png" alt="pretty verbose logs picture">
</p>

_The actulal pipeline to deploy this website._
