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
          text: "Basic pipeline definition",
          link: "/guide/config"
        },
        {
          text: "Raw and pretty logs",
          link: "/guide/logs"
        },
        {
          text: "Why another CICD tool ?",
          link: "/guide/the_story"
        }
        {
          text: "How it works ?",
          link: "/guide/internal"
        },
      ]
    },
    {
      text: "Helpers",
      items: [
        {
          text: "Overview",
          link: "/helpers/overview"
        },
        {
          text: "Common helpers",
          link: "/helpers/common"
        },
        {
          text: "Docker helpers",
          link: "/helpers/docker"
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
          text: "Deployment Strategies",
          link: "/cookbook/strategies"
        }
      ]
    },
    {
      text: "For developers",
      items: [
        {
          text: "Changelog",
          link: "/roadmap/changelog"
        }
      ]
    }
  ]
};
