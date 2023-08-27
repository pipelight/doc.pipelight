import { h, App } from "vue";
import DefaultTheme from "vitepress/theme";
import "./css/index.css";
// Components
import PreferenceSwitch from "@components/PreferenceSwitch.vue";

export default Object.assign({}, DefaultTheme, {
  Layout: () => {
    // @ts-ignore
    return h(DefaultTheme.Layout, null, {
      "sidebar-nav-before": () => h(PreferenceSwitch)
    });
  },
  enhanceApp({ app }: { app: App }) {}
});
