<script lang="ts" setup>
const base = import.meta.env.BASE_URL;
const debian = `pipelight-${import.meta.env.VITE_GIT_VERSION}-any.deb`;
const archlinux = `pipelight-${import.meta.env.VITE_GIT_VERSION}-any.pkg.tar.zst`;
const fedora = `pipelight-${import.meta.env.VITE_GIT_VERSION}-any.rpm`;
</script>

# Getting Started

## Install with a package manager

Arch Linux (AUR)

```sh
paru -S pipelight
```

Fedora/CentOS and derivates

```sh-vue
curl {{ base }}packages/{{ fedora }}
yum install {{ fedora }}
```

Debian/Ubuntu and derivates

```sh-vue
curl https://doc.pipelight.areskul.com/packages/debian/{{ debian }}
dpkg -i {{ debian }}
```

## Install with the installation script

For any linux distribution

```sh
curl https://doc.pipelight.areskul.com/scripts/install.sh | sh
```

## Write a pipeline

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

## Command line usage

:::tip
Use the commands in the same folder as your config file.
:::

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
