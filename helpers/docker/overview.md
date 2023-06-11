# Docker helpers <Badge type="tip" text="stable" />

Pipelight is flexible but becomes way too verbose
when implementing already wide spread automation methodes like **docker testing and deployment**.

This is where Typescript comes to the rescue with docker helpers.
Helpers writes the needed commands based on a Docker, Container, Network... Object definition.

## Basic usage

### How it works ?

Here is the core of a pipeline using docker helpers.
Method calls like `docker.images.create()` return an array of commands (bash strings)
like `["docker build..."]`.

```ts
let params: DockerParams;
const docker = new Docker(params);

step("build images and run containers", () => [
    // generate commands
    ...docker.images.create(),
    ...docker.containers.create()
]),
```

It makes use of a Docker Object which takes some parameters:

- Images
- Containers
- Volumes
- Networks

### A simple example

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
const my_pipeline = pipeline("deploy", () => [
  // Create images locally and send them to remotes
  step("build and send images", () => [
    // Generates array of bash commands
    ...docker.images.create(),
    ...docker.images.send([host])
  ]),
  step(
    "create containers on remote",
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

## Understand the Inner lifecycle

First define your containers, volume and so on inside a DockerParams Object.

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

You first have to transform this **Docker Interface** instance into a **Docker Class** instance.
**Every deep inner Interface is transformed in its Class equivalent.**

This allows usage of **methods**.

```ts
// Returns an error like "create() doesn't exists on type ContainerParams[]"
params.containers.create(); // [!code --]

// Enables methods
const docker: Docker = new Docker(params); // [!code ++]
docker.container.create(); // [!code ++]
```

```ts
class Docker {
  networks: Network[];
  containers: Container[];
  images: Image[];
  volumes: Volume[];
}
```

```ts
// returns commands to create every defined volumes
docker.volumes.create();
// return commands to create every defined containers
docker.containers.create();
```

Extensively, turning every Interface into its Class equivalent, brings up the associated methods.

```ts
const container: Container = new Container(container_params);
// generate commands
container.create();
```
