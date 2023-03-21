# Usefull Tips

## Get the best out of Typescript

### Typings

For easy debugging, import type definition from npm package.

```ts
//pipelight.ts
import { Config } from "npm:pipelight";
const config: Config = {
  pipelines: [
    {
      name: "test",
      steps: [
        {
          name: "build",
          commands: ["pnpm install", "pnpm build"]
        }
      ]
    }
  ]
};
export default config;
```

For the sake of reusability and when you need to deploy in multiple evironnements.
Here are some pattern that I personnaly use.

### Overuse string interpolation!..

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

### ..Add Parameter destructuring..

```ts{13,21}
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

const makeConfig = ({remote, local}) = > {
  pipelines: [
    {
      name: "deploy",
      steps: [
        {
          name: `send files to ${remote.domain}`,
          commands: [
            `scp -r ${local.path} ${remote.domain}@${remote.path}`
          ],
        },
      ],
    },
  ],
};

const config = makeConfig(params)

export default config;
```

### ..Split your config

Split your config into multiple files and separate concerns.
Overuse string interpolation, parameter destructuring and import/export ESM synthax.

Export here

```ts{19-21}
//.pipelight/config/default.ts

const makeDefaultConfig = ({remote, local}): Config = > {
  pipelines: [
    {
      name: "deploy",
      steps: [
        {
          name: `send files to ${remote.domain}`,
          commands: [
            `scp -r ${local.path} ${remote.domain}@${remote.path}`
          ],
        },
      ],
    },
  ],
};

export {
  makeDefaultConfig
}

```

And import here

```ts{2}
//pipelight.ts
import { makeDefaultConfig } from ".pipelight/config/default.ts";

const params = {
  remote: {
    domain: "myserver.com",
    path: "/remote/directory"
  },
  local: {
    path: "/my/build/directory"
  }
};

const config = makeConfig(params);

export default config;
```

You may want to store files under .pipelight/config
and import them in your main pipelight.config.ts

## Multiline strings

To write multiline strings use the trailing slash.

```ts
commands: [
  `docker build \
    --label='traefik.enable=true' \
    --label='traefik.http.routers.default.rule=Host("${docker.container.dns}")' \
    --label='traefik.http.routers.default.tls=true' \
    -t ${docker.image.name} .vitepress/dist`,
  `docker save ${docker.image.name} | ssh -C ${host} docker load`
];
```
