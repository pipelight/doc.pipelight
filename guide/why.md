<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# Why using pipelight ?

<Features />

## Typescript (Code as Configuration)

If sommething can be written in Javascript it wiil be. quote sitation
As a pipeline get complexe, you want to add variables, conditions, loops and more.

### Better than Bash

Bash is very appaeling when scripting simple tasks, but...

- Syntax isn't common, and differs from most used languages.
- Lakes structures like Array, Object, Map...
- Because of the following a bash Linter can't be very useful to debug scripts

See?! This becomes awefull!

```sh
#deploy.sh
if [[ -eq ]]
vitest
vite build
rsync local_files to_my_remote_server
```

### Better than YAML

Usual configuration optimised languages like YAML and TOML are not easy to tweak.
The way to add variables, struct and loops is very tight to the automation tool you are using.
So a different synthax for every tool.

```yaml
#deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

becomes the following

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

## Logs

## Made for efficency

Pipelight is written in [Rust](https://www.rust-lang.org/), so it's fast!!

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and [Git](https://git-scm.com/).

## Terminal friendly

Run a pipeline and check logs without living your terminal.
Pipelight stays in the terminal, and is nothing more than a Command Line Tool.

## Automation

Add triggers to your pipeline definition.
It will automatically run in the background on matching event.

```ts
//pipelight.config.ts
triggers: [
  {
    actions: ["pre-push"],
    branches: ["master"],
  },
],
```
