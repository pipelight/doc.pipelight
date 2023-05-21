# Docker helpers <Badge type="warning" text="beta" />

If you often use containers, there will be times where you will often write the same things.

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

It's flexible but way too verbose compare to other deployment software.
This is where Typescript comes to the rescue.

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
const version = "production";
const service = "deno";
const dns = "pipelight.dev";
const params = {
  host: "linode",
  dns: "pipelight.dev",
  version: version
};
```

Create a docker object.

```ts
// Docker object creation
const docker = new Docker({
  images: [
    {
      name: `pipelight/doc:${version}`
    }
  ],
  containers: [
    {
      name: `${version}.${service}.${dns}`,
      ip: "127.0.0.1",
      image: {
        name: `pipelight/doc:${version}`
      },
      ports: [{ out: 9080, in: 80 }]
    }
  ]
});
```

Use it in your pipeline definition.
This example is combined with pipeline definition helpers.

```ts
// Pipeline creation with Docker helpers
const compositionPipe = pipeline("composition", () => [
  step("create declaration files", () => ["tsc"]),
  // Create images locally and send it to remotes
  step("build and send images", () => [
    ...docker.images.create(),
    ...docker.images.send(["localhost"])
  ]),
  step(
    "replace containers",
    () =>
      ssh(
        ["localhost"],
        [...docker.containers.remove(), ...docker.containers.create()]
      ),
    {
      mode: "continue"
    }
  )
]);
```
