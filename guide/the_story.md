# The Automation Desilusions

## Bash is fast but scripting gets uncomfortable.

I often need to automate tasks, and the fastest way to do it is by writting bash scripts.

For example, when I need to deploy a website, I write the following script.
This is a basic bash script to test, build and send a website online.

```sh
#deploy.sh
vitest
vite build
rsync local_files to_my_remote_server
```

But even though it's

- quickly written
- rapidly tested

the drawbacks are:

- It has to be manualy executed everytime I update my website.
- It's difficult to troubleshoot when something goes wrong.
- It gets unreadable and unreusable as it grows.

## CICD tools steal my time!

### Installation is harsh

I came to the point where I took the time to install [Drone.io](https://www.drone.io/).
It was an exhausting process as I needed Gitea installed locally too.
But I enjoyed using it.

Drawbacks:

- Difficult to install
- Difficult to troubleshoot

### Running is Ressource intensive

My computer was on the verge of dying every time I had simultaneous pipelines running.
At some point it crashed,
And 4 hour of debugging later, I found out it was because I updated my nft-tables for some virtualization projects.

Drawbacks:

- Has ressource(cpu/ram) intensive event listeners
- The best GUI on the market but still not on point though

### YAML and TOML is exhausting

Pipelines are most of the time defnied in YAML

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

But it's a pain to write variables, loops and its's imposible to write functions.

# A brighter sky

## Stick to the basics

Pipelight is written in Rust, so it's fast!!

It doesn't reinvent the wheel by making cumbersom dockerized event listeners, secrets or plugins.
It implements basic functionnality by beeing tightly coupled to Linux and Git.

## A good cli > bad gui

It's practical to see every logs in a gui and trigger pipelines from a click on a window.
But what if that cli isn't on point.

Pipelight stays in the terminal, and is nothing more than a Command Line Tool.

## Javascript to the rescue

It can't be denied that Javascript success is due t's very appealing synthax.
This language is:

- weakly typed so very easy to use.
- It's possible to make variables, loops, and functions.

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

It enables:

- Automatic triggering on git event (pre-commit, pre-push...)
- Verbose logging.
- Easy variable declaration
- Easy scripting with typescript

Display pretty logs

```bash
pipelight logs
```

<p align="center">
  <img class="terminal" src="https://doc.pipelight.areskul.com/images/log_level3.png" alt="pretty verbose logs picture">
</p>

**The actulal pipeline to deploy this website.**

Or get logs as json for further exploitation/integration

```bash
pipelight logs --raw
```
