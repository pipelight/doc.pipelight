# API

## Usage

Simp exposes helper functions and types.

```ts
// deploy.ts
import { useHooks } from "simpcicd";
```

Here is a complete list of helpers

```ts
// deploy.ts
import {
  useHooks,
  useCli,
  //useLogs,
  useTrigger,
  useExec,
  useConfig
} from "simpcicd";
```

## Helpers

### useExec

Execute a bash command.
(using underlying child_process.execSync())

```ts
import { useExec } from "simpcicd";
const { exec } = useExec();

const globbing = "*.mp3";
exec(`ls -al ${globbing}`);
```

### useConfig

Find a config file and return the config Object

```ts
import { useConfig } from "simpcicd";

const config = useConfig();
```

is the same as

```ts
import config from "simp.config.ts";
```

### useTrigger

Manually trigger pipelines

```ts
// makeHooks.ts
import { useTrigger, useConfig } from "simpcicd";
const { trigger } = useTrigger(useConfig);

trigger("default");
```

Use trigger takes an optional Config Object as argument.
If not provided, it falls back to simp.config.js

### useHooks

Manually generate git-hooks

```ts
// myHooks.ts
import { useHooks, useConfig } from "simpcicd";

const { makeHooks } = useHooks();
const config = useConfig();
makeHooks(config);
```

## Comming Soon

### useHooks

Or create a fully customized hook with the helper function.

```ts
// myHooks.ts
import { useHooks } from "simpcicd";
import { useExec } from "simpcicd";
import config from "simp.config.ts";

//Make your own customized hooks
const { toHook } = useHooks();

toHook(() => {
  console.log("this is my hook");
  const { exec } = useExec();
  exec("touch myfile.txt");
});
```

### useLogs

It wasn't meant to be tweaked but...
If you want to refine logs limit/colors... nevermind I will expose it!!

```ts
import { useLogs } from "simpcicd";
```
