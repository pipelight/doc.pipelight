<template lang="pug">
.preference-container
  h2.text.font-bold API Preference
  .switch-container
    label(
      :class="[ api.compositions ? 'secondary' : 'primary']"
      @click="toggleCompositionAPI(false)"
    ) Objects
    input.daisy-toggle.daisy-toggle-success(
      type="checkbox"
      aria-label="prefer composition api"
      :aria-checked="api.compositions"
      @click="toggleCompositionAPI()"
    )
    label(
      :class="[ api.compositions ? 'primary' : 'secondary']"
      @click="toggleCompositionAPI(true)"
    ) Helpers
    a.switch-link(
      title="About API preference"
      href="/guide/"
      @click="closeSideBar"
    ) ?
</template>
<script setup lang="ts">
import { useRoute } from "vitepress";
import { ref, computed, inject } from "vue";
import { api } from "@utils/preferences.ts";

const closeSideBar = inject("close-sidebar") as () => void;

const toggleCompositionAPI = (bool?: boolean) => {
  if (bool === undefined) {
    api.value.compositions = !api.value.compositions;
  } else {
    console.debug(api.value.compositions);
    api.value.compositions = bool;
  }
};
</script>
<style lang="postcss" scoped>
.preference-container {
  @apply border;
  @apply bg-white border-gray-300;
  @apply dark:bg-gray-900 dark:border-gray-600;
  @apply transition-all;
  @apply text-xs rounded-lg p-3;
  @apply lg:sticky z-10 top-0 mb-4;
}
.switch-container {
  @apply flex flex-row items-center justify-around;
  @apply py-4;
}
input {
  &.daisy-toggle {
    @apply border-solid;
  }
}
</style>
