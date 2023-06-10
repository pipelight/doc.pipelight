# Environment variables

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

Load env vars.

```ts
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load({ envPath: `./.env.production` });
```
