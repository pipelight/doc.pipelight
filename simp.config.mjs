import { defaultConfig } from "./.simp/config/simp.default.config.mjs";
import { nextConfig } from "./.simp/config/simp.next.config.mjs";

const config = {
  pipelines: [...defaultConfig.pipelines, ...nextConfig.pipelines]
};

export default config;
