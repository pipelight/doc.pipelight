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
          text: "Why using Pipelight ?",
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
          text: "Raw and Pretty logs",
          link: "/guide/logs"
        },
        {
          text: "How it works ?",
          link: "/guide/internal"
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
          text: "Helpers",
          link: "/cookbook/helpers"
        },
        {
          text: "Deployement Strategies",
          link: "/cookbook/strategies"
        }
      ]
    },
    {
      text: "Next",
      items: [
        {
          text: "Roadmap",
          link: "/roadmap/index"
        },
        {
          text: "Breaking Changes",
          link: "/roadmap/breaking"
        },
        {
          text: "Changelog",
          link: "/roadmap/changelog"
        }
      ]
    }
  ]
};
