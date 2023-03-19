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
          text: "Command line usage",
          link: "/guide/cli"
        },
        {
          text: "Configuration in depth",
          link: "/guide/config"
        },
        {
          text: "Logs and States",
          link: "/guide/logs"
        },
        {
          text: "Cookbook",
          link: "/cookbook/tips"
        },
        {
          text: "The story",
          link: "/guide/the_story"
        }
      ]
    }
  ],
  "/cookbook": [
    {
      text: "CookBook",
      items: [
        {
          text: "Usefull Tips",
          link: "/cookbook/tips"
        },
        {
          text: "Deployement Strategies",
          link: "/cookbook/strategies"
        }
      ]
    }
  ]
};
