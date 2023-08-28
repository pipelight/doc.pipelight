<script lang="ts" setup>
import { inject } from "vue";
const Badge = inject("Badge");
</script>

# Pipeline Template helpers <Badge type="danger" text="alpha" />

::: info COMING NEXT

Every previously introduced helpers provide users great convenience and modularity
for small to medium pipelines definition.

But the've all been made with a big picture in mind...

To support the **top level helpers** that are coming.
Aiming to reduce to a few line big tasks like:

- Dig up complete docker infrastructures,
- Virtual machine creation and provisionning,
- Full server set up (web, mail, git...)

:::

## Basic usage

### How it works ?

Once you defined a Docker Object with **docker** or **docker+** helpers,
you usually write your pipeline in a few lines.
They often get repetitive, and that's where templating comes into play.

Here is the core of a pipeline using template helpers.

```ts
// Create a Docker Object with docker or docker+
const docker = new Docker(params);

const { deploy } = useTemplate();
// Local deployment
const my_pipeline = deploy(docker);
// Remote deployment
const my_pipeline = deploy(docker, "linode");
```

It simply creates or updates the docker items you defined in a Docker Object.

### Customize the pipeline

```ts
// Create a step to build your js files
const build: Step = step("build_files", () => ["pnpm install", "vite build"]);

// Add the build step on the top of the pipeline steps
my_pipeline.steps.unshift(build);

// Add triggers
my_pipeline.add_trigger!({
  branches: ["master", "main", "dev"],
  actions: ["pre-push", "manual"]
});
```

## Test

Run tests inside docker containers.

```ts
const { test } = useTemplate();
```
