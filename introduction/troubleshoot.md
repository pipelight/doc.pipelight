# Troubleshoot a pipeline

## Code debugging

Like for every Typescript and Javascript script,

At some point you may want to check the output of some functions.
You can use `console.log()`, `console.error()` statements and so on,
inside your config file.

The output will be silenced if you run a `pipelight <command>`.
But you can run `deno run -A ./pipelight.ts` to see the output.

## Linting and Formatting

### Directly from your IDE

Pipelines can be written in Typescript, Javascript, Yaml or Toml.

You can set up your file editor/IDE to lint and format those languages.

For nvim users, you can activate LSP support.
It is even more easier with Sapcevim or Astrovim.

### Using the cli

If you use a simple text editor that doesn't implement LSP, Completion...

For pipelines written in Typescript and Javascript,
Pipelight uses the **deno built in linter** and got you cover on every `pipelight <whatever_command>`.

For Yaml and Toml, Pipelight internally uses the rust specific crate to achieve the same result.

For example, if `pipelight ls` doesn't yell any error.
Your pipeline are exempt from error and ready to be tested/run.
