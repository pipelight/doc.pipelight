# Getting Started

::: tip Software requirements
Because it's speed is only due to it being tightly coupled to linux processes and git.
Pipelight is only available on Linux distributions like [Arch Linux](https://wiki.archlinux.org/title/Installation_guide)
If you're already using it, it means you belongs to the worthy.. This peace of greatness is for you!
:::

## Install/Uninstall

### With Arch Linux

Install from the [AUR](https://aur.archlinux.org/packages?O=0&K=pipelight) with your favorite package manager.

```sh
paru -S pipelight
```

And uninstall

```sh
paru -Rcns pipelight
```

### From sources

First install dependencies.

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

Uninstall by deleting binaries

```sh
rm /<my_bin_directory>/pipelight*
```

## Config file

The only rule is to export a **Config object**.
More details in the [in depth section](/guide/config).

Importing the Config type from the npm package will give you a pleasant typing support.
Create pipelines with steps and commands.
Add automatic triggers and have fun.

```ts
//pipelight.config.ts
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

**The actulal pipeline to deploy this website.**
