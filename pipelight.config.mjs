import { defaultConfig } from "./.pipelight/config/default.config.mjs";
import { nextConfig } from "./.pipelight/config/next.config.mjs";

const config = {
  pipelines: [...defaultConfig.pipelines, ...nextConfig.pipelines]
};

export default config;
