<script lang="ts" setup>
const version = import.meta.env.VITE_GIT_VERSION;
const tag = version.split('-').shift();
</script>

# Getting Started

::: tip Software size

Pipelight tries to keep it **lightweight** with a binary that wheights around
**13Mb**.

:::

## Install with Cargo (the Rust package manager)

::: details Cargo build from source {open}

```sh-vue
cargo install --git https://github.com/pipelight/pipelight

# Install specific version
cargo install --git https://github.com/pipelight/pipelight --branch master
cargo install --git https://github.com/pipelight/pipelight --tag v{{ tag }}
```

:::

## Install with your distribution package manager

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
nix flake update
nixos-rebuild switch
```

:::

## Install with tool version managers (asdf or rtx)

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
