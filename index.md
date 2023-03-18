---
layout: home
hero:
  name: Pipelight
  image:
    src: /images/pipelight.png
    alt: pipelight_logo
  text: A tiny automation tool
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
.xl {
  font-size: 50px;
}
.lg {
  font-size: 25px;
  @apply px-6 py-1;
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

<p class="xl">{{ tailwind.lg ? '⇢' : '⇣' }}</p>

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

<p class="xl">{{ tailwind.lg ? '⇢' : '⇣' }}</p>

<Example>
<h3>
...gets Automation and Logging!
</h3>

<img class="sexy" src="/images/example_log_level_4.png" alt="example pretty verbose logs">

</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
Write in your favorite
file format
</h4>
<p> 
...but Typescript is more fun 😈
</p>
</Example>

<Example>

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

</Example>

<Example>

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
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
Never leave your terminal
</h4>
<p>
the comfort of everything in one cli 😌
</p>
</Example>
<Example>

```sh
pipelight run simple_example
```

```sh
pipelight logs -vvv
```

</Example>
</Sheet>

<Sheet>
<Example>
<h4> 
Rust based.
</h4>
<h4> 
Made with passion
</h4>
<h4> 
for conscientious programmers.
</h4>
</Example>
</Sheet>
