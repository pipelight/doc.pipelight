<script lang="ts" setup>
import { inject } from "vue";
const Badge = inject("Badge");
</script>

# Docker helpers <Badge type="warning" text="beta" />

::: warn Deprecated

Will maybe be deprecated in favor of docker compose...
If so, examples will be put here to help converting your pipelines.

:::

# Overview

Pipelight by nature allows a great flexibility.
But implementing generics and already wide spread automation methods that require loads of commands is quite cumbersome.

Concerning [docker](https://docs.docker.com/get-started/) usage,
you could write your own functions but Pipelight got you covered with the docker helpers.
You are all set for docker testing and deployment.

Docker helpers provide the needed **functions to manipulate docker components** based on a single docker architecture object definition.

## The quickest showcase!

Define your docker components into a [Docker](https://deno.land/x/pipelight/mod.ts?s=Docker) instance.

```ts
const docker = new Docker({
  containers: [
    {
      name: `my_container`,
      image: {
        name: "debian:latest"
      },
      ports: [{ in: 80, out: 8080 }]
    }
  ]
});
```

Use the internal methods to manipulate docker components.

```ts
docker.containers.create();
```

This example only scratches the surface.
You can define images, volumes and containers as well as their **intercations through networks**.

## Comes in two flavors 🍦

::: tip Author's note

The strict declaration is good to build small test suits.
Whereas the loose declaration is better suited to build pipelines that deploys applications(front/api/db...)
to multiple environnements(dev/prod...).

:::

To take the most out of this helpers you would want to use the docker [Loose declaration](/helpers/docker/loose)
which is the most **simple and automated** (and opinionated).
If this declaration does not suit your style, head towards the lower level helpers it is **based upon**.
Use the docker [Strict declaration](/helpers/docker/loose) for a more personnalized docker architecture definition.

## Understand the internal functionning

You first have to define your docker components (images, containers, volumes and networks)
according to the [DockerAutoParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams)
or the [DockerParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams) type.

```ts
const params: DockerAutoParams | DockerParams = {};
```

```ts
// Loose declaration
interface DockerAutoParams {
  globals: Globals;
  containers: ContainerAutoParams[];
}
```

```ts
// Strict declaration
interface DockerParams {
  images?: ImageParams[];
  volumes?: VolumeParams[];
  networks?: NetworkParams[];
  containers?: ContainerParams[];
}
```

Attempting to use methods on Typescript types and interfaces returns an error.

```ts
params.containers.create(); // returns an error // [!code --]
```

You have to transform the
[DockerAutoParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams)
or [DockerParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams) interface instance
into a [Docker](https://deno.land/x/pipelight/mod.ts?s=Docker) object instance.

Then, **every deep inner Typescript Interface is transformed in its Javascript Class equivalent.**
allowing the usage of Classes **methods**.

```ts
// enable methods
const docker: Docker = new Docker(params); // [!code ++]
// create every defined containers
docker.container.create(); // [!code ++]
// create every defined volumes
docker.volumes.create();
```

## Opinionated docker architecture

::: warning

_"I'm a strong advocate for "docker for small projects" and not just huge, scaling behemoths and microservices."_
([docker local-persist plugin author](https://github.com/MatchbookLab/local-persist))

There is many ways to achieve same results using docker,
however, every choice has been made to bring the greatest simplicity, maintability and debuggability possible
to the smallest teams (>=1 member).

:::

The helpers add an abstraction layer on docker to build big, in a few lines while keeping things tweakable,
to the point it has become a sort of **alternative to docker-compose**.

The docker helpers bring some optimisation on the table.

- enhance pipeline readability;

  We need to understand a command at a glance when debugging so we favor long options over short options (`--volume` over `-v`)

- enhance docker architecture maintainability;

  Docker has the practical [bind-mounts](https://docs.docker.com/storage/bind-mounts/)
  which is the ability to link a filesystem path `/home/mystuffs` into a docker container `/path/into/container`.
  However, they can be a mess to troubleshoot because not reported by the volume listing command `docker volume ls`.

  The docker helpers only supports [named volumes](https://docs.docker.com/storage/volumes/)
  and [named bind mounts](https://github.com/MatchbookLab/local-persist) (bind-mounts but cleaner) thanks to the
  [docker local-persist plugin](https://github.com/MatchbookLab/local-persist) that you need to install locally.

  This way, `docker volume ls` outputs every volumes **and every binds**.
  No need to `docker container inspect` every one of your containers anymore.

- enhance deployment related files storage;

  Force tidying your dockerfile for autoretrieve by the helper
  (**mandatory in Loose declaration**).

  ```sh
  .docker
  └── Dockerfile.test
  ```
