import { sidebar } from "./sidebar";
import { nav } from "./nav";
import type { DefaultTheme } from "@/config";

const themeConfig: DefaultTheme.Config = {
  logo: "/images/pipelight.png",
  repo: "pipelight/pipelight",
  docsBranch: "master",
  nav,
  sidebar
  // editLinks: true,
  // editLinkText: "Suggest changes to this page"
};

export default themeConfig;
