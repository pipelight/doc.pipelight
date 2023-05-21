# Docker helpers <Badge type="warning" text="beta" />

## Small plugin, big improvments

If you often use containers, there will be times where you will often write the same things.
Stop container, Delete container, Create container...

```ts
const steps = [
  {
    name: `delete remote container:${version}`,
    mode: ["jump_next"],
    commands: [
      `ssh -C ${host} \
        "
          docker stop ${docker.container.name}; \
          docker rm ${docker.container.name}
        "`
    ]
  },
  {
    name: `recreate remote container:${version}`,
    commands: [
      ssh([host],
        [`docker run -d -p ${docker.network}:${docker.port.out}:${docker.port.in} \
          --name=${docker.container.name} ${docker.image.name}`]
      })
    ]
  }
];
```

Pipelight is flexible but becomes way too verbose compare to other deployment software that implements specific plugins.
This is where Typescript comes to the rescue with docker helpers.
It will write the needed commands based on a simple but greatly customizable container definition.

## Basic usage

You may want to import helpers from the official deno repository.

```ts
import {
  Docker,
  Container,
  Network
} from "https://deno.land/x/pipelight/mod.ts";
```

Set global vars.

```ts
// Global vars
const globals = {
  host: "linode",
  dns: "pipelight.dev",
  service: "deno",
  version: production
};
```

Create a docker object.

```ts
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
