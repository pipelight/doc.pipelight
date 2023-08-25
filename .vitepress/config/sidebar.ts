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
          text: "Getting Started",
          items: [
            {
              text: "Install the CLI",
              link: "/introduction/install"
            },
            {
              text: "Your first pipeline",
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
          text: "Commande line (cli)",
          items: [
            {
              text: "Configuration file",
              link: "/guide/config"
            },
            {
              text: "Usage",
              link: "/guide/cli"
            },
            {
              text: "Display Logs",
              link: "/guide/logs"
            }
          ]
        },
        {
          text: "Pipeline definition",
          items: [
            {
              text: "Which language?",
              link: "/guide/which_lang"
            },
            {
              text: "Base syntax",
              link: "/guide/pipeline_definition"
            },
            {
              text: "Task Parallelism",
              link: "/guide/parallelism"
            },
            {
              text: "Triggers (Automation)",
              link: "/guide/triggers"
            },
            {
              text: "Fallbacks (Conditionnal Hooks)",
              link: "/guide/fallbacks"
            },
            {
              text: "Execution modes (Behavior)",
              link: "/guide/modes"
            },
            {
              text: "Secrets storage",
              link: "/guide/secrets"
            }
          ]
        },
        {
          text: "Pipeline doping ⚡",
          items: [
            {
              text: "Overview",
              link: "/guide/tips/overview"
            },
            {
              text: "String manipulation",
              link: "/guide/tips/strings"
            },
            {
              text: "Split code blocks",
              link: "/guide/tips/split"
            },
            {
              text: "Supercharge the cli",
              link: "/guide/tips/supercli"
            },
            {
              text: "Environment variables",
              link: "/guide/tips/environments"
            }
            // {
            //   text: "Show off",
            //   link: "/guide/tips/showcase"
            // }
          ]
        }
      ]
    },
    {
      text: "Helpers",
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
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/helpers/docker/overview"
            },
            {
              text: "Loose declaration",
              link: "/helpers/docker/loose"
            },
            {
              text: "Strict declaration",
              link: "/helpers/docker/strict"
            },
            {
              text: "Usage",
              link: "/helpers/docker/usage"
            }
          ]
        },
        {
          text: "Template helpers",
          collapsed: true,
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
          text: "Read files",
          link: "/cookbook/cli"
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
