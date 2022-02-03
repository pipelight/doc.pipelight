# API

## Usage

Simp exposes simple but often used functions.

```ts
// deploy.ts
import { useHooks, useCli, useLogs, useTrigger, useExec } from "simpcicd";
```

## Exec

Execute a bash command

```ts
import { useExec } from "simpcicd";
const { exec } = useExec();

const globbing = "*.mp3";
exec(`ls -al ${globbing}`);
```

## Trigger pipelines

Manually trigger pipelines

```ts
// makeHooks.ts
import { useTrigger } from "simpcicd";
import config from "simp.config.ts";

const { trigger } = useTrigger(config);
trigger("my_prod_pip");
```

Use trigger takes an optional Config Object as argument.
If not provided, it falls back to simp.config.js

## Generate hooks

Manually generate every hooks, or hook for a single pipeline

```ts
// myHooks.ts
import { useHooks } from "simpcicd";
import config from "simp.config.ts";
const { generateHooks, generateHook } = useHooks(config);
// Generate git hooks
makeHooks(config);
//or
makeHook("default");
```

Or create a fully customized hook, by providing the helper a function.

```ts
// myHooks.ts
import { useHooks } from "simpcicd";
import { useExec } from "simpcicd";
import config from "simp.config.ts";

//Make your own customized hooks

const { makeHook } = useHooks();

makeHook(() => {
  console.log("this is my hook");
  const { exec } = useExec();
  exec("touch my_hook");
});
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
