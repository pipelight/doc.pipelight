# Docker helpers <Badge type="warning" text="beta" />

Pipelight is flexible but becomes way too verbose
when implementing already wide spread automation methodes like docker testing and deployment.

This is where Typescript comes to the rescue with docker helpers.
It will write the needed commands based on a Docker, Container, Network... Object definition.

## Basic usage

Here is the core of your pipeline

```ts
// import helpers from deno repository
import {
  Docker,
} from "https://deno.land/x/pipelight/mod.ts";

const docker = new Docker(params);

step("build images and run containers", () => [
    ...docker.images.create(),
    ...docker.containers.create()
]),
```

But you first need to define a Docker Object instance.

```ts
// Set global vars
const globals = {
  host: "linode",
  dns: "pipelight.dev",
  service: "deno",
  version: production
};

// Docker object creation
const makeParams = ({ host, version, dns, service }): DockerParams => ({
  images: [
    {
      name: `pipelight/doc:${version}`
    }
  ],
  containers: [
    {
      name: `${version}.${service}.${dns}`,
      image: {
        name: `pipelight/doc:${version}`
      },
      ports: [{ out: 9080, in: 80 }]
    }
  ]
});
const docker = new Docker(makeParams(globals));
```

Use it in your pipeline definition.

```ts
// Pipeline creation with Docker helpers
const compositionPipe = pipeline("composition", () => [
  // Create images locally and send them to remotes
  step("build and send images", () => [
    ...docker.images.create(),
    ...docker.images.send([host])
  ]),
  step(
    "replace containers",
    () =>
      ssh(
        [host],
        [...docker.containers.remove(), ...docker.containers.create()]
      ),
    {
      mode: "continue"
    }
  )
]);
```

::: tip TYPES

[See the complete type definition on DenoLand](https://deno.land/x/pipelight/mod.ts)

:::
