# How it works ?

## TL;DR

Basically, it **encapsulates your shell commands into another language.**

This encapsulation provides you logging features and automatic triggers.
Moreover it adds easy programming language abilities by bringing Javascript/Typescript (Toml and Yaml) syntax to your script.

## Delegate to the right tools

Pipelight code base is made in Rust, see it as Ferris (rust mascot) making the heavy lift.
On the first hand, it uses Javascript/Typescript to **manipulate bash strings**.
And on the other it uses Git as an **event detector**.

<p align="center">
  <img src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes">
</p>

Your config file return an **Object** containing bash strings.
Those will be "run" by Pipelight.

## Environment and Security

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

You just have to store them as usual with dedicated softwares and the only thing you have to do is to delegate access right concerns to Linux.
Finally, the ultimate way to secure your secrets is to use pipelight as a simple user with dedicated rights on needed files.
