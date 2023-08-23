import { sidebar } from "./sidebar";
import { nav } from "./nav";
import type { DefaultTheme } from "@/config";

const themeConfig: DefaultTheme.Config = {
  logo: "/images/pipelight.png",
  docsBranch: "master",
  nav,
  sidebar,
  // appearance: true,
  search: {
    provider: "local"
  }
};

export default themeConfig;
