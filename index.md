---
title: Home
layout: home
hero:
  name: Pipelight
  image:
    src: /images/pipelight.png
    alt: pipelight_logo
  text: Automation pipelines but easier.
  tagline: Elevate your bash scripts to generic, debuggable and auto-triggered pipelines.
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/install
    - theme: alt
      text: Why pipelight?
      link: /introduction/description
---

<script setup lang="ts">
import Features from "@components/Features.vue";
import Example from "@components/Example.vue";
import Sheet from "@components/Sheet.vue";
import DemoLogs from "@demos/DemoLogs.vue";
import DemoLogsVVV from "@demos/DemoLogsVVV.vue";

import { tailwind } from "@utils/breakpoints.ts";

</script>

<div class="landing">

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
        <div class="flex justify-center">
        <img src="/tapes/gifs/logs.gif" class="terminal md">
        </div>
    </Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl gradient">
<span>
Troubleshoot the pipe in a breeze.
</span>
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="lg"> 
Get aggressively verbose
</h4>
<p>
Gather every process outputs.
</p>
</Example>
</Sheet>

<Sheet>
<Example>
    <div class="flex justify-center">
    <img src="/tapes/images/logs_vvvv.png" class="terminal md">
    </div>
</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl gradient"> 
<span>
Use well-known configuration languages..
</span>
</h4>
</Example>
</Sheet>

<Sheet>
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
<h4 class="xl gradient">
<span>
..or code in your config file
</span>
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
..wrapped into Typescript..
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
      name: "get directory",
      commands: ["pwd"]
    }
  ]
}
```

</Example>

<p class="xl">{{ tailwind.lg ? '⇢' : '⇣' }}</p>

<Example>
<h3> 
..boosted with syntactic sugar
</h3>

```ts{2,3}
pipeline("simple_example", () => [
  step("list files",() => ["ls"]),
  step("get directory", () => ["pwd"])
]);
```

</Example>
</Sheet>

<Sheet>
<Example>
<h4 class="xl gradient">
<span>
Trigger pipelines automatically.
</span>
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
<span>
tl;dr
</span>
</h4>
</Example>
</Sheet>

<Sheet>
<Example>
<Features />
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
<h4> 
♥️
</h4>
</Example>
</Sheet>

</div>
