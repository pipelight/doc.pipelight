import { defineConfig } from "simpcicd";
import { defaultConfig } from ".simp/config/simp.default.config";
import { nextConfig } from ".simp/config/simp.next.config";

const config = defineConfig({
  pipelines: [...defaultConfig, ...nextConfig]
});

export default config;
