# Secrets

There is no secret or vault plugin in Pipelight.
You can use whatever you want to store crucial informations.

However here are some guidelines.

## Security

### User rights (default)

The first level of security is provided by Linux access rights and user priviledges.
To ensure a first guard, you may want to run pipelines as a specific user with dedicated rights on needed files.

### Vaults

Concerning your secrets,
You can store them as usual with your favorites dedicated softwares or in simple env files.

## Running process environment

Commands can directly use the user environment.
Bash commands are run in a separate spawned process running in the background.
But this process will have acces to the user environment.
It's the same as running a command in the terminal.

Which means you can use every local config env and files.

For example, for ssh, no need to set every arguments on a single command.

```sh
ssh [user]@[ip] -i [./ssh_secrets/id_rsa] -F [./my_config_file]
```

This command, will have acces to local /etc/hosts and .ssh/config

```ts
//pipelight.ts
const steps = [
  {
    name: "build",
    commands: ["ssh server"]
  }
];
```

Consequences are, if you care about security, you don't need to
learn another tool specific storage for keys and credential (secret vault).
