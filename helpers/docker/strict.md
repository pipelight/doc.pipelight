<script lang="ts" setup>
import { inject } from "vue";
const Badge = inject("Badge");
</script>

# Docker helpers <Badge type="warning" text="beta" />

# Strict declaration (Low abstraction level)

**The strict declaration embraces the [docker](https://docs.docker.com/get-started/) normal usage**.

Better if you seek to create an uncommon docker architecture.

The strict declaration allows a more fine-grained docker architecture creation
than the [Loose declaration](/helpers/docker/loose) but is more verbose in counterpart.

## Explicit component declaration

**Every docker component must be declared.**

Here, the `Docker` object must be defined with:

- Images
- Networks
- Volumes
- and Containers

```ts
interface DockerParams {
  images?: ImageParams[];
  volumes?: VolumeParams[];
  networks?: NetworkParams[];
  containers?: ContainerParams[];
}
```

With the docker cli,
you first have to create the volume before you attach it to your container.

Likewise, here, you first have to add the volume definition,
before you can use it in the container definition. **It is the same with images and networks.**

```ts{3-8,10-14}
const params: DockerParams = {
  // Declare your images
  images: [
    {
      name: `pipelight/doc:${version}`,
      file: ".docker/Dockerfile.front"
    }
  ],
  // Declare your volumes
  volumes: [
    {
      name: "my_vol"
    }
  ],
  // Declare your containers with linked volumes
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

```ts{2-3}
docker.images.create();
docker.volumes.create();
docker.containers.create();
```

## Back to Loose declaration

The
[Loose declaration](/helpers/docker/loose)
only flattens
[DockerAutoParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams) type,
containing:

- Globals (global variables)
- and Containers

into a
[DockerParams](https://deno.land/x/pipelight/mod.ts?s=DockerParams) type,
containing:

- Images (induced)
- Networks (induced)
- Volumes (induced)
- and Containers

Which means components (image, volume, network) linked to the container are
auto-generated and thus doesn't need to be declared.
