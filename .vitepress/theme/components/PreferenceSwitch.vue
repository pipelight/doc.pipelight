<template lang="pug">
.preference-container
  h2.text.font-bold.cursor-pointer(
    @click="router.go(link)"
  ) API Preference
  .switch-container
    label(
      :class="[ api.compositions ? 'secondary' : 'primary']"
      @click="toggleCompositionAPI(false)"
    ) Objects
    VPSwitch.VPSwitchAppearance(
      title:="toggle compositions"
      aria-label="prefer composition api"
      :aria-checked="api.compositions"
      @click="toggleCompositionAPI()"
    )
      div
      div
    label(
      :class="[ api.compositions ? 'primary' : 'secondary']"
      @click="toggleCompositionAPI(true)"
    ) Helpers
</template>
<script setup lang="ts">
import { useRouter } from "vitepress";
import { ref, computed, inject } from "vue";
import { api } from "@utils/preferences.ts";
import { useDark } from "@vueuse/core";
//vitepress Components
const VPSwitch = inject("VPSwitch");

const toggleCompositionAPI = (bool?: boolean) => {
  if (bool === undefined) {
    api.value.compositions = !api.value.compositions;
  } else {
    api.value.compositions = bool;
  }
};

const router = useRouter();
const link = "/guide/pipeline_definition";
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

.VPSwitchAppearance[aria-checked="true"] :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
  background-color: var(--vp-c-brand-1);
}
</style>
