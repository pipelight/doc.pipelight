# API

## Usage

```ts
// deploy.ts
import { useHooks, useCli, useLogs, useTrigger } from "simpcicd";
```

## Integrate with your favorite tools

Create a config file in .ts
And enjoy creating greate pipelines

```ts
// simp.config.ts
import type { Config } from "simpcicd";

const dockerOptions = " -t myapp .";

const config: Config = {
  pipelines: [
    {
      name: "test",
      steps: [
        {
          name: "build",
          commands: ["yarn install", "yarn build"]
        },
        {
          name: "docker",
          commands: [`docker ${dockerOptions}`]
        }
      ],
      trigger: {
        branch: ["master", "dev"]
      }
    }
  ]
};

export default config;
```

## Trigger pipelines

```ts
// makeHooks.ts
import { useTrigger } from "simpcicd";
import config from "simp.config.ts";

const trigger = useTrigger(config);
trigger("my_prod_pip");
```

## Generate hooks

With this import git hooks will be regenerated on every build.

```ts
// makeHooks.ts
import { useHooks } from "simpcicd";
import config from "simp.config.ts";

// Generate git hooks
const hooks = useHooks(config);
```

## Stil want to use the CLI ?

```ts
// deploy.ts
import { useCli } from "simpcicd";
import config from "simp.config.ts";

useCli(config);
```

Then add the script in your package.json

```json
script:{
  "simp" : "ts-node deploy.ts"
}
```

And call the cli through yarn or npm

```bash
yarn simp trigger --pipeline test
```

```bash
npm run simp trigger --pipeline test
```
