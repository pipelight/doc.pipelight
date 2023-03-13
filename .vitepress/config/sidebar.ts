import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/guide": [
    {
      text: "Guide",
      items: [
        {
          text: "Getting Started",
          link: "/guide/"
        },
        {
          text: "Why Pipelight ?",
          link: "/guide/why"
        },
        {
          text: "The story",
          link: "/guide/the_story"
        },
        {
          text: "Command line usage",
          link: "/guide/cli"
        },
        {
          text: "Logs",
          link: "/guide/logs"
        },
        {
          text: "States",
          link: "/guide/states"
        },
        {
          text: "Configuration in depth",
          link: "/guide/config"
        },
        {
          text: "Triggers (Automation)",
          link: "/guide/triggers"
        }
      ]
    }
  ],
  "/cookbook": [
    {
      text: "CookBook",
      items: [
        {
          text: "Tips",
          link: "/cookbook/tips"
        }
      ]
    }
  ]
};
