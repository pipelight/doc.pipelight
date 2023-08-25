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
