# Docker helpers <Badge type="warning" text="beta" />

# Loose declaration (High abstraction level)

The loose decalration allow automatic twist of common docker infrastructures
and eases deploying several copies of the same docker infrastructure in multiple environments.

## Implicit component declaration

Linked images, networks and volumes in the Container definiton are auto-generated
and therefor doesn't need to be explicitly written.

You first need to define a Docker Object.

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
interface DockerAutoParams {
  globals: Globals;
  containers: ContainerAutoParams[];
}
```

## Namespace isolation

Docker entity names are auto-generated based on the provided `suffix` and `globals`.
This way, docker infrastructures are isolated one from another by entity names.

However, the namespace segregation isn't absolute
and you can still make interactions between Namespaces.

::: tip Namespace isolation over Virtual isolation

This **conceptual** separation avoids collision between docker entities
while beeing much **flexible, lighter and cost effective** than another nested level of virtual separation.

:::

The example defines:

- from an image (name: `<dns>/<suffix>:<version>` = `pipelight.dev/api:production`)
- a single container (name: `<version>.<suffix>.<dns>` = `production.api.pipelight.dev`)
- with a volume attached to it (name: `<version>_<container_suffix>_<dns>__<suffix>` = `production_api_pipelight.dev__save`)
- attach to a network (name: `<version>_<dns>__<suffix>` = `production_pipelight.dev__net` with subnet `172.0.4.0/24`)

**However**, it is still possible to use names instead of suffixes, to make more complex containers, volumes and network linking.

## Enforced dockerfile usage

The images definition **only** accepts suffix(nor name) as parameter.

```ts
const container: ContainerAutoParams = {
  suffix: "api",
  image: {
    suffix: "api", // [!code ++]
    file: "./.docker/subdirectory/Dockerfile.api"
  }
};
```

```ts
export interface ImageAutoParams {
  suffix: string;
  file?: string;
}
```

By default,
the helper automatically seaks the file `.docker/Dockerfile.<suffix>`
to build the image.

It enforces images to be declared as dockerfiles in a tidy directory.
Create the **required** dockerfile.

```dockerfile
# ./docker/Dockerfile.api // [!code ++]
FROM ubuntu:latest // [!code ++]

# Add users
# Install stuffs

```

It is then possible to make an idea on the deployment procedure just by having a glance at the `.docker` directory of your project.

```sh
.docker
├── Dockerfile.api // [!code ++]
├── Dockerfile.db
└── Dockerfile.front
```
