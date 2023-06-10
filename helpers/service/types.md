# Docker+ helpers types

Those interfaces are transformed into Classes described in [Docker Helpers](/helpers/docker/types)

## Docker

```ts
const docker: DockerAutoParams = {
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
          ip: "172.40.3.2"
        }
      ],
      ports: [{ out: 9080, in: 80 }]
    }
  ]
};
```

```ts
interface DockerAutoParams {
  globals: Globals;
  containers: ContainerAutoParams[];
}
```

## Globals

```ts
interface Globals {
  version: string;
  // version: production
  dns: string;
  // dns: pipelight.dev
}
```

## Containers

```ts
interface ContainerAutoParams {
  suffix: string;
  image?: ImageAutoParams;
  volumes?: Array<MountVolumeAutoParams | MountVolumeParams>;
  networks?: Array<MountNetworkAutoParams | MountNetworkParams>;
  ports?: PortParams[];
  envs?: string[];
}
```

### Images

Images only accepts suffix nor name as parameters.

```ts{2,6}
export interface ImageAutoParams {
  suffix: string;
  file?: string;
}
```

By default, the helper automatically seaks a file in `.docker/Dockerfile.<suffix>`.
to build the image.
It enforces images to be declared as dockerfiles in a uniq and tidy directory.

It means that you can't create a container by declaring an image name like
Because it will look for a file at .docker/Dockerfile.ubuntu:latset and won't find it.

```ts
const container: ContainerAutoParams = {
  suffix: "api",
  image: {
    suffix: "ubuntu:latest" // [!code --]
  }
};
```

Declaring a suffix is enough for the image to created and the dockerfile to be retrieved.

```ts
const container: ContainerAutoParams = {
  suffix: "api" // [!code ++]
};
```

Or, if needed, set the file and suffix yourself.

```ts
const container: ContainerAutoParams = {
  suffix: "api",
  image: {
    suffix: "api", // [!code ++]
    file: "./.docker/subdirectory/Dockerfile.api"
  }
};
```

Create the **required** dockerfile.

```dockerfile
## ./docker/Dockerfile.api // [!code ++]
FROM ubuntu:latest // [!code ++]

# Add users
# Install stuffs

```

It is then possibe to make an idea on the deployment procedure
just by having a glance at the `.docker` directory in your project.

```sh
.docker
├── Dockerfile.api
├── Dockerfile.db
└── Dockerfile.front
```

### Volumes

```ts{2,7}
export interface MountVolumeParams {
  name: string;
  source?: string; // Path on host
  target: string; // Path inside container
}
export interface MountVolumeAutoParams {
  suffix: string;
  source?: string; // Path on host
  target: string; // Path inside container
}
```

### Networks

```ts
export interface MountNetworkParams {
  name: string;
  ip?: string;
}
export interface MountNetworkAutoParams {
  suffix: string;
  ip?: string;
}
```
