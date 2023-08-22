# Docker helpers <Badge type="warning" text="beta" />

# Strict declaration (Low abstraction level)

**Better for uncommon docker architecture and single environment deployments**

The strict declaration allows a more fine-grained docker architecture creation
than the [Loose declaration](/helpers/docker/loose).
It let you more control on what is created and what is not.

## Explicit component declaration

**Every docker component must be declared.**

You must declare a ressource before linking it.

### Example

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
// ensure volumes
docker.volumes.create();
docker.containers.create();
```
