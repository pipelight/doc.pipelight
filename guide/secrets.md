# Secrets storage

Pipelight doe not come with a secret/vault plugin.
You can use whatever you want to store crucial informations.

However here is a first aid kit for secret storage.

## User rights (default)

The **first level of security** is provided by Linux access rights and user priviledges.
To ensure a first guard, you may want to **run pipelines as a specific user with dedicated rights** on needed files.

### Running process environment

Commands can directly use the user environment.

Bash commands are run in a separate spawned process running in the background,
but this process still has acces to the user environment.
It benefits the same environment as when you run a command in your terminal,
allowing you to use every of your local configurations files and environment variables.

For example, for ssh, no need to set every arguments on a single command.

```sh
ssh [user]@[ip] -i [./ssh_secrets/id_rsa] -F [./my_config_file]
```

The subprocess has access to the user local configuratons and aliases (/etc/hosts, .ssh/config),
the command can therefor be shortened.

```sh
ssh [server_name]
```

Resulting in a more readable pipeline.

```ts
//pipelight.ts
const steps = [
  {
    name: "build",
    commands: ["ssh server"]
  }
];
```

## Dotenv files

It is pretty common to store secrets in `.env` files (dotenv).

```sh
# .env
PORT=8081
USER_NAME=default
USER_PASSWORD=secret
```

Load the `.env` file and use your variables as you wish.

```ts
// pipelight.ts
import { load } from "https://deno.land/std/dotenv/mod.ts";
const env = await load();
const password = env.USER_PASSWORD;
```

You can create multiple dotenv for different environments
like nightly, test and production and load them on the matching cases.
See the cookbook [environment variables](/cookbook/environments) section,
and go further with the [Deno documentation](https://deno.land/manual/basics/env_variables).

## Third party vaults

You can still store your secrets in your favorite third party dedicated softwares
and make an API call to the vault from your `pipelight.ts` file.
