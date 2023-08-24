<script setup lang="ts">
import Example from "@components/Example.vue";
import Sheet from "@components/Sheet.vue";
import { tailwind } from "@utils/breakpoints.ts";
</script>

# Pipeline definition helpers

See the complete type definition on [DenoLand](https://deno.land/x/pipelight/mod.ts)

::: tip UPGRADE

When needed, upgrade helpers to latest version.

```sh
deno cache --reload pipelight.ts
```

:::

## What is it ?

::: tip tl;dr

**Helpers are functions that bulk generate bash commands!**

:::

Helpers are **Javascript/Typescript** functions that will do some heavy lift to easily define complex pipelines.
There is actually 3 helpers groups:

- **common** helpers (ease pipeline definition)
- **docker** helpers (ease docker infrastructure management)
- **template** helpers (customizable prebuilt pipelines)

With each goup made on top of the previous one.

### Born from a dire need of simplicity

Pipelight core features allow users to write all-mighty pipelines in whichever manner is possible.
However beeing such a low level tool comes with its drawbacks.

Even if you enjoy writting functions to simplify automation of trivial but heavy tasks
like containerization, virtualization, test and deployments.
Pipeline definition can quickly become time consuming.

As the main goal of automation is to save you time, pipelight comes with already made functions
that are called helpers.

Helpers are made to **standardize** and **structurize pipeline definition**
to finally ship great functions to **ease trivial pipeline writting**.

### Embrace programmation (again)

For example, the following pipeline creates a docker images and run the containers based on those images.

::: ino
You don't need to know what is docker to understand what helpers bring on the table
in the the following example.
:::

Instead of writting your commands explicitly,
the helper generates the appropriate bash commands so you don't have to.

<div class="landing">
<Sheet class="sm">
<Example>

```ts
steps: [
  {
    name: "build_images",
    commands: [
      "docker build --tag image_name -f Dockerfile.example . " // [!code focus]
      // Repeat for every images // [!code focus]
    ]
  },
  {
    name: "run_containers",
    commands: [
      "docker run image_name container_name" // [!code focus]
      // Repeat for every container // [!code focus]
    ]
  }
];
```

</Example>
<p class="xl">{{ tailwind.md ? '⇢' : '⇣' }}</p>
<Example>

```ts
steps: [
  {
    name: "build_images",
    commands: [
      ...docker.images.create() // [!code focus]
    ]
  },
  {
    name: "build_images",
    commands: [
      ...docker.containers.build() // [!code focus]
    ]
  }
];
```

</Example>
</Sheet>
</div>

### Delicious Syntax 🤌

Import needed helpers from the deno repository.

```ts
import { helper_name } from "https://deno.land/x/pipelight/mod.ts";
```

Use them in your pipeline definition and enjoy the syntax.

```ts
step("build images and run containers", () => [
    ...docker.images.create(),
    ...docker.containers.create()
]),
```

## A thrilling example

Aside from the boring Docker Object defintion.
This is what the core of a pipeline made with helpers looks like.

Here we use the **pipeline**, **step**, **ssh**, and **docker** helpers.

This pipeline build some user defined docker images, send them to remote,
Then, on the remote, it replaces the old existing containers with the new generated ones,
to finally run them.

```ts
// Docker object with previously defined params
const docker = new Docker(params);

pipeline("deploy_containers_to_remote", () => [
  // Create images locally and send them to remote
  step("build and send images", () => [
    ...docker.images.create(),
    ...docker.images.send(host)
  ]),

  // Build containers on remote and run them
  step("update containers", () =>
    ssh(host, () => [
      ...docker.containers.remove(),
      ...docker.containers.create()
    ])
  )
]);
```

As you can see above, helpers combination allows us to write understandable
and straightforward code to generate powerfull pipelines.

::: info DEBUG

You can check auto-generated commands by inspecting the resulting pipeline.

```sh
pipeline inspect
```

:::
