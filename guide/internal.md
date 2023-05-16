# How it works ?

### TL;DR

Basically, it **encapsulates your shell commands into another language.**

This encapsulation provides you logging features and automatic triggers.
Moreover it adds easy programming language abilities by bringing Typescript (Toml and Yaml) syntax to your script.

## A simple representation

Pipelight code base is made in Rust, see it as Ferris (rust mascot) making the heavy lift.
On the first hand, it uses Javascript/Typescript to **manipulate bash strings**.
And on the other it uses Git as an **event detector**.

<p align="center">
  <img src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes">
</p>

Your config file return an **Object** converted in a Rust Struct.
This struct is then "run" by Pipelight.

## Environment and Security

Commands can directly use the user environment.
Bash commands are run in a separate spawned process running in the background.
But this process will have acces to the user environment.
It's the same as running a command in the terminal.

Which means you can use every local config.
For example, this command, will have acces to local /etc/hosts and .ssh/config

```ts
//pipelight.ts
const steps = [
  {
    name: "build",
    commands: ["ssh server"]
  }
];
```

You don't need to set every arguments on a single command because you can acces your env.

```sh
ssh user@[ip] --rsa-key [key]
```

Consequences are, if you care about security, you don't need to store keys and credential in a secret vault.
You don't need to learn another way to store secrets.
Store them as usual with dedicated softwares and the only thing you have to do is let acces right concerns to Linux.
Finally, the ultimate way to secure your secrets is to use pipelight as a simple user with dedicated rights on needed files.

## Why so easy to install?

It doesn't need to be integrated into a larger ecosystem because the only dependencies it has are sh, git and deno.
