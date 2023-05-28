# Service Helpers <Badge type="danger" text="alpha" />

Made on top of **docker helpers** to ease deploying several copies of the same docker infrastructure in different environments.

## Basic usage

Define a Service instance.

It only takes global vars, and Containers definition.
Every volume and network to which the container should be linked will be auto created or updated.

```ts
const service = new Service({
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

Generate the commands to build and deploy your containers.

```ts
step("bring_everything_up", () => service.up());
```

Or use the internal Docker Object to tweak the commands.
For example if you want to build images locally.

```ts
step("create:images", ()=>
service.docker.images.create()
)
step("send:images", ()=>
    service.docker.images.send([host])
)
step("create:containers:on_remote", ()=>
    ssh([host],[
    ...service.docker.network.remove()
    ...service.docker.network.create()
    ...service.docker.volumes.create()
    ...service.docker.containers.create()
    ])
)
```
