# Docker helpers <Badge type="warning" text="beta" />

# Strict declaration (Low abstraction level)

let you control on what is created and what is not.
and must declare every to be created docker component.

## Explicit component declaration

You must declare a ressource before linking it.

For example:
Declaring this container does not create the linked volume.
It links an already existing volume to the container.

```ts
const params = {
  containers: [
    {
      name: `my_container`,
      volumes: [
        {
          name: `my_vol`,
          target: "/data"
        }
      ]
    }
  ]
};
```

```ts
docker.containers.create();
```

You first have to create the volume.

```ts
const params = {
  // Declare your images.
  images: [
    {
      name: `pipelight/doc:${version}`
    }
  ],
  // Declare your volumes.
  volumes: [
    {
      name: "my_vol"
    }
  ],
  // Declare your containers with linked ressources
  containers: [
    {
      name: `my_container`,
      image: {
        name: `pipelight/doc:${version}`
      },
      volumes: [
        {
          name: `my_vol`,
          target: "/data"
        }
      ]
    }
  ]
};
```

```ts
docker.volumes.create();
docker.containers.create();
```

If the volume already exists it isn't replaced but used as is.

## Example

First define your docker components such as images, containers, volumes and networks
according to the [DockerParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams) type.

```ts
const params: DockerParams = {
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
};
```

Then, instanciate a `Docker` javascript `Object` based on those params.

```ts
const docker = new Docker(params);
```

Finally, use the `Docker` instance in your pipeline definition.

Here, **Every method returns an array of commands (bash strings).**
Calling `docker.images.create()` returns `["docker build..."]`.

```ts
const my_pipeline = pipeline("deploy", () => [
  // Create images locally and send them to remotes
  step("build and send images", () => [
    // Generates array of bash commands
    ...docker.images.create(),
    ...docker.images.send(host)
  ]),
  step("create containers on remote", () =>
    ssh(host, () => [
      ...docker.containers.remove(),
      ...docker.containers.create()
    ])
  )
]);
```
