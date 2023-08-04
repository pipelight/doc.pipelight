<script setup>
import Example from '@components/Example.vue';
import Sheet from '@components/Sheet.vue';
import Features from '../.vitepress/theme/components/Features.vue';
</script>

# What is pipelight ?

**It's a tiny command line tool that executes a list of tasks you provided in a configuration file.**

Those tasks are commands ordered in steps.

## What is it made of ?

It is mainly made in Rust.
Made on top of Deno, and Rust most known crates (std, serde, rustix, watchexec, miette...)

<Features />
