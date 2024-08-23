import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: "inline"
  },
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
