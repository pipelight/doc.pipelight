import { defineConfig } from "vitepress";
export default defineConfig({
  title: "Simp CICD",
  description: "Deployment Framework for Simple-Minded",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/images/simp.png" }]
  ],
  themeConfig: {
    repo: "areskul/simpcicd",
    logo: "/images/simp.png",
    sidebar: {
      "/": [
        {
          text: "Guide",
          children: [
            {
              text: "Why Simp ?",
              link: "/guide/why"
            },
            {
              text: "Getting Started",
              link: "/guide/"
            }
          ]
        }
      ]
    },
    nav: [
      {
        text: "Guide",
        link: "/guide/"
      },
      {
        text: "Contacts",
        link: "/contacts"
      }
    ]
  }
});
