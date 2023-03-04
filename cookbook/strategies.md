# Tips

## Make it soft on the eye

For the sake of reusability and when you need to deploy in multiple evironnements.

Overuse string interpolation!

```ts
//pipelight.config.ts
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

Overuse string interpolation, and parameter destructuring.

```ts
//pipelight.config.ts
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

## Split your config

Split your config into multiple files and separate concerns.
Overuse string interpolation, parameter destructuring and import/export ESM synthax.

Export here

```ts
//.pipelight/config/default.ts

const makeDefaultConfig = ({remote, local}) = > {
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

```ts
//pipelight.config.ts

import { makeDefaultConfig } from ".pipelight/config/default.mjs";

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

# Deployment Stategies

## Dummy deploy through with (scp/rsync)

Here is a dummy deploy with rsync

```js
//simp.config.mjs
export default {
  pipelines: [
    {
      name: "default",
      steps: [
        {
          name: "build",
          commands: ["yarn", "yarn build"]
        },
        {
          name: "deploy",
          commands: [
            `ssh linode -t \"rm -rf\ ${remoteFoler}/*"`,
            `rsync -ar ${localFiles} linode:${remoteFoler}`
          ]
        }
      ],
      trigger: {
        branches: ["master", "main"],
        actions: ["pre-push"]
      }
    }
  ]
};
```

## Blue-Green Canary

Here is a blue-green canary deployment with docker and nginx

# Buiding/Testing Strategies

## Dummy test in local folder

Here is a dummy test

## Build and Test in dedicated containers

Here is a config if you wan't to build and test your source code in a specific container
instead of doing it in your local folder.
