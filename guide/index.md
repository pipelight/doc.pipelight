<script setup>
import Example from '../.vitepress/theme/components/Example.vue';
import Sheet from '../.vitepress/theme/components/Sheet.vue';
</script>

# Getting Started

## The big picture

<Sheet>

<Example>
### Basic bash script

```sh
#example.sh
## List files

ls;

## Get working directory

pwd;

```

```sh
./example.sh
```

</Example>

rewrite it into pipeline --->

<Example>
```ts
//pipelight.config.ts
import { Config } from "npm:pipelight";
const config: Config = {
  pipelines: [
    {
      name: "example",
      steps: [
        {
          name: "list files",
          commands: ["ls"]
        },
        {
          name: "get working directory",
          commands: ["pwd"]
        }
      ]
    }
  ]
};
export default config;
````

```sh
pipelight run example
```

</Example>

get logs --->

<Example>
```sh
pipelight logs -vvv
```
```sh
● Succeeded - Tue, 07 Mar 2023 16:07:30 +0100
action: manual
pipeline: example (8.16ms)
├─step: list files (4.36ms)
│   ╰─ls (4.26ms)
│     ╰─example.config.ts
│       example.sh 
│       pipelight.config.ts 
╰─step: get working directory (3.07ms)    
    ╰─pwd (2.97ms)       
      ╰─/home/areskul/PIPE/playground/examples
```
</Example>
</Sheet>

## Install

The one click install package only available on Arch linux right now.
(Available soon on Debian/Ubuntu and Fedora)

Install from the AUR:

```sh
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
