# Why Simp ?

## Why another cicd tool ?

As my projects or all so small.
I used to test and deploy them with bash/pyhton scripts.

But as it grew, I needed a cool way to automate this job.

With things like auto-deploy on every push to master (why not ?).
Maybe background exexcution.
Verbose and colorful Logs (with size limit!).
No mandatory gui but a simple cli.
Compatibility with all my existing tools.

And at least but not last a tiny package size.

I've heard about Jenkins, Drone CI, and others but i'm affraid of
either the install process and the documentation.

So I came up with this.

## What it is

It's a tool to deploy sites online...
at least I wish it was.
But it's just a bash command wrapper written in Typescript.

## What it does

It takes "bash" commands.
And triggers it when you demand it.

You basically execute "routines"

## Who is it for

For devs who don't want to mess with big CICD names for now.
Devs who need simplicity but efficency though.

## Yes but how ?

It uses a config file and executes the commands it contains.

```json
pipeline : {
  name: "test",
  steps: [
    {
      name: "build",
      commands: ["yarn install", "yarn build"],
      // See ?! Here are your bash commands! :D
    },
  ],
  trigger: {
    branch: [
      "main",
    ],
    event: [
      "push",
    ]
  }
}
```

pipelines -> steps -> commands

It stops whenever a step/command fails and return a verbose log.
So that you know wich command, in which step, in which pipeline failed, at a glance.

No obscure debbuging message. Just stacktrace.

## Furthermore

If you still cannot figure out how this globally works.
Read further.
Or if I wasn't clear enough, please tell me.
