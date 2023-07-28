---
title: Home
layout: home
hero:
  name: Pipelight
  image:
    src: /images/pipelight.png
    alt: pipelight_logo
  text: Automation pipelines but easier.
  tagline: A tiny tool to run pipelines written with languages you already know.
  actions:
    - theme: brand
      text: Get Started
      link: /getting_started/install

    - theme: alt
      text: Why pipelight?
      link: /other_topics/why
---

<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
import  DemoLogs from '@demos/DemoLogs.vue';
import  DemoLogsVVV from '@demos/DemoLogsVVV.vue';

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
<DemoLogs/>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl gradient">
Write readable and reusable blocks.
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
..wrapped into Json (Typescript)
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
<h4 class="xl gradient">
Use predefined blocks.
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg">
Define complex operations with less code.
</h4>
with the Typescript helper functions
</Example>

<Example>

```ts
step("build images and run containers", () => [
    ...docker.images.create(),
    ...docker.containers.create()
]),
```

</Example>
</Sheet>
<Sheet>
<Example>
<h4 class="xl gradient">
Troubleshoot the pipe in a breeze.
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
<DemoLogsVVV/>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl gradient">
Trigger pipelines automatically!
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
On file change
</h4>

```ts
// When saving/deleting/modifying a file
// on branch dev and feature/<something>
{
    actions: ["watch"],
    branches: ["dev", "feature/*"]
}
```

```sh
# Using vim (saves changes)
:w

```

</Example>

<Example>
<h4 class="lg"> 
On git hooks
</h4>

```ts
// When on tag v<something> and pushing to remote
{
    actions: ["pre-push"],
    tags: ["v*"]
}
```

```sh
git tag -a v0.1
#or
git checkout v0.1
git push
```

</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl gradient">
Write small pipelines for atomic tasks.
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
Use minimal configuration formats
</h4>
<p> 
Old-school flavors
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
      - name: list directory
        commands:
          - ls
      - name: get working directory
        commands:
          - pwd
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
