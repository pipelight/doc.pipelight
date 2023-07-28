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
