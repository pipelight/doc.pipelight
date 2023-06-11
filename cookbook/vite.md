# Javascript Frontend

Here we will deploy a javascript front-end using docker/docker+ helpers and pipeline template helpers.

First, create a dockerfile in the default directory.

```sh
.docker
└── Dockerfile.front
```

Add some actions to the dockerfile:

- Copy built/bundeled javascript files inside a container.
- Serve it with the [vercel/serve](https://github.com/vercel/serve) utility.

```dockerfile
# Dockerfile.front
FROM archlinux:latest
# Install dependencies
RUN pacman -Sy
RUN pacman -S --noconfirm npm
RUN npm add -g serve

# Create working dir
RUN mkdir app
WORKDIR /app
COPY ./dist .

# Serve and expose port
EXPOSE 3000
ENTRYPOINT ["serve"]

```

Define a Docker interface instance

```ts
// .pipelight/env/production.ts
export const params: DockerAutoParams = {
  globals: {
    version: "production",
    dns: "pipelight.dev"
  },
  containers: [
    {
      suffix: "front",
      ports: [{ in: 3000, out: 9280 }]
    }
  ]
};
```

Create a docker Object with the previously defined parameters
and use the pipeline deploy template.

```ts
// pipelight.ts
// Create a Docker Object with docker or docker+
import type { Docker } from "https://deno.land/x/pipelight/mod.ts";
import { params } from "./.pipelight/env/production.ts";
const docker = new Docker(params);

// Use the docker deployment template helper
import { useTemplate } from "https://deno.land/x/pipelight/mod.ts";
const { deploy } = useTemplate();

const my_pipeline = deploy(docker);
```

The **build commands** might be different depending on the bundler or framework you use (vite build, pnpm build...).
But the docker deployment stays the same wether you are using Vite, Turbopack or Webassembly and others.

```ts
// pipelight.ts
// Create a step to build your js files
// and add it on the top of the pipeline steps
const build: Step = step("build_files", () => ["pnpm install", "vite build"]);
my_pipeline.steps.unshift(build);

const config = {
  pipelines: [...my_pipeline]
};
export default config;
```
