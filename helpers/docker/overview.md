<script setup lang="ts">
</script>

# Docker helpers <Badge type="warning" text="beta" />

Pipelight by nature allows a great flexibility,
But implementing generics and already wide spread automation methods that require loads of commands,
like **docker testing and deployment**, is quite cumbersome.

You could write your own functions but Pipelight got you covered with the docker helpers.

Docker helpers provide the needed functions to manipulate docker components based on a single docker architecture object definition.

## Opinionated docker architecture

::: warning Simplifying docker

_"I'm a strong advocate for "docker for small projects" and not just huge, scaling behemoths and microservices."_
([docker local-persist plugin author](https://github.com/MatchbookLab/local-persist))

There is many ways to achieve same results using docker,
however, every choice has been made to bring the greatest simplicity, maintability and debuggability possible
to the smallest teams (>=1 member).

:::

The docker helpers brings some optimisation on the table:

- enforce pipeline readability :

  We need to understand a command at a glance when debugging so we favor long options over short options (`--volume` over `-v`)

- enforce docker architecture maintainability:

  Docker has the practical [bind-mounts](https://docs.docker.com/storage/bind-mounts/)
  which is the ability to link a filesystem path `/home/mystuffs` into a docker container `/path/into/container`.
  However, they can be a mess to troubleshoot because not reported by the volume listing command `docker volume ls`.

  The docker helpers only supports [named volumes](https://docs.docker.com/storage/volumes/)
  and [named bind mounts](https://github.com/MatchbookLab/local-persist) (bind-mounts but cleaner) thanks to the
  [docker local-persist plugin](https://github.com/MatchbookLab/local-persist) that you need to install locally.

  This way, `docker volume ls` outputs every volumes **and every binds**.
  No need to `docker container inspect` every one of your containers anymore.

## Understand the Inner lifecycle

First define your docker components such as images, containers, volumes and networks
according to the [DockerParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams) type.

```ts
const params: DockerParams = {};
```

```ts
interface DockerParams {
  images?: ImageParams[];
  volumes?: VolumeParams[];
  networks?: NetworkParams[];
  containers?: ContainerParams[];
}
```

Attempting to use methods on interfaces returns an error.

```ts
// Returns an error like "create() doesn't exists on type ContainerParams[]"
params.containers.create(); // [!code --]
```

You first have to transform this
[**DockerParams Interface**](https://deno.land/x/pipelight/mod.ts?s=DockerParams) instance
into a [**Docker Class**](https://deno.land/x/pipelight/mod.ts?s=Docker) instance.
Then, **every deep inner Interface is transformed in its Class equivalent.**
allowing the usage of Classes **methods**.

```ts
// Enables methods
const docker: Docker = new Docker(params); // [!code ++]
docker.container.create(); // [!code ++]
```

```ts
// returns commands to create every defined volumes
docker.volumes.create();
// return commands to create every defined containers
docker.containers.create();
```

Extensively, turning every Interface into its Class equivalent, brings up the associated methods.

```ts
const params: ContainerParams;
const container: Container = new Container(params);
// generate commands
container.create();
```
