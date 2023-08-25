<script lang="ts" setup>
const base = "https://packages.pipelight.dev";
const debian = `pipelight-${import.meta.env.VITE_GIT_VERSION}.deb`;
const archlinux = `pipelight-${import.meta.env.VITE_GIT_VERSION}.pkg.tar.zst`;
const fedora = `pipelight-${import.meta.env.VITE_GIT_VERSION}.rpm`;
</script>

# Getting Started

::: tip Software

Pipelight is a very **lightweight** binary that wheighs around **6Mb**.

:::

## Install from sources

### Arch Linux

```sh
#yay
paru -S pipelight-git
```

### Other Linux distributions

First, you need to install build-dependencies,

- Cargo, the Rust package manager.

and dependencies:

- Deno, typescript/javascript runtime (optionnal);
- Git, software version manager (optionnal);
- Watchexex, listen for file modification (optionnal).

Then, clone the git repository.

```sh
git clone git@gitea.com:pipelight/pipelight.git
```

Checkout to the latest tag.

```sh
tag=$(git describe --tags --abbrev=0)
git checkout $tag
```

Build the binary

```sh
cd pipelight
cargo build --release
```

The resulting binary can be found in `target/release/pipelight`.

Move it to `/usr/bin/` or add it to your `$PATH`.

## Install the binary with your favorite package manager

### Arch Linux

Install the binary from the AUR.

```sh
#yay
paru -S pipelight
```

### Other Linux distributions

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

## Install with the installation script <Badge type="danger" text="alpha" />

For any other linux distribution.

This script downloads dependencies and downloads the source code.
Then, it compiles the source code and moves the resulting binary to `/usr/bin/`.

```sh-vue
curl {{ base }}/scripts/install.sh | sh
```

## Special Notes

Pipelight can be used alongside every other CICD software.
