import type { DefaultTheme } from "@/config";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "News",
    link: "/news/feed"
  },
  {
    text: "Guide",
    link: "/introduction/write_pipeline"
  },
  {
    text: "Helpers",
    link: "/helpers/common"
  },
  {
    text: "Github",
    link: "https://github.com/pipelight/pipelight"
  }
];
