import { h, App } from "vue";
import DefaultTheme from "vitepress/theme";
import "./css/index.css";
// Components
import PreferenceSwitch from "@components/PreferenceSwitch.vue";

import VPSwitch from "vitepress/dist/client/theme-default/components/VPSwitch.vue";
import VPBadge from "vitepress/dist/client/theme-default/components/VPBadge.vue";

export default Object.assign({}, DefaultTheme, {
  Layout: () => {
    // @ts-ignore
    return h(DefaultTheme.Layout, null, {
      "sidebar-nav-before": () => h(PreferenceSwitch)
    });
  },
  enhanceApp({ app }: { app: App }) {
    app.provide("Badge", VPBadge);
    app.provide("VPSwitch", VPSwitch);
  }
});
