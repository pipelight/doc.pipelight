<script lang="ts" setup>
const base = "https://packages.pipelight.dev";
const version = import.meta.env.VITE_GIT_VERSION;
const tag = version.split('-').shift();
const debian = `pipelight-${version}.deb`;
const archlinux = `pipelight-${version}.pkg.tar.zst`;
const fedora = `pipelight-${version}.rpm`;
</script>

# Getting Started

::: tip Software size

Pipelight tries to keep it **lightweight** with a binary that wheights around
**13Mb**.

:::

## Install with your distribution package manager

::: details Arch Linux (and derivates)

Install the binary from the AUR with an AUR helper like yay, paru, aura...

```sh
paru -S pipelight
```

or compile from the source code for latest updates

```sh
paru -S pipelight-git
```

:::

::: details Debian (ubuntu and derivates)

The software being quite young, it can't be found in the big distros repository
yet. You will have to install it manually.

First install dependencies:

- Deno, javascript runtime (optionnal)
- Git, software version manager (optionnal)

```sh-vue
curl -O {{ base }}/{{ debian }}
dpkg -i {{ debian }}
```

:::

::: details Fedora (centos and derivates)

The software being quite young, it can't be found in the big distros repository
yet. You will have to install it manually.

First install dependencies:

- Deno, javascript runtime (optionnal)
- Git, software version manager (optionnal)

```sh-vue
curl -O {{ base }}/{{ fedora }}
yum install {{ fedora }}
```

:::

::: details Nixos (with flakes)

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

Do not forget to update for newest versions.

```sh
nix flake upgrade
```

:::

## Install with the Rust package manager (Cargo)

::: details Cargo build from source

```sh-vue
cargo install --git https://github.com/pipelight/pipelight

# Install specific version
cargo install --git https://github.com/pipelight/pipelight --branch master
cargo install --git https://github.com/pipelight/pipelight --tag v{{ tag }}
```

:::

## Install with tool version managers (asdf or rtx) <Badge type="danger" text="alpha" />

[Asdf](https://asdf-vm.com/) and [Rtx](https://github.com/jdx/rtx) are systems
to manage your runtimes and ensure that versions are the same across multiple
devices.

::: details asdf

```sh
asdf plugin add pipelight https://github.com/kogeletey/asdf-pipelight

# Install specific version
asdf install pipelight latest
```

:::

::: details rtx

```sh
rtx plugin add https://github.com/kogeletey/asdf-pipelight

# Install specific version
rtx install pipelight@latest
```

:::

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
