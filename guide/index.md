# Getting Started

## What it does.

It ads superpowers to bash scripts!

I often need to automate tasks, and the fastest way to do it is by writting bash scripts.

For example, when I need to deploy a website, I write the following script.
This is a basic bash script to test, build and send a website online.

```sh
//deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

But even though it's fast, the drawbacks are:

- I need to manualy execute that script everytime I want to see changes on my website.
- It's a pain to troobleshoot when something goes wrong.
- If I wan't to do things more complex in bash, things will get unreadable and unreusable.

And this script, becomes this following.

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

## Install

The one click install package only available on Arch linux right now.
(Available soon on Debian/Ubuntu and Fedora)

Install from the AUR:

```bash
paru -S pipelight
```

Or from source:

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

## Uninstall

With an AUR package manager

```bash
paru -Rcns pipelight
```

Or delete binaries

```sh
rm /<my_bin_directory>/pipelight*
```

## Usage

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

Compulsively check execution

```bash
pipelight logs -vvv
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level3.png" alt="pretty verbose logs picture">
</p>
_The actulal pipeline to deploy this website._

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
