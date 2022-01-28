# Why SimpCICD

Have you ever dive into DevOps? CICD tools are such a pain.
I was tired of the heavy config needed for CICD's other tools to work well.

As my projects or all so small and written in Javascript

I wanted more than a bash/python script to deploy,..
and less than the monolithic freemium crap out there.

## What it is

It's a tool to deploy your sites online... at least I wish it was.
But it's just a bash wrapper written in Typescript.

## What it does

It takes "bash" commands.
And triggers it when you demand it.

## Who is it for

For devs that value their times and want their projects deployed fast.

## Yes but how ?

It uses a config file with pipelines -> steps -> commands

```bash
pipeline : {
  name: "test",
  steps: [
    {
      name: "build",
      commands: ["yarn install", "yarn build"]
      // See ?! Here are tour bash commands! :D
    },
  ],
  trigger: {
    branch: [
      "main",
    ]
  }
}
```

It stops when a step/command fails an report a VERBOSE ERROR!

Fuck yeah! It's all verbose so you can troubleshoot it easily wherever the error comes from.
