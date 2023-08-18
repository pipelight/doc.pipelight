import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/.vitepress/theme/components",
      "@utils": "/.vitepress/theme/utils",
      "@demos": "/.vitepress/theme/components/demos",
      "@logs": "/.vitepress/theme/logs"
    }
  }
});
