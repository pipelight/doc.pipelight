# Docker+ helpers types

Interfaces are transformed into Classes [Docker Helpers](/helpers/docker/types)

## Docker

```ts
const docker: DockerAutoParams ={
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
  image: ImageAutoParams;
  volumes?: Array<MountVolumeAutoParams | MountVolumeParams>;
  networks?: Array<MountNetworkAutoParams | MountNetworkParams>;
  ports?: PortParams[];
  envs?: string[];
}
```

### Images

If only a suffix is provided, by default,
this helper will seak the **./docker/Dockerfile.<suffix>** to build the image.

```ts{2,6}
export interface ImageAutoParams {
  suffix: string;
  file?: string;
}
```

It means that you can't create a container with an image name like "ubuntu:latest".
Because it will look for a file at .docker/Dockerfile.ubuntu:latset.

Instead it will force you to tidy your dockerfiles and create a .docker/Dockerfile.ubuntu

```dockerfile
FROM ubuntu:latest
// Add users
// Install stuffs

```

Like so, it is possible to have an idea of the deployment process only by looking into the .docker directory.

### Volumes

```ts{2,7}
export interface MountVolumeParams {
  name: string;
  // Path inside container
  target: string;
}
export interface MountVolumeAutoParams {
  suffix: string;
  // Path inside container
  target: string;
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
