# Docker+ helpers <Badge type="danger" text="alpha" />

Here soma automation has been added to **docker helpers**,
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
      image: {
        suffix: "api"
      },
      volumes: [
        {
          suffix: "save",
          path: {
            inner: "/patn/in/container"
          }
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
step("update images", () => service.update());
step("update containers", () => service.upgrade());
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
Then names are generated based on the provided suffix and globals.

This way, docker infrastructures are isolated one from another by entities names.

This **conceptual** separation is much lighter and cost effective than another nested level of **virtual** separation
but still avoids collision between entities.

Container images only accepts suffix nor name as parameters.

```ts
export interface ImageAutoParams {
  suffix: string;
  file?: string;
}
```

By default, the helper automatically seaks a file in `.docker/Dockerfile.<suffix>`.
to build the image.
It enforces images to be declared as dockerfiles in a uniq and tidy directory.

It is then possibe to make an idea on the deployment procedure just by having a glance to the `.docker` directory of your project.

```sh
.docker
├── Dockerfile.api
├── Dockerfile.db
└── Dockerfile.front
```
