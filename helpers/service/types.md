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

```ts
export interface ImageAutoParams {
  suffix: string;
  file?: string;
}
export interface ImageParams {
  name: string;
  file?: string;
}
```

### Volumes

```ts
export interface MountVolumeParams {
  name: string;
  path: {
    // Inside container path
    inside: string;
  };
}
export interface MountVolumeAutoParams {
  suffix: string;
  path: {
    // Inside container path
    inside: string;
  };
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
