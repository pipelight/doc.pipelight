import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/": [
    {
      text: "Getting Started",
      items: [
        {
          text: "Install",
          link: "/getting_started/install"
        },
        {
          text: "Write a Pipeline",
          link: "/getting_started/write_pipeline"
        },
        {
          text: "Command line usage",
          link: "/getting_started/cli_usage"
        }
      ]
    },
    {
      text: "Guide",
      items: [
        {
          text: "Why using Pipelight ?",
          link: "/guide/why"
        },
        {
          text: "Command line usage",
          link: "/guide/cli"
        },
        {
          text: "Pipeline definition",
          link: "/guide/config"
        },
        {
          text: "Raw and pretty logs",
          link: "/guide/logs"
        },
        {
          text: "Why another CICD tool ?",
          link: "/guide/the_story"
        },
        {
          text: "How it works ?",
          link: "/guide/internal"
        }
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
          items: [
            {
              text: "Overview",
              link: "/helpers/docker/overview"
            },
            {
              text: "Types",
              link: "/helpers/docker/types"
            }
          ]
        },
        {
          text: "Docker+ helpers",
          items: [
            {
              text: "Overview",
              link: "/helpers/service/overview"
            },
            {
              text: "Types",
              link: "/helpers/service/types"
            }
          ]
        },
        {
          text: "Template helpers",
          items: [
            {
              text: "Overview",
              link: "/helpers/template/overview"
            }
          ]
        }
      ]
    },
    {
      text: "Cookbook",
      items: [
        {
          text: "Writting Tips",
          link: "/cookbook/tips"
        },
        {
          text: "Supercharge the cli",
          link: "/cookbook/cli"
        },
        {
          text: "Environment variables",
          link: "/cookbook/environments"
        },
        {
          text: "Javascript frontend",
          link: "/cookbook/vite"
        },
        {
          text: "Medusa (e-commerce)",
          link: "/cookbook/medusa"
        },
        {
          text: "Deployment Strategies",
          link: "/cookbook/strategies"
        }
      ]
    }
  ]
};
