# Docker+ helpers <Badge type="danger" text="alpha" />

Here some automation has been added to **docker helpers**,
resulting in higher level parameters, and opinionated automations.

Docker+ helpers allow automatic twist of common docker infrastructures
and eases deploying several copies of the same docker infrastructure in multiple environments (development.

## Basic usage

### How it works ?

Here is the core of a pipeline using docker+ helpers.

```ts
let params: DockerAutoParams;
const docker = new Docker(params);

step("update images", () => docker.update());
step("update containers", () => docker.upgrade());
```

The Docker Object usage remains the same as in the docker helpers.
But here, the Docker Object takes less parameters than previously said in docker helpers:

- Globals
- Containers

Those will be flattened into the originals:

- Images
- Containers
- Volumes
- Networks

Linked images, networks and volumes in the Container definiton are auto-generated
and therefor doesn't need to be explicitly written.

### A simple example

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

Generate the commands to build and deploy your containers.

```ts
// Build Images and Create containers on local host
step("update images", () => docker.update());
step("update containers", () => docker.upgrade());
```

Or use the internal Docker Object to tweak the commands.
For example if you want to build images locally.

```ts
// Build Images on local host
// and Create containers on local remote
step("build and send images", () => [
  ...docker.update(),
  ...docker.images.send([host])
]);
step("create containers on remote", () => ssh([host], docker.upgrade()));
```

## Differences with docker helpers

Takes mainly **suffixes instead of names** for docker entities definition(container, volume, image and network).

### Conceptual segregation

Then names are auto-generated based on the provided suffix and globals.
This way, docker infrastructures are isolated one from another by entities names.

::: tip Conceptual > Virtual

This **conceptual** separation avoids collision between docker entities,
and is much **lighter and cost effective** than another nested level of virtual separation

:::

The example defines:

- a single container (name: `<version>.<suffix>.<dns>` = `production.api.pipelight.dev`)
- with a volume attached to it (name: `<version>_<container_suffix>_<dns>__<suffix>` = `production_api_pipelight.dev__save`)
- attach to a network (name: `<version>_<dns>__<suffix>` = `production_pipelight.dev__net` with subnet `172.0.4.0/24`)

**However**, it is still possible to use names instead of suffixes, to make more complex containers, volumes and network linking.

### Enforced dockerfile usage

Container images definition **only** accepts suffix nor name as parameters.

```ts
export interface ImageAutoParams {
  suffix: string;
  file?: string;
}
```

Consequences are that, by default,
the helper automatically seaks the file `.docker/Dockerfile.<suffix>` to build the image.

It enforces images to be declared as dockerfiles in a uniq and tidy directory.

It is then possible to make an idea on the deployment procedure just by having a glance at the `.docker` directory of your project.

```sh
.docker
├── Dockerfile.api
├── Dockerfile.db
└── Dockerfile.front
```
