# Docker helpers <Badge type="warning" text="beta" />

# Usage

Wether you created it using the
[Loose](/helpers/docker/loose)
or the [Strict](/helpers/docker/loose)
declaration, the resulting `Docker` Object remains the same.

## General component methods

### Create

Bulk create components

```ts
docker.networks.create();
docker.volumes.create();
docker.images.create();
docker.containers.create();
```

### Remove

Bulk remove components

```ts
docker.networks.remove();
docker.volumes.remove();
docker.images.remove();
docker.containers.remove();
```

Or cherry pick what you want to create

```ts
const container = docker.containers.get("api") as Container;
container.create();
```

## Image specific methods

This method is to use when you wan't to build an image locally
and send it to a remote host.

```ts
docker.images.send(host);
```

## Container specific methods

Restart an existing container

```ts
docker.container.restart();
```

Execute commands inside a container.
Convenient method to run tests or post-install scripts.

```ts
const container = docker.containers.get("api) as Container;
container.exec(() => [
    "ps aux"
]);
```

## Volume specific methods <Badge type="warning" text="beta" />

### The naive backup

For convenience, there is a method to backup directories contained in a volumes as a `.tar.xz` file
stored into your home directory `~/.docker/volumes/<volume_name>`

```ts
docker.volumes.backup();
```

or cherry pick your volume

```ts
const volume = docker.volume.get("db") as Volume;
volume.backup();
```

And its equivalent to restore the backup

```ts
docker.volumes.restore();
```
