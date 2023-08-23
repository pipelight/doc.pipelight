# Docker helpers <Badge type="warning" text="beta" />

# Usage

Wether you created it using the
[Loose](/helpers/docker/loose)
or the [Strict](/helpers/docker/loose)
declaration, the resulting `Docker` Object remains the same.

Bulk create components

```ts
docker.networks.create();
docker.volumes.create();
docker.images.create();
docker.containers.create();
```

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
