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

## Install with your package manager

### Arch Linux

Install the binary from the AUR

```sh
paru -S pipelight
```

or compile from the source code for latest updates

```sh
paru -S pipelight-git
```

### Other Linux

The software being quite young, it can't be found in the big distros repository yet.
You will have to install it manually.

First install dependencies:

- Deno, javascript runtime (optionnal)
- Git, software version manager (optionnal)
- Watchexex, listen for file modification (optionnal)

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

## Install with the installation script <Badge type="warning" text="beta" />

For any other linux distribution.

```sh-vue
curl {{ base }}/scripts/install.sh | sh
```
