import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/guide": [
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
          text: "Logs",
          link: "/guide/logs"
        },
        {
          text: "Generated files",
          link: "/guide/storage"
        },
        {
          text: "Cookbook",
          link: "/cookbook/strategies"
        }
      ]
    }
  ],
  "/api": [
    {
      text: "API References",
      children: [
        {
          text: "Helpers",
          link: "/api/"
        },
        {
          text: "Cookbook",
          link: "/cookbook/strategies"
        }
      ]
    }
  ],
  "/cookbook": [
    {
      text: "CookBook",
      children: [
        {
          text: "Deployments",
          link: "/cookbook/strategies"
        }
      ]
    }
  ]
};
