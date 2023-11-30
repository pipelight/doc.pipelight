# Configuration files

Pipelight needs a configuration file named pipelight.<file_extension> This is
where your pipeline definitions reside.

Pipelight recursively seeks into parent directories until it reaches a
configuration file.

```sh
pipelight.ts;
# or
pipelight.js;
# or
pipelight.toml;
# or
pipelight.yml;
```

To sum up the seeking algorithm, the directory identified as your project root
is the directory containing the `pipelight.ts` file.

## Load other configurations

If you which to use another config file for testing purpose, the cli has a
global `--config` option.

However, whenever you want to load pipelines from multiple files, you should use
**typescript** native `import` and `export` statements.

The `--config` option accepts:

- a file name, looks for a file with the provided name.

```sh
pipelight ls --config test.pipelight.ts;
```

- a file path, loads the file at the given path.

```sh
pipelight ls --config ./tests/test.pipelight.ts;
```

- a seed, looks for a file containing this string and with on of the implemented
  file extensions.

```sh
pipelight ls --config test.pipelight
```

## Configuration global properties


