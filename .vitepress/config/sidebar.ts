import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/": [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {
          text: "What is Pipelight?",
          link: "/introduction/description"
        },
        {
          text: "For what usage?",
          link: "/introduction/why"
        },
        {
          text: "Getting Started",
          items: [
            {
              text: "Install",
              link: "/introduction/install"
            },
            {
              text: "Write your first pipeline",
              link: "/introduction/write_pipeline"
            },
            {
              text: "Troubleshoot a pipeline",
              link: "/introduction/troubleshoot"
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
          link: "/guide/parallelism"
        },
        {
          text: "Triggers (Automation)",
          link: "/guide/triggers"
        },
        {
          text: "Fallbacks",
          link: "/guide/fallbacks"
        },
        {
          text: "Execution modes",
          link: "/guide/modes"
        },
        {
          text: "Logs",
          link: "/guide/logs"
        },
        {
          text: "Internal API",
          link: "https://gitea.com/pipelight/pipelight/src/branch/master/INTERNALS.md"
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
          link: "/other_topics/why_detailed"
        },
        {
          text: "Pipelight Vs Others",
          link: "/other_topics/comparision"
        },
        {
          text: "CHANGELOG",
          link: "https://gitea.com/pipelight/pipelight/src/branch/master/CHANGELOG.md"
        },
        {
          text: "ROADMAP",
          link: "https://gitea.com/pipelight/pipelight/src/branch/master/ROADMAP.md"
        }
      ]
    }
  ]
};
