# Getting Started

## Install/Uninstall

### With Arch Linux

Install from the [AUR](https://aur.archlinux.org/packages?O=0&K=pipelight) with your favorite package manager.

```sh
paru -S pipelight
```

And uninstall

```bash
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

## Usage

It's a simple command line tool (CLI).
Here is the set of most used commands.

```bash
# in your favorite shell
pipelight <command> <options> <args>
```

List available pipelines:

```bash
pipelight ls
```

Trigger a pipeline execution:

```bash
pipelight run <pipeline_name>
```

Compulsively check execution state:

```bash
pipelight logs -vvv
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level3.png" alt="pretty verbose logs picture">
</p>

**The actulal pipeline to deploy this website.**

## Config file

Here is an example of a basic config file.

```ts
//pipelight.config.ts
import { Config } from "npm:pipelight";
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
