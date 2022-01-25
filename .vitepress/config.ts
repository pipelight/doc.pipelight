import { defineConfig } from "vitepress";
export default defineConfig({
  title: "SimpCICD",
  description: "Everithing about SimpCICD",
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        link: "/about/"
      }
    ],
    nav: [
      {
        text: "Guide",
        link: "/about/"
      },
      {
        text: "Contacts",
        link: "/contacts"
      }
    ]
  }
});
