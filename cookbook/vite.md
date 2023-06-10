# Vite app

If you are into websites, you may be accustomed to javascript frameworks.

Here we will deploy a javascript/typescript front-end.
First define a Docker Object with **docker** or **docker+** helpers,

Create a dockerfile in the default directory.

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

Edit the core of your pipeline.

```ts
// pipelight.ts
const { deploy } = useTemplate();

// Create a Docker Object with docker or docker+
const docker = new Docker(params);

// Local deployment
const my_pipeline = deploy(docker);

// Remote deployment
const my_pipeline = deploy(docker, "linode");
```
