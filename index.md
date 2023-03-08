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
</script>

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

--->

<Example>
### Rewrite it into Pipeline..

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
