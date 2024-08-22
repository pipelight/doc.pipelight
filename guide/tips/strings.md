# Pipeline doping ⚡

## String interpolation

Make the most out of typescript string interpolation.

Use anti quotes (backward quotes) and the `${}` to parse variables
as a strings.

```ts
const path = "~/my";
const domain = "remote";
const remote_path = "~/remote_my";

`scp -r ${path} ${domain}@${remote_path}`;
```

```ts{20}
//pipelight.ts
const params = {
  remote: {
    domain: "myserver.com",
    path: "/remote/directory"
  },
  local: {
    path: "/my/build/directory"
  }
};

const config = {
  pipelines: [
    {
      name: "deploy",
      steps: [
        {
          name: "send files to server",
          commands: [
            `scp -r ${params.local.path} ${params.remote.domain}@${params.remote.path}`
          ]
        }
      ]
    }
  ]
};
export default config;
```

## Multiline strings

Use the trailing slash to spread a string over multiple lines for easier reading.

```ts
`docker build \
--label='traefik.enable=true'`;
```

```ts
commands: [
  `docker build \
    --label='traefik.enable=true' \
    --label='traefik.http.routers.default.rule=Host("${docker.container.dns}")' \
    --label='traefik.http.routers.default.tls=true' \
    --tag ${docker.image.name} \
    .vitepress/dist`,
  `docker save ${docker.image.name} | ssh -C ${host} docker load`
];
```
