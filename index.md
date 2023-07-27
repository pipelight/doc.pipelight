---
title: Home
layout: home
hero:
  name: Pipelight
  image:
    src: /images/pipelight.png
    alt: pipelight_logo
  text: Automation pipelines but easier...
  tagline: A tiny tool to run pipelines written with languages you already know.
  actions:
    - theme: brand
      text: Get Started
      link: /getting_started/install

    - theme: alt
      text: Why pipelight?
      link: /guide/why
---

<script setup>
import Example from '.vitepress/theme/components/Example.vue';
import Sheet from '.vitepress/theme/components/Sheet.vue';
import pretty_logs_demo from '@components/term/pretty_logs_demo.vue';
import pretty_logs_demo2 from '@components/term/pretty_logs_demo2.vue';

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
.2xl {
  font-size: 50px;
}
.xl {
  font-size: 40px;
}
.lg {
  font-size: 25px;
  @apply px-6 py-1;
  @apply text-center;
}
.space {
  @apply py-10;
}
</style>

<Sheet>
<Example>
<h4 class="lg"> 
Command-line Interface
</h4>
<p>
Stay in the comfort of your terminal
</p>
</Example>
<Example>
<pretty_logs_demo/>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl">
Write readable and reusable blocks!
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h3> 
Your shell commands..
</h3>

```sh{3,5}
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
..wrapped into Typescript
</h3>

```ts{6,10}
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
</Sheet>

<Sheet>
<Example>
<h4 class="xl">
Debug in a breeze!
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
Get aggressively verbose
</h4>
<p>
...and more!
</p>
</Example>
<Example>
<pretty_logs_demo2/>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl">
Trigger pipelines automatically!
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
Write in Old-school flavors
</h4>
<p> 
for the simplest tasks
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
<p align="center">
  <img src="/images/ferris_playing_pipelight.png" alt="ferris_playing_with_cubes" class="sm">
</p>
</Example>
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
