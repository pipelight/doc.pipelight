# Pipeline doping ⚡

## Powerfull pipeline writting tips

Until now the configuration was only about writting an object.
But this is not the point of using a programming language in your configuration file.

Here, we will showcase Typescript modularity into a config file.

::: tip

The helpers have been built using these methods!

:::

## Get the best out of Typescript

### Typings

For easy debugging, import type definition from npm package.

```ts
//pipelight.ts
import { Config } from "https://deno.land/x/pipelight/mod.ts";
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

const makeConfig = ({remote, local}) => {
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
Overuse string interpolation, parameter destructuring and import/export ESM syntax.

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
