# Docker helpers <Badge type="warning" text="beta" />

Pipelight is flexible but becomes way too verbose
when implementing already wide spread automation methodes like **docker testing and deployment**.

This is where Typescript comes to the rescue with docker helpers.
It will write the needed commands based on a Docker, Container, Network... Object definition.

## Basic usage

### How it works ?

Here is the core of a pipeline using docker helpers.
Functions calls like `docker.images.create()` return an array of commands (bash strings)
like `["docker build..."]`.

```ts
const docker = new Docker(params);

step("build images and run containers", () => [
    // generate commands
    ...docker.images.create(),
    ...docker.containers.create()
]),
```

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

## Understand the inner lifecycle

First define your parameters as a Docker Interface.

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

Attempting to use functions on interfaces will return an error.

```ts
// Will return an error: "create doesn't exists on type ContainerParams[]"
params.containers.create(); // [!code error]
```

You will first have to transform this **Docker Interface** instance into a **Docker Class** instance.
Every inner Interface will be transformed in its Class equivalent.
Allowing usage of functions.

```ts
const docker: Docker = new Docker(params);
```

```ts
class Docker {
  networks: Network[];
  containers: Container[];
  images: Image[];
  volumes: Volume[];
}
```

This will enable **functions** usage.

```ts
// Will create every volumes
docker.volumes.create();
// Will create every containers
docker.container.create();
```

Extensively, turning an Interface into its Class equivalent, will provide you the associated functions.

```ts
const container: Container = new Container(container_params);
// generate commands
container.create();
```

## Docker

### Docker interface definition

```ts
const params: DockerParams = {
  // declare images to build
  images: [
    {
      name: "my_app/api:development",
      file: ".docker/Dockerfile.api"
    }
  ],
  // declare volumes to create
  volumes: [
    {
      name: "my_vol_bucket"
    },
    {
      name: "my_vol_db_save"
    }
  ],
  // declare networks to create
  networks: [
    {
      // network with random subnet
      name: "my_net"
    }
  ],
  containers: [
    {
      name: "my_api",
      // Base container on previously declared image
      image: {
        name: "my_app/api:development"
      },
      // Link container to network
      networks: [
        {
          name: "my_net"
        }
      ],
      volumes: [
        {
          // persist api uploads into volume
          name: "my_vol_bucket",
          path: {
            inner: "/public/uploads"
          }
        }
      ]
    },
    {
      name: "my_database",
      image: {
        name: "postgres:latest"
      },
      // Link container to network
      networks: [
        {
          name: "my_net"
        }
      ],
      volumes: [
        {
          // persist database data into volume
          name: "my_vol_bucket",
          path: {
            inner: "/var/bil/postgresql/data"
          }
        }
      ]
    }
  ]
};
```

```ts
interface DockerParams {
  images?: ImageParams[];
  volumes?: VolumeParams[];
  networks?: NetworkParams[];
  containers?: ContainerParams[];
}
```

## Images

### Image interface definition

```ts
const image_params = {
  name: "my_app/api:development",
  file: ".docker/Dockerfile.api"
};
```

```ts
interface ImageParams {
  name: string;
  file?: string;
}
```

### Image Class

```ts
class Image implements ImageParams {
...
  // return commands to build image
  create(): string[];
  // return commands to delete image
  remove(): string[];
  // send image via ssh to a list of hosts
  send(hosts: string[]): string[];
}
```

## Containers

### Container interface definition

```ts
const params: ContainerParams = {
  name: "development.api.my_app",
  image: {
    name: "my_app/api:development"
  },
  volumes: [
    {
      name: "my_vol",
      path: {
        inner: "/data"
      }
    }
  ],
  networks: [
    {
      name: "my_net"
    }
  ]
};
```

```ts
interface ContainerParams {
  name: string;
  image: Pick<ImageParams, "name">;
  volumes?: MountVolumeParams[];
  networks?: MountNetworkParams[];
  ports?: Port[];
}
```

### Container Class

```ts
class Container implements ContainerParams {
...
  // return commands to create container and Run it
  create(): string[];
  // return commands to stop container and remove it
  remove(): string[];
}
```

## Network

### Network interface definition

```ts
const params: NetworkParams = {
  name: "my_network",
  // define subnet
  subnet: "172.20.4.0/16"
);
```

```ts
interface NetworkParams {
  name: string;
  subnet?: string;
  driver?: string;
}
```

Link it to a container

```ts
const container: Container = {
  name: `my_container`,
  networks: [
    {
      name: `my_net`,
      // Set container static ip on subnet
      ip: "172.20.4.4"
    }
  ]
};
```

### Network Class

```ts
class Network implements NetworkParams {
...
  // return commands to create network
  create(): string[];
  // return commands to remove network
  remove(): string[];
}
```

## Volumes

::: info Opinionated

For now, named volumes only!
This helpers delegate volume gestion to docker to avoid users the burden of bind mount declaration.

:::

Volumes are mainely used to persist data outside of a container and retrieve them after an update (or for sharing between containers).
Named volumes creation is simple.

### Volume interface definition

```ts
const vol_params = {
  name: "my_vol"
};
```

```ts
interface VolumeParams {
  name: string;
}
```

Link it to a container

```ts
const container = {
  name: `my_container`,
  volumes: [
    {
      name: `my_vol`,
      path: {
        // The path inside the container to which the volume will be linked
        inside: "/data"
      }
    }
  ]
};
```

### Volume Class

```ts
class Volume implements VolumeParams {
...
  // return commands to create volume
  create(): string[];
  // return commands to remove volume
  remove(): string[];
}
```

## Host network security

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

If you want to expose your container to the outside world you will have to either:

- use a **reverse proxy**,

- or specify it in your container definition

```ts
  ports: [{ private: false, out: 9080, in: 80 }]
};
```

```ts
  ports: [{ private: env.PRODUCTION, out: 9080, in: 80 }]
};
```
