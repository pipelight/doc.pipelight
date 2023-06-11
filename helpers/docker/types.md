# Docker helpers types

## Docker

### DockerParams interface definition

For example, this DockerParams Object describes:

- an image to be build;
- two containers with their associated volume sharing the same network

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
          target: "/public/uploads"
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
          target: "/var/bil/postgresql/data"
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

### Docker Class

```ts
class Docker {
  networks: Network[] = [];
  containers: Container[] = [];
  images: Image[] = [];
  volumes: Volume[] = [];
  // Methods
  update(); // Build images
  upgrade(); // Create and Run containers
}
```

## Images

Reminder. The steps to build a container.
Dockerfile -> Image -> Container

Define the images you wich to build.
If only the name is provided it will look for the **Dockerfile** in the root directory.

### ImageParams interface definition

```ts
const params: ImageParams = {
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

A container is based on an image.
You have to include this image name inside the container definition.

A container can be linked to volumes and networks.
You have to include volumes and networks names inside the container definition.

```ts
const params: ContainerParams = {
  name: "development.api.my_app",
  image: {
    name: "my_app/api:development"
  },
  volumes: [
    {
      name: "my_vol",
      target: "/data"
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
  ports?: PortParams[];
  // handcraft
  envs?: string[];
  args?: Record<string, string>[];
}
```

::: info

```ts
// Provide environment variables to the container.
envs?: string[];
// Add arguments for container creation.
args?: Record<string, string>[];
```

:::

### Container Class

```ts
class Container implements ContainerParams {
...
  // return commands to create container and run it
  create(): string[];
  // return commands to restart existing container
  restart(): string[];
  // return commands to stop container and remove it
  remove(): string[];
  // wrap provided commands to execute them inside the container.
  exec(commands: string[]): string[]
}
```

### Host network security

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
ports: [{ private: false, out: 9080, in: 80 }];
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

### VolumeParams interface definition

::: info Opinionated docker architecture

_I'm a strong advocate for "Docker for small projects" and not just huge, scaling behemoths and microservices._ - Cameron Spear

To enforce infrasctructure maintability for the smallest projects,
docker helpers perpetuate this philosophy by only handling named volumes...

**However**, you can link a named volume to a custom path in host. (Bind mounts but cleaner)
This way, `docker volume ls` outouts every binds. No need to `docker container inspect`
every container to troobleshoot unexpected behavior related to bind mounts.

```ts
const params = {
  name: "my_vol"
  source: "/host/directory/"
};
```

:::

Declare your volume.

```ts
const params: VolumeParams = {
  name: "my_vol"
};
```

```ts
interface VolumeParams {
  name: string;
  source?: string; // path on host
}
```

Link it to a container.

```ts
const container = {
  name: `my_container`,
  volumes: [
    {
      name: `my_vol`,
      // The path inside the container to which the volume will be linked
      target: "/data"
    }
  ]
};
```

### Volume Class

```ts
class Volume implements VolumeParams {
...
  // create volume
  create(): string[];
  // remove volume
  remove(): string[];
  // create a volume backup
  backup(): string[];
  // restore volume from backup
  restore(): string[];
}
```
