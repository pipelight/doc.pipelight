---
home: true
sidebar: false
heroImage: /images/pipelight.png
actionText: Get Started
actionLink: /guide/

altActionText: Why pipelight?
altActionLink: /guide/why
---

<script setup>
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
.hid{
display: none
}
</style>

<Sheet>

<Example>
### Usual Bash script

```sh
#example.sh
## List files
ls;
## Get working directory
pwd;

```

</Example>

<div :class="{ 'hid' : !tailwind.lg }">
  <p class="big">⇢</p>
</div>
<div :class="{ 'hid' : tailwind.lg }">
  <p class="big">⇣</p>
</div>

<Example>
### Rewrite it into a Pipeline..

```ts
{
  name: "example",
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

<Example>
### ..enable Automation and Logging

<img class="sexy" src="/images/example_log_level_4.png" alt="example pretty verbose logs">

</Example>
</Sheet>
