# Supercharge the CLI

## Overview

Pipelight cli accepts a few options and arguments, see `pipelight --help`.
But you can add more like `--host`,`--docker`, `--env`...

Those flags are processed by the pipelight.ts file iteself.
Use the double hyphen `--` to pass them to the inner script and bypass the pipelight cli.

```sh
pipelight run deploy -- --host=linode
```

Process the arguments from inside your config file.

```ts
// pipelight.ts
// Comand line parser
import { parse } from "https://deno.land/std/flags/mod.ts";

const flags = parse(Deno.args, {
  string: ["host"],
  default: { host: "linode" }
});
```

And use it in your pipeline definition

```ts
import { deploy } from "./.pipelight/config/deploy.ts";

const docker = new Docker(params);

const my_pipeline = deploy(docker, flags.host);
```
