import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/guide": [
    {
      text: "Guide",
      children: [
        {
          text: "Getting Started",
          link: "/guide/"
        },
        {
          text: "Why Pipelight ?",
          link: "/guide/why"
        },
        {
          text: "Command line usage",
          link: "/guide/cli"
        },
        {
          text: "Configuration in depth",
          link: "/guide/config"
        },
        {
          text: "Triggers (Automation)",
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
