<script lang="ts" setup>
const base = "https://packages.pipelight.dev";
const debian = `pipelight-${import.meta.env.VITE_GIT_VERSION}.deb`;
const archlinux = `pipelight-${import.meta.env.VITE_GIT_VERSION}.pkg.tar.zst`;
const fedora = `pipelight-${import.meta.env.VITE_GIT_VERSION}.rpm`;
</script>

# Getting Started

::: tip Software size

Pipelight is a very **lightweight** binary that wheighs around **6Mb**.

:::

## Install with your favorite package manager

### Arch Linux

Install the binary from the AUR.

```sh
#yay
paru -S pipelight
```

Or directly compile the source code for latest updates.

```sh
#yay
paru -S pipelight-git
```

### Other Linux

The software being quite young, it can't be found in the bigest linux distribution repositories yet.
You have to install it manually.

First, you need to install dependencies:

- Deno, typescript/javascript runtime (optionnal);
- Git, software version manager (optionnal);
- Watchexex, listen for file modification (optionnal).

Then, install the package from binaries.

Fedora/CentOS and derivates:

```sh-vue
curl -O {{ base }}/{{ fedora }}
yum install {{ fedora }}
```

Debian/Ubuntu and derivates:

```sh-vue
curl -O {{ base }}/{{ debian }}
dpkg -i {{ debian }}
```

## Install with the installation script <Badge type="warning" text="beta" />

For any other linux distribution.

This script downloads dependencies and downloads the source code.
Then, it compiles the source code and moves the resulting binary to `/usr/bin/`.

```sh-vue
curl {{ base }}/scripts/install.sh | sh
```
