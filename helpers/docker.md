# Docker helpers <Badge type="warning" text="beta" />

Pipelight is flexible but becomes way too verbose
when implementing already wide spread automation methodes like **docker testing and deployment**.

This is where Typescript comes to the rescue with docker helpers.
It will write the needed commands based on a Docker, Container, Network... Object definition.

## Basic usage

### How it works ?

Here is the core of a pipeline using docker helpers.
Functions calls like `docker.images.create()` return an array of commands/strings
like `["docker build..."]`.

```ts
// import helpers from deno repository
import {
  Docker,
} from "https://deno.land/x/pipelight/mod.ts";
const docker = new Docker(params);

step("build images and run containers", () => [
    // generate commands
    ...docker.images.create(),
    ...docker.containers.create()
]),
```

::: tip TYPES

[See the complete type definition on DenoLand](https://deno.land/x/pipelight/mod.ts)

:::

### Working example

You first need to define a Docker Object.

```ts
const docker = new Docker({
  // Declare your images to be build
  images: [
    {
      name: `pipelight/doc:${version}`
    }
  ],
  // Declare containers
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
```

And then use it in your pipeline definition.

```ts
const my_pipeline = pipeline("composition", () => [
  // Create images locally and send them to remotes
  step("build and send images", () => [
    // Generate bash commands
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

## Docker Object defintion

```ts
interface DockerParams {
  images?: ImageParams[];
  volumes?: VolumeParams[];
  networks?: NetworkParams[];
  containers?: ContainerParams[];
}
```

## Network

### Network Object

```ts
const network = new Network({
  name: "my_network"
});

// Return commands to create/update the network
network.create();
```

```ts
interface NetworkParams {
  name: string;
  subnet?: string;
  // subnet: "172.20.4.0/16"
  driver?: string;
  // driver: "bridge";
}
```

## Containers

### Container Object

```ts
interface ContainerParams {
  name: string;
  image: Pick<ImageParams, "name">;
  volumes?: MountVolumeParams[];
  networks?: MountNetworkParams[];
  ports?: Port[];
}
```

### Nerwork Security

When you define a container and publish it,
it is usually exposed to your localhost (127.0.0.1) and your public ip (0.0.0.0).

By default, docker helpers only publish to localhost
to avoid undesired port exposure and reduce server attacking surface.

```ts
const container = {
  name: `${version}.${service}.${dns}`,
  image: {
    name: `pipelight/doc:${version}`
  },
  ports: [{ out: 9080, in: 80 }]
};
```

This will expose your container:80 on localhost 127.0.0.1:9080

## Volumes

::: info Opinionated

For now, named volumes only!
This helpers delegate volume gestion to docker to avoid users the burden of bind mount declaration.

:::

Volumes are mainely used to persist data outside of a container and retrieve them after an update (or for sharing between containers).
Named volumes creation is simple.

```ts
const my_volume = {
  name: "my_vol"
};
```

```ts
interface VolumeParams {
  name: string;
}
```

You will have to link it to a container

```ts
const container = {
  name: `my_container`,
  volume: {
    name: `my_vol`
    path:{
        // The path inside the container to which the volume will be linked
        inside: "/data"
    }
  },
};
```
