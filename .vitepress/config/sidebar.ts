import type { DefaultTheme } from "@/config";

export const sidebar: DefaultTheme.Config["sidebar"] = {
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
        },
        {
          text: "Deep dive",
          link: "/guide/api"
        }
      ]
    }
  ]
};
