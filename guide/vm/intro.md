# Virtual machines creation

## Guilty pleasure

I have been coming to appreciate TOML only lately.

And more for its capacity to produce readable overstuffed objects than to
provide refreshing config files.

When working on a project that involves TOML, I kind of begin to do everything
with it. Cerebral rigidity ? Great colorsheme ? Drive by config files and
pipelines ?

Using virshl to deploy my vm in toml has led to the natural conversion of
experimental bash scripts to pipeline in toml (with pipelight)

I am trully biased by this asserting this statement. But still i had quite a fun
we

An unexpected pipelight usage

## Create fine grained virtual machines in spades.

Need a file to define pipeline and other for virtual machine definition:

- a vm definition (toml, replacing official xml).
- a pipelight definition (toml, pipelight supported config format).

Create pipeline with iso creation

### VM definition (Virshle)


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

