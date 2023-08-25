# Pipeline doping ⚡

## Get the best out of Typescript

### Use parameter destructuring

For more concise lines, that increases readability, you may use parameter destructuring

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

### Split your config into many files

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

You may want to store files under `.pipelight/config`
and import them in your main `pipelight.config.ts`
