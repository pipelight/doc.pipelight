# Which language to choose ?

There is no best file format to write pipelines.
They all shine on different usage.

You may want to use a language that fits your pipeline size.
The size being the amount of actions and the inside complexity of the pipeline.
You could go for Yaml(small), Toml(medium), Javascript(medium) and then Typescript(large).

But as you seek complexity, the strive for **flexibility**, **simplicity** and **reusability** will lead you to **Typescript**.

## Typescript or Javascript ?

Typescript only supercharge Javascript syntax with optional type definition.
If you are not at ease with Typescript, you can still write pipelines in Javascript in a `.ts` file
and use types later to strenghten your pipeline definition.

```ts
//pipelight.ts
// No type usage
const config = {};
```

```ts
//pipelight.ts
// Type usage
import { Config } from "https://deno.land/x/pipelight/mod.ts";
const config: Config = {};
```

Explore the complete type definition on [DenoLand](https://deno.land/x/pipelight/mod.ts).

## Toml or Yaml ?

Yaml use indentation to delimitate blocks of code, consequently,
it can be very difficult to troubleshoot the pipeline as the file gets bigger.

```yaml
pipelines:
  - name: simple_example
    steps:
      - commands:
          - ls
        name: list directory
      - commands:
          - pwd
        name: get working directory
```

Although Yaml is wide spread throughout the automation/cicd ecosystem it isn't well suited
for big pipelines definition.
So you may want to use Yaml for your tiniest pipelines, to replace your tiniest bash scripts.

Toml is much easier to read and therefore is well suited for biggger pipelines.

```toml
[[pipelines]]
name =  "simple_example"

[[pipelines.steps]]
name = "list directory"
commands = ["ls"]

[[pipelines.steps]]
name = "get working directory"
commands = ["pwd"]
```

## Next-gen configuration languages?

New contender entered the room...

[Hcl](https://github.com/hashicorp/hcl),
like its siblings
[Kcl](https://github.com/kcl-lang/kcl)
[Pkl](https://github.com/apple/pkl)
is a configuration language that wants to be more human readable.

It may sounds familiar because it is greatly inspired by nginx configuration syntax.

```hcl
# A pipeline
pipelines =[{
  name = "simple_example"
  steps =[
      {
        name     = "list directory"
        commands = ["ls"]
      },
      {
        name     = "get working directory"
        commands = ["pwd"]
      }
  ]
}]
```

## Why so many options?

Thanks to the reach rust community and ecosystem, it is only worth a few line of code to add support for a language.

I had already bet on Typescript when I built the first prototype for pipelight.
But using it each and every day and trying it for unexpected tasks has led to other needs.

Only time and iteration will tell which file formats fits the best and for which task.
It is only really up to you.
