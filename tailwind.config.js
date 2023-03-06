const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", ".vitepress/**/*.{vue,js,ts,css}"],
  theme: {
    extend: {
      screens: {
        xs: "360px"
      },
      colors: {
        transparent: "transparent",
        gray: colors.neutral
      }
    }
  }
};
