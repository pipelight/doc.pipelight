---
layout: home
hero:
  name: Pipelight
  image:
    src: /images/pipelight.png
    alt: pipelight_logo
  text: A tiny automation cli
  tagline: Bash scripts with Typescript superpowers
  actions:
    - theme: brand
      text: Get Started
      link: /guide/

    - theme: alt
      text: Why pipelight?
      link: /guide/why
---

<script setup>
import ".vitepress/theme/custom.css"
import Example from '.vitepress/theme/components/Example.vue';
import Sheet from '.vitepress/theme/components/Sheet.vue';
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { ref } from "vue";
const breakpoints = useBreakpoints(breakpointsTailwind);
const tailwind = ref({
  xs: breakpoints.smaller("sm"),
  sm: breakpoints.greaterOrEqual("sm"),
  md: breakpoints.greaterOrEqual("md"),
  lg: breakpoints.greaterOrEqual("lg")
});
</script>
<style lang="postcss" scoped>
.big {
  font-size: 50px;
}
</style>

<Sheet>

<Example>
<h3> 
Usual Bash script
</h3>

```sh
#simple_example.sh
## List files
ls;
## Get working directory
pwd;

```

</Example>

<p class="big">{{ tailwind.lg ? '⇢' : '⇣' }}</p>

<Example>
<h3> 
Rewrite it into a Pipeline..
</h3>

<h3> 
in Typescrit
</h3>

```ts
{
  name: "simple_example",
  steps: [
    {
      name: "list files",
      commands: ["ls"]
    },
    {
      name: "get working directory",
      commands: ["pwd"]
    }
  ]
}
```

<h3> 
TOML
</h3>

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

<h3> 
YAML
</h3>

```yml
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

</Example>

<Example>
<h3>
..enable Automation and Logging
</h3>

<img class="sexy" src="/images/example_log_level_4.png" alt="example pretty verbose logs">

</Example>
</Sheet>
