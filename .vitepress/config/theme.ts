import { sidebar } from "./sidebar";
import { nav } from "./nav";
import type { DefaultTheme } from "@/config";

const themeConfig: DefaultTheme.Config = {
  logo: "/images/pipelight.png",
  docsBranch: "master",
  nav,
  sidebar,
  appearance: false
};

export default themeConfig;
