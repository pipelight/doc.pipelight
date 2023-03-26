import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/": [
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
          text: "The story",
          link: "/guide/the_story"
        }
      ]
    },
    {
      text: "Cookbook",
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
