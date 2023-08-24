# Configuration files

Pipelight needs a configuration file named pipelight.<file_extension>
This is where your pipeline definitions reside.

Pipelight recursively seeks into parent directories until it reaches a configuration file.

```sh
pipelight.ts;
# or
pipelight.js;
# or
pipelight.toml;
# or
pipelight.yml;
```

If you which to use another config file for testing purpose,
the cli has a global `--config` option.

```sh
pipelight ls --config test.pipelight.ts;
```

There is no best file format to write pipelines.

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

Although Yaml is wide spread throughout the automation/cicd ecosystem it isn't well suited
for big pipelines definition.
You may want to use Yaml for your tiniest pipelines, to replace your tiniest bash scripts.

Toml is much easier to read and so is well suited for biggger pipelines.
