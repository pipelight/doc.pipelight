import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/": [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {
          text: "What is Pipelight?",
          link: "/getting_started/description"
        },
        {
          text: "Getting Started",
          items: [
            {
              text: "Install",
              link: "/getting_started/install"
            },
            {
              text: "Your first pipeline",
              link: "/getting_started/write_pipeline"
            }
          ]
        }
      ]
    },
    {
      text: "Guide",
      items: [
        {
          text: "Configuration file",
          link: "/guide/config"
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
          text: "Parallelism",
          link: "/guide/config"
        },
        {
          text: "Triggers (Automation)",
          link: "/guide/config"
        },
        {
          text: "Logs",
          link: "/guide/logs"
        },
        {
          text: "Internal API",
          link: "/guide/internal"
        }
      ]
    },
    {
      text: "Helpers",
      collapsed: true,
      items: [
        {
          text: "What is it?",
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
      collapsed: true,
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
    },
    {
      text: "Extra Topics",
      items: [
        {
          text: "Why another CICD Tool?",
          link: "/cookbook/strategies"
        },
        {
          text: "Pipelight Vs Others",
          link: "/cookbook/strategies"
        }
      ]
    }
  ]
};
