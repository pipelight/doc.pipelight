import { defaultConfig } from "./.simp/config/simp.default.config";
import { nextConfig } from "./.simp/config/simp.next.config";

const config = {
  pipelines: [...defaultConfig.pipelines, ...nextConfig.pipelines]
};

export default config;
