# Secrets storage

There is no secret or vault plugin in Pipelight.
You can use whatever you want to store crucial informations.

However here are some guidelines.

## User rights (default)

The first level of security is provided by Linux access rights and user priviledges.
To ensure a first guard, you may want to run pipelines as a specific user with dedicated rights on needed files.

### Running process environment

Commands can directly use the user environment.
Bash commands are run in a separate spawned process running in the background.
But this process still has acces to the user environment.
It's the same as running a command in your terminal.

Which means you can use every local config env and files.

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

## Vaults

Concerning your secrets,
You can store them as usual with your favorites dedicated softwares or in simple env files.
