# Getting Started

## Install

Package only available on Arch linux.
(Available soon on Debian/Ubuntu and Fedora)

Install from the AUR

```bash
paru -S pipelight
```

Or from source

```sh
git clone <this_repo>
cd pipelight
cargo build --release
cp target/release/pipelight* /<my_bin_directory>/
```

## Remove

With an AUR package manager

```bash
paru -Rcns pipelight
```

Or delete binaries

```sh
rm /<my_bin_directory>/pipelight*
```

## Cli

### Usage

```bash
# in your favorite shell
pipelight <command> <options> <args>
```

List available pipelines

```bash
pipelight ls
```

This will trigger a pipeline execution

```bash
pipelight run <pipeline_name>
```

Check execution

```bash
pipelight logs -vvv
```

## Config

Here is an example of what could contain a basic config file (simp.config.mjs)

```ts
//pipelight.config.ts

export default {
  pipelines: [
    {
      name: "test",
      steps: [
        {
          name: "build",
          commands: ["yarn install", "yarn build"]
        }
      ],
      trigger: {
        branches: ["master", "dev"],
        actions: ["pre-push", "pre-commit"]
      }
    }
  ]
};
```

### Typings

Supports Typescript.
Import type definition from npm package.

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
          commands: ["yarn install", "yarn build"]
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
