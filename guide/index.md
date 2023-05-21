<script lang="ts" setup>
const base = "https://packages.pipelight.dev";
const debian = `pipelight-${import.meta.env.VITE_GIT_VERSION}.deb`;
const archlinux = `pipelight-${import.meta.env.VITE_GIT_VERSION}.pkg.tar.zst`;
const fedora = `pipelight-${import.meta.env.VITE_GIT_VERSION}.rpm`;
</script>

# Getting Started

## Install with your package manager

Arch Linux (AUR)

```sh
paru -S pipelight
```

or for latest updates

```sh
paru -S pipelight-git
```

Fedora/CentOS and derivates

```sh-vue
curl -O {{ base }}/{{ fedora }}
yum install {{ fedora }}
```

Debian/Ubuntu and derivates

```sh-vue
curl -O {{ base }}/{{ debian }}
dpkg -i {{ debian }}
```

## Install with the installation script

For any linux distribution

```sh-vue
curl {{ base }}/scripts/install.sh | sh
```

## Write a pipeline

Importing the Config type from the deno package will give you a pleasant typing support.

Create pipelines with steps and commands.
Add automatic triggers and have fun.

```ts
//pipelight.ts
import { Config } from "https://deno.land/x/pipelight/mod.ts";
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
      triggers: [
        {
          branches: ["master", "dev"],
          actions: ["pre-push", "pre-commit"]
        }
      ]
    }
  ]
};
export default config;
```

::: danger

Avoid `console.log()` statements inside your config file (only for debugging purpose).
This will mislead the Config Object creation and prevent pipelight from running.

:::

## Command line usage

::: info

Use the commands in the same folder as your config file.

:::

```sh
# in your favorite shell
pipelight <command> <options> <args>
```

Here is the set of most used commands.

List available pipelines:

```sh
pipelight ls
```

Pretty print a pipeline definition on stdout:

```sh
# Display a selection prompt
pipelight inspect
# or
pipelight inspect <pipeline_name>
```

Trigger a pipeline execution:

```sh
# Display a selection prompt
pipelight run
# or
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
