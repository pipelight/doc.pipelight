<script lang="ts" setup>
const base = "https://packages.pipelight.dev";
const debian = `pipelight-${import.meta.env.VITE_GIT_VERSION}.deb`;
const archlinux = `pipelight-${import.meta.env.VITE_GIT_VERSION}.pkg.tar.zst`;
const fedora = `pipelight-${import.meta.env.VITE_GIT_VERSION}.rpm`;
</script>

# Getting Started

::: tip Software size

Pipelight is a relatively **lightweight** binary that wheighs around **13Mb**.
It is by design only compatible with linux.

:::

## Install with your package manager

### Nixos (flake)

Try it in an isolated shell.

```nix
nix shell github:pipelight/pipelight
```

Install it on your system.

```nix
{
  description = "NixOS configuration for crocuda development";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    pipelight.url = "github:pipelight/pipelight";
  };

  outputs = {
    nixpkgs,
    pipelight,
  }: {

    # Put this somewhere in your
    # environment system packages
    # user packages
    # or
    # home manager packages
    pipelight.packages.${system}.default

  };
}
```

### Arch Linux (and derivates)

Install the binary from the AUR

```sh
paru -S pipelight
```

or compile from the source code for latest updates

```sh
paru -S pipelight-git
```

### Debian based Linux (debian, ubuntu and derivated)

The software being quite young, it can't be found in the big distros repository
yet. You will have to install it manually.

First install dependencies:

- Deno, javascript runtime (optionnal)
- Git, software version manager (optionnal)

```sh-vue
curl -O {{ base }}/{{ debian }}
dpkg -i {{ debian }}
```

### Fedora Linux (fedora, centos and derivates)

The software being quite young, it can't be found in the big distros repository
yet. You will have to install it manually.

First install dependencies:

- Deno, javascript runtime (optionnal)
- Git, software version manager (optionnal)

```sh-vue
curl -O {{ base }}/{{ fedora }}
yum install {{ fedora }}
```

## Install from source

Clone the repo. Build binaries. Move binaries to your bin directory.

```sh
git clone https://github.com/pipelight/pipelight.git
cd pipelight
cargo build --release
cp target/release/pipelight /usr/bin/
```

## Install with the installation script <Badge type="danger" text="alpha" />

For any other linux distribution.

```sh-vue
curl {{ base }}/scripts/install.sh | sh
```

## Install with the asdf or rtx <Badge type="danger" text="alpha" />

[asdf](https://asdf-vm.com/) and [rtx](https://github.com/jdx/rtx) - these are systems of manage your runtimes. 

For asdf
```sh
asdf plugin add pipelight https://github.com/kogeletey/asdf-pipelight

# Install specific version
asdf install pipelight latest
```

or using rtx

```sh
rtx plugin add https://github.com/kogeletey/asdf-pipelight
rtx install pipelight@latest
```
