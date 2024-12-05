import { App, h } from "vue";
import DefaultTheme from "vitepress/theme";
import "./css/index.css";
// Components
import PreferenceSwitch from "@components/PreferenceSwitch.vue";
import VPSwitch from "vitepress/dist/client/theme-default/components/VPSwitch.vue";

export default {
  extends: DefaultTheme
};
