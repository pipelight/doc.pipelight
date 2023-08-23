# Docker helpers <Badge type="warning" text="beta" />

# Loose declaration (High abstraction level)

**Better for ordinary docker architectures and multi environment deployments**.

The loose declaration allows fast twist of common docker infrastructures
and eases deploying several copies of the same docker infrastructure in multiple environments.

## Namespace isolation (security)

Docker entity names are auto-generated based on the provided `suffix` and `globals`.
This way, docker infrastructures are isolated one from another by entity names.

However, the namespace segregation isn't absolute
and you can still make interactions between namespaces.

::: tip Namespace isolation over Virtual isolation

This **conceptual** separation avoids collision between docker entities
while beeing much **flexible, lighter and cost effective** than another nested level of virtual separation.

:::

### Naming rules

- image: `<dns>/<suffix>:<version>`
- container: `<version>.<suffix>.<dns>`
- volume: `<version>_<container.suffix>_<dns>__<suffix>`
- network `<version>_<dns>__<suffix>`

## The most out of Dockerfile (generalizability)

_Inspired by Rust and Laravel file hierarchy._

The [ImageAutoParams](https://deno.land/x/pipelight/mod.ts?s=Docker) type **only** accepts suffix(nor name) as parameter.
Consequently, the helper automatically seaks the file at `.docker/Dockerfile.<suffix>` to build the image.

```ts
const container: ContainerAutoParams = {
  suffix: "api" // [!code ++]
};
```

```ts
export interface ImageAutoParams {
  suffix: string;
  file?: string; // set another file path
}
```

This enforces images to be declared in a `Dockerfile` and folded into a tidy directory.
at `.docker/Dockerfile.<suffix>`.

```dockerfile
# .docker/Dockerfile.api
FROM ubuntu:latest // [!code ++]

# Add users
# Install stuffs

```

It is then possible to make an idea on the deployment procedure
just by having a glance at the `.docker` directory of your project.

```sh
.docker
├── Dockerfile.api // [!code ++]
├── Dockerfile.db
└── Dockerfile.front
```

## Implicit component declaration

Define a
[Docker](https://deno.land/x/pipelight/mod.ts?s=Docker) instance
based on the
[DockerAutoParams](https://deno.land/x/pipelight/mod.ts?s=DockerAutoParams) type.

Here, you only define:

- Globals (global variables)
- and Containers

```ts
interface DockerAutoParams {
  globals: Globals;
  containers: ContainerAutoParams[];
}
```

Components (images, volumes, and networks) linked to the container **are
auto-generated** and thus doesn't need to be declared as in the
[Strict declaration](/helpers/docker/strict).

```ts
const docker = new Docker({
  globals: {
    version: "production",
    dns: "pipelight.dev"
  },
  containers: [
    {
      suffix: "api",
      volumes: [
        {
          suffix: "save",
          target: "/patn/in/container"
        }
      ],
      networks: [
        {
          suffix: "net",
          ip: "172.0.4.12"
        }
      ],
      ports: [{ out: 9080, in: 80 }]
    }
  ]
});
```

```ts
docker.images.create();
docker.volumes.create();
docker.containers.create();
```

Here, we created a single container
`production.api.pipelight.dev`,
built from the image
`pipelight.dev/api:production`.
It attaches a volume
`production_api_pipelight.dev__save`
and has ip `172.0.4.12` on the network
`production_pipelight.dev__net` with subnet `172.0.4.0/24`.
