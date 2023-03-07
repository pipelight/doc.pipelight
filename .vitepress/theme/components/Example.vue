<template lang="pug">
.custom-code 
  slot
</template>

<script setup></script>

<style lang="postcss">
.custom-code {
  @apply flex flex-col align-middle;
  .language-ts,
  .language-sh {
    @apply rounded-lg !important;
  }
}
</style>
