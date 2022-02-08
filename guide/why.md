# Why Simp ?

## Why another cicd tool ?

As my projects were all so small,I used to test and deploy them with bash/pyhton scripts.

But i needed automation and verbose logs.

I know there is a lot of existing CICD tools but i'm affraid of
either the install process or the documentation.

So I came up with a "Custom Command Line Wrapper"

## What it is

It's a tool to execute routines.
Like deploying your site online, executing tests...

Basically it's just a glue between all your preexisting tools.

## What it does

It takes "bash" commands.
And triggers it when you demand it.

## Who is it for

For devs who don't want to mess with big CICD names for now.
Devs who need simplicity but efficency though.

## Yes but how ?

It uses a config file and executes the commands it contains.

```ts
simp.config.ts;
pipelines: [
  {
    name: "test",
    steps: [
      {
        name: "build",
        commands: ["yarn install", "yarn build"]
        // See ?! Here are your bash commands! :D
      }
    ],
    trigger: {
      branches: ["main"],
      actions: ["push"]
    }
  }
];
```

It runs the pipeline as a cascade like:
pipelines -> steps -> commands

It stops whenever a step/command fails and return a verbose logs with stacktrace.

## Furthermore

If you still cannot figure out how this globally works.
Read further.

Or if I wasn't clear enough, please tell me.
