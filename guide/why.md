<script setup>
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# Why using pipelight ?

<Features />

## TL;DR

It's only bash commands with syntaxic sugar.
The whole lifted by git-hooks!!

It enables:

- Automatic triggering on git event (pre-commit, pre-push...)
- Verbose logging.
- Easy variable declaration
- Easy scripting with typescript

## Made for efficency

Pipelight is written in [Rust](https://www.rust-lang.org/), so it's fast!!

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and [Git](https://git-scm.com/).

## Terminal friendly

Run a pipeline and check logs without living your terminal.
Pipelight stays in the terminal, and is nothing more than a Command Line Tool.

## Typescript (Code as Configuration)

It can't be denied that Javascript success is due t's very appealing synthax.
This language is:

- weakly typed so very easy to use.
- It's possible to make variables, loops, and functions.

It's the possible to write complex pipelines and decline them.

And finally, this script...

```sh
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

Wrap your commands into a Javascript Pipeline Object.
Then run the pipeline.

```bash
pipelight run <pipeline_name>
```

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
