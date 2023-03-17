---
layout: home
hero:
  name: Pipelight
  image:
    src: /images/pipelight.png
    alt: pipelight_logo
  text: A tiny automation cli
  tagline: The quickest and least painful way to automate... after the shell script.
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
.space {
  @apply py-10;
}
</style>

<Sheet>

<Example>
<h3> 
Your usual shell script...
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
...rewrited into a Pipeline...
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

</Example>

<p class="big">{{ tailwind.lg ? '⇢' : '⇣' }}</p>

<Example>
<h3>
...gets Automation and Logging!
</h3>

<img class="sexy" src="/images/example_log_level_4.png" alt="example pretty verbose logs">

</Example>
</Sheet>

<Sheet>
<Example>
<h4> 
Supports the best and the worst
</h4>
<h4> 
of config file formats
</h4>

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
<h4> 
Never leave the term
</h4>

```sh
pipelight run simple_example
```

```sh
pipelight logs -vvv
```

<p class="big">{{ '⇣' }}</p>
<img class="sexy" src="/images/example_log_level_4.png" alt="example pretty verbose logs">
</Example>
</Sheet>
