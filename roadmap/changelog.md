# Next

- [ ]: Add branch globbing pattern
- [ ]: Add git tags to triggers ({branch, action} | {tag, action})

# Breaking changes

## v0.5.0

Compatibility changes for v0.4.29 -> v0.5.0

- [ ] Remove step key "non_blocking".
- [x] Replace by "mode": "jump_next"

A simple boolean was not sufficient anymore. Multiple execution modes needed to be added.
See step execution modes section in Guide.

- [ ] Remove "npm:pipelight" package usage
- [x] Replace by "https://deno.land/x/pipelight/mod.ts"
