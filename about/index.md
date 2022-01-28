<p align="center">
  <a href="https://gitea.com/AreskaEntreprise/SimpCICD" target="_blank" rel="noopener noreferrer">
    <img width="400" src="/images/simp_light.png" alt="SimpCICD logo">
  </a>
</p>
<br/>

# Simp CICD

## What it is

It's a tool to deploy your sites online... at least I wish it was.
But it's just a bash wrapper written in Typescript.

## What it does

It takes "bash" commands and triggers it when you demand it.

## Why this tool ?

Have you ever dive into DevOps? CICD tools are such a pain.
I was tired of the heavy config needed for DroneCI, CIRCLECI and others to work well.

As my projects or all so small and written in Javascript

I wanted more than a bash/python script to deploy,..
and less than the monolithic freemium crap out there.

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
    },
  ],
  trigger: {
    branch: [
      "main",
    ]
  }
}
```

It stops when a step/command fails an report a verbose error.

## Getting Started

Install it with yarn

```bash
yarn add -D simpcicd
```

or with npm

```bash
npm install -save-dev simpcicd
```

## Usage

It comes in 2 flavors as:

- CLI
- usual module

### Cli

```sh
simp
```

or

```bash
simp trigger
```

will trigger a pipeline execution

```bash
simp hooks
```

will transform your pipelines in git hooks...
It means that pipelines will be triggered for every action you put in pipeline.trigger

## Config

Here is a simple example of what could contain simp.config.json

```json
pipeline : {
  name: "test",
  steps: [
    {
      name: "build",
      commands: ["yarn install", "yarn build"]
    },
  ],
  trigger: {
    branch: [
      "master",
      "dev"
    ]
  }
}
```

But it becomes interesting when you use Typescript.

## Module

Their we are. You're gonna enjoy this part.
