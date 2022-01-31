import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/": [
    {
      text: "Guide",
      children: [
        {
          text: "Why Simp ?",
          link: "/guide/why"
        },
        {
          text: "Getting Started",
          link: "/guide/"
        },
        {
          text: "Master the Cli",
          link: "/guide/cli"
        },
        {
          text: "Master the Pipe",
          link: "/guide/config"
        },
        {
          text: "Git Hooks (Automation)",
          link: "/guide/hooks"
        },
        {
          text: "API (Typescript lovers)",
          link: "/guide/api"
        },
        {
          text: "Log files",
          link: "/guide/logs"
        }
      ]
    }
  ]
};
