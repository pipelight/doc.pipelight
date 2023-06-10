# Helpers

::: tip TYPES

If something is missing, or if you seek deeper customization,
[See the complete type definition on DenoLand](https://deno.land/x/pipelight/mod.ts)

:::
::: tip UPGRADE
If needed, upgrade helpers to latest version.

```sh
deno cache --reload pipelight.ts
```

:::

## TL;DR

Helpers are functions that bulk generate bash commands!

## Overview

Helpers are **Javascript/Typescript** functions that will do some heavy lift to easily define complex pipelines.
There is actually 3 helpers groups:

- **common** helpers (ease pipeline definition)
- **docker** helpers (ease docker infrastructure management)
- **template** helpers (customizable prebuilt pipelines)

With each goup made on top of the previous one.

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

### A dire need of simplicity

Pipelight core features allow users to write pipelines in whichever manner is possible.

You surely have already built your own functions to generate pipelines.

Helpers are here to **standardize** and **structurize pipeline definition**
to finally ship great functions to **ease trivial pipeline writting**.

For example, this helper will generate bash docker commands so you don't have to.

```ts
const docker = new Docker({
    images: [{
        name: "example"
        file: "Dockerfile.example"
    }]
})
const my_step = step(("build_images") => docker.images.create()),
```

Instead of writting them explicitly, like in the block beneath.

```ts
const my_step = {
  name:"build_images"
  commands: [
    "docker build --tag image_name -f Dockerfile.example . "
    // And so on for every images
  ]
}
```

::: tip DEBUG

You can check auto-generated commands by inspecting the resulting pipeline.

```sh
pipeline inspect
```

:::

## A thrilling example

Aside from the boring Docker Object defintion.
This is what the core of a pipeline made with helpers looks like.

Here we use the **pipeline**, **step**, **ssh**, and **docker** helpers.

This pipeline build some user defined docker images, send them to remote,
Then, on the remote, it replaces the old existing containers with the new generated ones,
to finally run them.

```ts
const docker = new Docker(params);

// Pipeline creation using Docker helpers
const my_pipeline = pipeline("deploy_containers_to_remote", () => [
  // Create images locally and send them to remote
  step("build and send images", () => [
    ...docker.images.create(),
    ...docker.images.send([host])
  ]),
  // Build containers on remote and run them
  step("update containers", () =>
    ssh([host], [...docker.containers.remove(), ...docker.containers.create()])
  )
]);
```

As you can see above, helpers combination allows us to write understandable
and straightforward code to generate powerfull pipelines.
