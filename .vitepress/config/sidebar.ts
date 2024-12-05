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
              text: "Install",
              link: "/introduction/install"
            },
            {
              text: "Start a project",
              link: "/introduction/bootstrap"
            },
            {
              text: "Write a pipeline",
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
          // HEAD
          text: "Commande line (cli)",
          items: [
            {
              text: "Configuration file",
              link: "/guide/config"
            },
            {
              text: "Cli usage",
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
              text: "Parallel tasks",
              link: "/guide/parallelism"
            },
            {
              text: "Triggers (Automation)",
              items: [
                {
                  text: "Definition",
                  link: "/guide/triggers/definition"
                },
                {
                  text: "Options",
                  link: "/guide/triggers/options"
                },
                {
                  text: "Special flags",
                  link: "/guide/triggers/specials"
                }
              ]
            },
            {
              text: "Fallbacks (Conditionnal Hooks)",
              link: "/guide/fallbacks"
            },
            {
              text: "Execution modes (Behavior)",
              link: "/guide/modes"
            }
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
        }
      ]
    },
    {
      text: "Cookbook",
      collapsed: true,
      items: [
        {
          text: "Expand Make/Just",
          link: "/cookbook/pipelight_and_make"
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
            },
            {
              text: "Secrets storage",
              link: "/guide/secrets"
            }
          ]
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
          text: "Who is it for?",
          link: "/introduction/who_for"
        }
        // {
        //   text: "ROADMAP",
        //   link:
        //     "https://github.com/pipelight/pipelight/src/branch/master/ROADMAP.md",
        // },
      ]
    }
  ]
};
