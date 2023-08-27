const colors = require("tailwindcss/colors");
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "forest",
    base: true,
    styled: true,
    utils: false,
    rtl: false,
    prefix: "daisy-",
    logs: true
  },
  darkMode: "class",
  content: ["./index.html", ".vitepress/**/*.{vue,js,ts,css,md,pug}"],
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
