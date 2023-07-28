import { metaData } from "./constants";
import head from "./head";
import themeConfig from "./theme";
import type { DefaultTheme } from "@/config";
import type { UserConfig } from "vitepress";

const config: UserConfig<DefaultTheme.Config> = {
  title: metaData.title,
  description: metaData.description,
  lang: "en-US",
  head,
  themeConfig,
  lastUpdated: true
};

export default config;
