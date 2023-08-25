# Environment variables

For further documentation checkout the [Deno documentation](https://deno.land/manual/basics/env_variables).

## Create env files

You may want to use env files for credential storage.
Or to apply different settings to the same pipeline depending on the environment.

As for node.js and deno projects define .env, .env.devlopment, .env.production in your root directory.
(see: dotenv or deno load)

```sh
# .env.production
PORT=8081
USER_NAME=default
USER_PASSWORD=secret
```

## Loading strategies

### Static

You can statically load env vars from `.env.production` into a pipeline with

```ts
// .pipelight/env/production
import { load } from "https://deno.land/std/dotenv/mod.ts";
const env = await load({ envPath: `./.env.production` });
...
const password = env.USER_PASSWORD
```

### Dynamic

You can dynamicly load env vars from `.env.<something>` into a pipeline with

```ts
// .pipelight/env/template
// Process flag
import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args, {
  string: ["env"]
});

// Import env file with dynamic path
import { load } from "https://deno.land/std/dotenv/mod.ts";
const env = await load({ envPath: flag.env ? `./.env.${flag.env}` : "./.env" });

const password = env.USER_PASSWORD;
```

And add the necessary flags to the cli

```sh
pipelight run -- --env=production
```
